import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {fetchExercisesByMuscleGroup, fetchMuscleGroups, saveTraining} from '../service/TrainingService.jsx';

const TrainingFormModal = ({isOpen, onClose, initialData}) => {
	const [date, setDate] = useState(dayjs().format('YYYY-MM-DDTHH:mm'));
	const [muscleGroups, setMuscleGroups] = useState([]);
	const [exercises, setExercises] = useState([]);
	const [trainingDetails, setTrainingDetails] = useState([]);

	useEffect(() => {
		const loadMuscleGroups = async () => {
			try {
				const data = await fetchMuscleGroups();
				setMuscleGroups(data);
			} catch (err) {
				console.error(err);
			}
		};
		loadMuscleGroups();
	}, []);

	useEffect(() => {
		if (isOpen && initialData) {
			setDate(dayjs(initialData.date).format('YYYY-MM-DDTHH:mm'));
			setTrainingDetails(initialData.trainings.map(training => ({
				muscleGroupId: training.exercise.muscleGroup.id,
				exerciseId: training.exercise.id,
				sets: training.trainingDetails.length,
				trainingDetails: training.trainingDetails
			})));
		} else {
			resetForm();
		}
	}, [isOpen, initialData]);

	const resetForm = () => {
		setTrainingDetails([]);
	};

	const handleAdd = () => {
		setTrainingDetails((prevDetails) => [
			...prevDetails,
			{
				muscleGroupId: null,
				exerciseId: null,
				sets: 0,
				trainingDetails: [],
			},
		]);
	};

	const handleMuscleGroupChange = async (index, muscleGroupId) => {
		const updatedDetails = [...trainingDetails];
		updatedDetails[index].muscleGroupId = muscleGroupId;

		try {
			const data = await fetchExercisesByMuscleGroup(muscleGroupId);
			updatedDetails[index].exercises = data;
			updatedDetails[index].exerciseId = null;
			updatedDetails[index].trainingDetails = [];
			updatedDetails[index].sets = 0;
			setTrainingDetails(updatedDetails);
		} catch (err) {
			console.error(err);
		}
	};

	const handleExerciseChange = (index, exerciseId) => {
		const updatedDetails = [...trainingDetails];
		updatedDetails[index].exerciseId = exerciseId;
		updatedDetails[index].trainingDetails = [];
		updatedDetails[index].sets = 0;
		setTrainingDetails(updatedDetails);
	};

	const handleSetsChange = (index, setsCount) => {
		const updatedDetails = [...trainingDetails];
		updatedDetails[index].sets = setsCount;
		const details = Array.from({length: setsCount}, (_, i) => ({
			set: i + 1,
			weight: 0,
			repetition: 0,
		}));
		updatedDetails[index].trainingDetails = details;
		setTrainingDetails(updatedDetails);
	};

	const handleTrainingDetailChange = (trainingIndex, detailIndex, field, value) => {
		const updatedDetails = [...trainingDetails];
		updatedDetails[trainingIndex].trainingDetails[detailIndex][field] = parseInt(value);
		setTrainingDetails(updatedDetails);
	};

	const handleSave = async () => {
		const payload = {
			date: date,
			trainings: trainingDetails.map(detail => ({
				exercise: {
					id: detail.exerciseId,
					muscleGroup: {id: detail.muscleGroupId},
				},
				trainingDetails: detail.trainingDetails,
			})),
		};

		try {
			await saveTraining(payload);
			alert('Training record saved successfully!');
			onClose();
		} catch (error) {
			console.error('Error saving training:', error);
			alert('Error saving training record.');
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-white rounded-lg p-6 w-11/12 sm:w-1/3 max-h-screen overflow-y-auto">
				<h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit Training' : 'Add Training'}</h2>

				{/* Контейнер с прокруткой */}
				<div className="mb-4">
					<label htmlFor="date" className="block mb-1">Date</label>
					<input
						type="datetime-local"
						id="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>

				<div className="overflow-y-auto max-h-80"> {/* Ограничение высоты и прокрутка */}
					{trainingDetails.map((detail, index) => (
						<div key={index} className="mb-4 border border-gray-300 rounded-lg p-4 shadow-md">
							<h3 className="text-lg font-semibold mb-2">Exercise {index + 1}</h3>

							<div className="mb-4">
								<label htmlFor={`muscleGroup-${index}`} className="block mb-1">Muscle Group</label>
								<select
									id={`muscleGroup-${index}`}
									value={detail.muscleGroupId || ''}
									onChange={(e) => handleMuscleGroupChange(index, e.target.value)}
									className="w-full p-2 border border-gray-300 rounded"
								>
									<option value="">Select a muscle group</option>
									{muscleGroups.map((group) => (
										<option key={group.id} value={group.id}>
											{group.name}
										</option>
									))}
								</select>
							</div>

							<div className="mb-4">
								<label htmlFor={`exercise-${index}`} className="block mb-1">Exercise</label>
								<select
									id={`exercise-${index}`}
									value={detail.exerciseId || ''}
									onChange={(e) => handleExerciseChange(index, e.target.value)}
									className="w-full p-2 border border-gray-300 rounded"
									disabled={!detail.muscleGroupId}
								>
									<option value="">Select an exercise</option>
									{detail.exercises?.map((exercise) => (
										<option key={exercise.id} value={exercise.id}>
											{exercise.name}
										</option>
									))}
								</select>
							</div>

							<div className="mb-4">
								<label htmlFor={`sets-${index}`} className="block mb-1">Sets</label>
								<input
									type="number"
									id={`sets-${index}`}
									min="1"
									value={detail.sets}
									onChange={(e) => handleSetsChange(index, e.target.value)}
									className="w-full p-2 border border-gray-300 rounded"
								/>
							</div>

							{detail.trainingDetails.map((setDetail, setIndex) => (
								<div key={setIndex} className="mb-2 flex items-center">
									<span>{setIndex + 1}.</span>
									<input
										type="number"
										className="w-full border border-gray-300 rounded-md p-2 m-2"
										placeholder="Weight"
										value={setDetail.weight}
										onChange={(e) => handleTrainingDetailChange(index, setIndex, 'weight', e.target.value)}
									/>
									<span>kg</span>
									<input
										type="number"
										className="w-full border border-gray-300 rounded-md p-2 m-2"
										placeholder="Repetitions"
										value={setDetail.repetition}
										onChange={(e) => handleTrainingDetailChange(index, setIndex, 'repetition', e.target.value)}
									/>
									<span>reps</span>
								</div>
							))}
						</div>
					))}
				</div>

				<div className="flex justify-between items-center">
					<button
						onClick={handleAdd}
						className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						<span className="text-2xl">+</span>
					</button>
					<div className="flex">
						<button
							onClick={handleSave}
							className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
						>
							Save
						</button>
						<button
							onClick={onClose}
							className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

TrainingFormModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	initialData: PropTypes.object,
};

TrainingFormModal.defaultProps = {
	initialData: null,
};

export default TrainingFormModal;