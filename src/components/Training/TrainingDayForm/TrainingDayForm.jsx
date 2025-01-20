import React, {useCallback, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {fetchExercisesByMuscleGroup, fetchMuscleGroups, saveTraining} from '../../../service/TrainingService.jsx';
import ActionButtons from "./ActionButtons.jsx";
import TitleForm from "./TitleForm.jsx";
import DateTrainingDay from "./DateTrainingDay.jsx";
import TotalWeightDisplay from "./TotalWeightDisplay.jsx";
import TrainingForms from "./TrainingForms.jsx";

const TrainingDayForm = ({isOpen, onClose, trainingData, onRefresh}) => {
	const [date, setDate] = useState(dayjs().format('YYYY-MM-DDTHH:mm'));

	useEffect(() => {
		if (trainingData?.date && dayjs(trainingData.date).isValid()) {
			setDate(trainingData.date);
		}
	}, [trainingData]);
	const id = trainingData?.id;
	const [muscleGroups, setMuscleGroups] = useState([]);
	const [trainings, setTrainings] = useState(id ? trainingData.trainings.map(training => ({
		...training,
		muscleGroup: training.exercise?.muscleGroup || null,
		exercise: training.exercise || null,
	})) : []);

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

	const resetForm = useCallback(() => {
		console.log("Reset Data: ", date);
		setTrainings([]);
	}, [date, setTrainings]);

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
	const handleCancel = () => {
		resetForm();
		onClose();
	}

	const handleRemoveTraining = (index) => {
		setTrainings(prevTrainings => prevTrainings.filter((_, i) => i !== index));
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
			...(id && {id}),
			date: date,
			trainings: trainings.map((training) => ({
				...(training.id && {id: training.id}),
				exercise: {
					...(training.exercise?.id && {id: training.exercise.id}),
					name: training.exercise.name,
					description: training.exercise.description || "No description",
					muscleGroup: {
						...(training.exercise.muscleGroup?.id && {id: training.exercise.muscleGroup.id}),
						name: training.exercise.muscleGroup.name,
					},
				},
				trainingDetails: training.trainingDetails.map((detail) => ({
					...(detail.id && {id: detail.id}),
					set: detail.set,
					weight: detail.weight,
					repetition: detail.repetition,
				})),
			})),
		};
		try {
			await saveTraining(payload);
			alert(`Training record ${id ? 'updated' : 'saved'} successfully!`);
			onRefresh();
			onClose();
		} catch (error) {
			console.error('Error saving Training:', error);
			alert('Error saving Training record.');
		}
	};

	useEffect(() => {
		if (isOpen) {
			if (!id) {
				resetForm();
			} else {
				setDate(trainingData.date);
				setTrainings(trainingData.trainings);
			}
		}
	}, [isOpen, trainingData, id, resetForm]);


	//Function CalculateTotalWeight
	const calculateTotalWeight = () => {
		return trainings.reduce((total, training) => {
			const exerciseWeight = training.trainingDetails.reduce((sum, {
				weight,
				repetition
			}) => sum + (weight * repetition), 0);
			return total + exerciseWeight;
		}, 0);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 mb-16">
			<div
				className="bg-zinc-50 rounded-lg p-4 w-11/12 sm:w-1/2 max-h-[90vh] shadow-2xl transform transition-all duration-300">

				<TitleForm id={id}/>

				<DateTrainingDay date={date} onDateChange={setDate}/>

				<TrainingForms trainings={trainings}
						   muscleGroups={muscleGroups}
						   handleMuscleGroupChange={handleMuscleGroupChange}
						   handleExerciseChange={handleExerciseChange}
						   handleSetsChange={handleSetsChange}
						   handleTrainingDetailChange={handleTrainingDetailChange}
						   handleRemoveTraining={handleRemoveTraining}/>

				<TotalWeightDisplay totalWeight={calculateTotalWeight()}/>

				<ActionButtons onSave={handleSave} onCancel={handleCancel} onAdd={handleAdd}/>

			</div>
		</div>
	);
};

TrainingDayForm.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	trainingData: PropTypes.shape({
		id: PropTypes.number,
		date: PropTypes.string,
		trainings: PropTypes.arrayOf(PropTypes.object),
	}),
	onRefresh: PropTypes.func.isRequired,
};

export default TrainingDayForm;