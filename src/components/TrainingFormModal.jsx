import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {fetchExercisesByMuscleGroup, fetchMuscleGroups, saveTraining} from '../service/TrainingService.jsx';

const TrainingFormModal = ({isOpen, onClose, initialData}) => {
	const [date, setDate] = useState(dayjs().format('YYYY-MM-DDTHH:mm'));
	const [muscleGroups, setMuscleGroups] = useState([]);
	const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
	const [exercises, setExercises] = useState([]);
	const [selectedExercise, setSelectedExercise] = useState(null);
	const [sets, setSets] = useState(0);
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
			setSelectedMuscleGroup(initialData.muscleGroup || null);
			setSelectedExercise(initialData.exercise || null);
			setSets(initialData.trainingDetails?.length || 0);
			setTrainingDetails(initialData.trainingDetails || []);
		} else {
			resetForm();
		}
	}, [isOpen, initialData]);

	const resetForm = () => {
		setSelectedMuscleGroup(null);
		setSelectedExercise(null);
		setSets(0);
		setTrainingDetails([]);
	};

	const handleMuscleGroupChange = async (muscleGroupId) => {
		setSelectedMuscleGroup(muscleGroupId);
		try {
			const data = await fetchExercisesByMuscleGroup(muscleGroupId);
			setExercises(data);
			setSelectedExercise(null);
			setSets(0);
			setTrainingDetails([]);
		} catch (err) {
			console.error(err);
		}
	};

	const handleExerciseChange = (exerciseId) => {
		const exercise = exercises.find((ex) => ex.id === parseInt(exerciseId));
		setSelectedExercise(exercise);
		setSets(0);
		setTrainingDetails([]);
	};

	const handleSetsChange = (setsCount) => {
		setSets(setsCount);
		const details = Array.from({length: setsCount}, (_, i) => ({
			set: i + 1,
			weight: 0,
			repetition: 0
		}));
		setTrainingDetails(details);
	};

	const handleTrainingDetailChange = (detailIndex, field, value) => {
		const updatedDetails = [...trainingDetails];
		updatedDetails[detailIndex][field] = parseInt(value);
		setTrainingDetails(updatedDetails);
	};

	const handleSave = async () => {
		const payload = {
			date: date,
			trainings: [
				{
					exercise: {
						id: selectedExercise?.id,
						name: selectedExercise?.name,
						description: selectedExercise?.description,
						muscleGroup: {
							id: selectedMuscleGroup,
							name: muscleGroups.find(group => group.id === selectedMuscleGroup)?.name
						}
					},
					trainingDetails: trainingDetails
				}
			]
		};

		try {
			const data = await saveTraining(payload, initialData);
			console.log('Save successful:', data);
			onClose();
		} catch (err) {
			console.error(err);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg p-6 w-2/4 max-h-screen overflow-y-auto">
				<h2 className="text-2xl mb-4">Record Training</h2>

				<label className="block mb-4">
					<span className="text-gray-700">Date</span>
					<input
						type="datetime-local" // Изменено на datetime-local
						className="mt-1 block w-full border border-gray-300 rounded-md p-2"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</label>

				<label className="block mb-4">
					<span className="text-gray-700">Muscle Group</span>
					<select
						className="mt-1 block w-full border border-gray-300 rounded-md p-2"
						onChange={(e) => handleMuscleGroupChange(e.target.value)}
						value={selectedMuscleGroup || ''}
					>
						<option value="">Select Muscle Group</option>
						{muscleGroups.map((group) => (
							<option key={group.id} value={group.id}>
								{group.name}
							</option>
						))}
					</select>
				</label>

				{selectedMuscleGroup && (
					<label className="block mb-4">
						<span className="text-gray-700">Exercise</span>
						<select
							className="mt-1 block w-full border border-gray-300 rounded-md p-2"
							onChange={(e) => handleExerciseChange(e.target.value)}
							value={selectedExercise?.id || ''}
						>
							<option value="">Select Exercise</option>
							{exercises.map((exercise) => (
								<option key={exercise.id} value={exercise.id}>
									{exercise.name}
								</option>
							))}
						</select>
					</label>
				)}

				{selectedExercise && (
					<label className="block mb-4">
						<span className="text-gray-700">Sets</span>
						<input
							type="number"
							className="mt-1 block w-full border border-gray-300 rounded-md p-2"
							placeholder="Number of Sets"
							min="1"
							value={sets || ''}
							onChange={(e) => handleSetsChange(e.target.value)}
						/>
					</label>
				)}

				{sets > 0 && (
					<>
						{trainingDetails.map((detail, index) => (
							<div key={index} className="mb-2">
								<div className="flex items-center">
									<span>{index + 1}.</span>
									<input
										type="number"
										className="border border-gray-300 rounded-md p-2 w-20 m-2"
										placeholder="Weight"
										value={detail.weight}
										onChange={(e) => handleTrainingDetailChange(index, 'weight', e.target.value)}
									/>
									<span>kg</span>
									<input
										type="number"
										className="border border-gray-300 rounded-md p-2 w-20 m-2"
										placeholder="Repetitions"
										value={detail.repetition}
										onChange={(e) => handleTrainingDetailChange(index, 'repetition', e.target.value)}
									/>
									<span>reps</span>
								</div>
							</div>
						))}
					</>
				)}

				<div className="flex justify-end mt-4">
					<button onClick={handleSave} className="bg-green-500 text-white rounded-lg px-4 py-2 mr-2">
						Save
					</button>
					<button onClick={onClose} className="bg-red-500 text-white rounded-lg px-4 py-2">
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

TrainingFormModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	initialData: PropTypes.shape({
		date: PropTypes.string.isRequired,
		muscleGroup: PropTypes.string,
		exercise: PropTypes.object,
		trainingDetails: PropTypes.arrayOf(
			PropTypes.shape({
				set: PropTypes.number.isRequired,
				weight: PropTypes.number.isRequired,
				repetition: PropTypes.number.isRequired
			})
		)
	})
};

export default TrainingFormModal;