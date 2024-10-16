import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {fetchExercisesByMuscleGroup, fetchMuscleGroups, saveTraining} from '../service/TrainingService.jsx';
import TrainingFormFields from './TrainingFormFields.jsx';
import {FaPlus} from "react-icons/fa";

const TrainingForm = ({isOpen, onClose, trainingData, onTrainingAdded}) => {
	const id = trainingData?.id;
	const [date, setDate] = useState(id ? trainingData.date : dayjs().format('YYYY-MM-DDTHH:mm'));
	const [muscleGroups, setMuscleGroups] = useState([]);
	const [trainings, setTrainings] = useState(
		id ? trainingData.trainings.map(training => ({
			...training,
			muscleGroup: training.exercise?.muscleGroup || null, // Initialize muscleGroup
			exercise: training.exercise || null, // Initialize exercise
		})) : []
	);

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

	// Reset the form to the initial state
	const resetForm = () => {
		setTrainings([]);
		setDate(dayjs().format('YYYY-MM-DDTHH:mm'));
	};

	const handleAdd = () => {
		setTrainings(prevTraining => [
			...prevTraining,
			{
				muscleGroupId: null,
				exerciseId: null,
				sets: 0,
				trainingDetails: [],
			},
		]);
	};
	const handleRemoveTraining = (index) => {
		setTrainings((prevTrainings) => prevTrainings.filter((_, i) => i !== index));
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
			...(id && {id}), // Include id only if it exists
			date: date,
			trainings: trainings.map((training) => ({
				...(training.id && {id: training.id}), // Conditionally include training id
				exercise: {
					...(training.exercise?.id && {id: training.exercise.id}), // Conditionally include exercise id
					name: training.exercise.name,
					description: training.exercise.description || "No description",
					muscleGroup: {
						...(training.exercise.muscleGroup?.id && {id: training.exercise.muscleGroup.id}), // Conditionally include muscle group id
						name: training.exercise.muscleGroup.name,
					},
				},
				trainingDetails: training.trainingDetails.map((detail) => ({
					...(detail.id && {id: detail.id}), // Conditionally include detail id
					set: detail.set,
					weight: detail.weight,
					repetition: detail.repetition,
				})),
			})),
		};
		try {
			await saveTraining(payload);
			alert(`Training record ${id ? 'updated' : 'saved'} successfully!`);
			onTrainingAdded(); // Notify parent component to refresh the training list
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
			<div
				className="bg-green-100 rounded-lg p-4 w-11/12 sm:w-1/2 max-h-[90vh] shadow-2xl transform transition-all duration-300">

				{/* Sticky Header */}
				<div className="sticky top-0 mb-2 border-b-2 border-b-black">
					<h2 className="text-3xl font-bold text-gray-900 mb-2">{id ? 'Edit Training' : 'Add Training'}</h2>
				</div>

				{/* Date Picker */}
				<div className="m-4 flex items-center">
					<label htmlFor="date" className="block w-1/4 text-sm font-medium text-gray-700 mb-2">Date</label>
					<input
						type="datetime-local"
						id="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
					/>
				</div>

				{/* Training Forms */}
				<div className="flex flex-col mb-6 max-h-[65vh] overflow-y-scroll">
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
							handleRemoveTraining={handleRemoveTraining}
						/>
					))}
				</div>

				{/* Action Buttons */}
				<div className="flex justify-between items-center mt-6">
					{/* Add Button */}
					<button
						onClick={handleAdd}
						className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition"
					>
						<FaPlus className="text-2xl font-bold"></FaPlus>
					</button>

					{/* Save and Cancel Buttons */}
					<div className="flex space-x-4">
						<button
							onClick={handleSave}
							className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
						>
							Save
						</button>
						<button
							onClick={() => {
								resetForm();
								onClose();
							}}
							className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400 transition"
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
	onTrainingAdded: PropTypes.func.isRequired, // New prop for notifying the parent
};

export default TrainingForm;
