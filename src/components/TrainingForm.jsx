import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {fetchExercisesByMuscleGroup, fetchMuscleGroups, saveTraining} from '../service/TrainingService.jsx';
import TrainingFormFields from './TrainingFormFields.jsx';

const TrainingForm = ({isOpen, onClose, trainingData}) => {
	const id = trainingData?.id;
	const [date, setDate] = useState(id ? trainingData.date : dayjs().format('YYYY-MM-DDTHH:mm'));
	const [muscleGroups, setMuscleGroups] = useState([]);
	const [trainings, setTrainings] = useState(
		id ? trainingData.trainings.map(training => ({
			...training,
			muscleGroup: training.exercise?.muscleGroup || null, // Инициализация muscleGroup
			exercise: training.exercise || null, // Инициализация exercise
		})) : []
	);

	console.log(trainingData);
	console.log(trainings);
	console.log(muscleGroups);
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

	// Reset the form to initial state
	const resetForm = () => {
		setTrainings([]);
		setDate(dayjs().format('YYYY-MM-DDTHH:mm'));
	};

	const handleAdd = () => {
		setTrainings((prevTraining) => [
			...prevTraining,
			{
				muscleGroupId: null,
				exerciseId: null,
				sets: 0,
				trainingDetails: [],
			},
		]);
	};

	const handleMuscleGroupChange = async (index, muscleGroupId) => {
		const updatedTraining = [...trainings];
		updatedTraining[index].muscleGroup = muscleGroups.find(group => group.id === parseInt(muscleGroupId));
		try {
			updatedTraining[index].exercises = await fetchExercisesByMuscleGroup(muscleGroupId);
			updatedTraining[index].trainingDetails = [];
			setTrainings(updatedTraining);
		} catch (err) {
			console.error(err);
		}
	};

	const handleExerciseChange = (index, exerciseId) => {
		const updatedTraining = [...trainings];
		const selectedExercise = updatedTraining[index].exercises.find(exercise => exercise.id === parseInt(exerciseId));
		updatedTraining[index].exercise = selectedExercise || null;
		updatedTraining[index].trainingDetails = [];
		updatedTraining[index].sets = 0;
		setTrainings(updatedTraining);
	};

	const handleSetsChange = (index, setsCount) => {
		const updatedTraining = [...trainings];
		updatedTraining[index].sets = setsCount;
		updatedTraining[index].trainingDetails = Array.from({length: setsCount}, (_, i) => ({
			set: i + 1,
			weight: 0,
			repetition: 0,
		}));
		setTrainings(updatedTraining);
	};

	const handleTrainingDetailChange = (trainingIndex, detailIndex, field, value) => {
		const updatedTraining = [...trainings];
		updatedTraining[trainingIndex].trainingDetails[detailIndex][field] = parseInt(value);
		setTrainings(updatedTraining);
	};

	const handleSave = async () => {
		const payload = {
			id: id,
			date: date,
			trainings: trainings.map((training) => ({
				id: training.id,
				exercise: {
					id: training.exercise.id,
					name: training.exercise.name,
					description: training.exercise.description || "No description",
					muscleGroup: {
						id: training.exercise.muscleGroup.id,
						name: training.exercise.muscleGroup.name,
					},
				},
				trainingDetails: training.trainingDetails.map((detail) => ({
					id: detail.id,
					set: detail.set,
					weight: detail.weight,
					repetition: detail.repetition,
				})),
			})),
		};
		try {
			if (id) {
				await saveTraining(payload);
				alert('Training record updated successfully!');
			} else {
				await saveTraining(payload);
				alert('Training record saved successfully!');
			}
			onClose();
		} catch (error) {
			console.error('Error saving training:', error);
			alert('Error saving training record.');
		}
	};

	useEffect(() => {
		if (isOpen) {
			if (!id) {
				resetForm(); // Reset form when opening in add mode
			} else {
				setDate(trainingData.date); // Set date if in edit mode
				setTrainings(trainingData.trainings); // Set trainings if in edit mode
			}
		}
	}, [isOpen, trainingData]); // Dependency array includes trainingData to reset when it changes

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-white rounded-lg p-6 w-11/12 sm:w-1/3 max-h-screen overflow-y-auto">
				<h2 className="text-2xl font-bold mb-4">{id ? 'Edit Training' : 'Add Training'}</h2>
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
				<div className="overflow-y-auto max-h-80">
					{trainings.map((training, index) => (
						<TrainingFormFields
							key={index}
							index={index}
							training={training}
							muscleGroups={muscleGroups}
							handleMuscleGroupChange={handleMuscleGroupChange}
							handleExerciseChange={handleExerciseChange}
							handleSetsChange={handleSetsChange}
							handleTrainingDetailChange={handleTrainingDetailChange}
						/>
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
							className="mr-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
						>
							Save
						</button>
						<button
							onClick={() => {
								resetForm();
								onClose();
							}} // Reset form when canceling
							className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

TrainingForm.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	trainingData: PropTypes.shape({
		id: PropTypes.number,
		date: PropTypes.string,
		trainings: PropTypes.arrayOf(PropTypes.object),
	}),
};

export default TrainingForm;