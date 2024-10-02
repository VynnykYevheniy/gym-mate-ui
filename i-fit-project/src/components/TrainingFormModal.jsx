import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from "prop-types";
import ApiUrls from "../model/ApiUrls.js";

const TrainingFormModal = ({ isOpen, onClose, initialData }) => {
	const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
	const [muscleGroups, setMuscleGroups] = useState([]);
	const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
	const [exercises, setExercises] = useState([]);
	const [trainings, setTrainings] = useState([
		{ exercise: null, trainingDetails: [{ set: 0, weight: 0, repetition: 0 }] }
	]);
	const token = JSON.parse(localStorage.getItem("token"));
	const headers = {
		'Authorization': 'Bearer ' + token.accessToken,
		'Content-Type': 'application/json'
	};

	useEffect(() => {
		fetch(ApiUrls.MUSCLE_GROUP.ALL, {
			method: 'GET',
			headers: headers,
		})
			.then(response => response.json())
			.then(data => setMuscleGroups(data))
			.catch(err => console.error(err));
	}, []);

	useEffect(() => {
		if (isOpen && initialData) {
			// Set date from initial data
			setDate(dayjs(initialData.date).format('YYYY-MM-DD'));

			// Set training details from initial data
			setTrainings(initialData.trainings || [
				{ exercise: null, trainingDetails: [{ set: 0, weight: 0, repetition: 0 }] }
			]);
		} else {
			setTrainings([{ exercise: null, trainingDetails: [{ set: 0, weight: 0, repetition: 0 }] }]);
		}
	}, [isOpen, initialData]);

	const handleMuscleGroupChange = (index, muscleGroupId) => {
		setSelectedMuscleGroup(muscleGroupId);
		fetch(ApiUrls.EXERCISE.MUSCLE_GROUPS(muscleGroupId), {
			method: 'GET',
			headers: headers,
		})
			.then(response => response.json())
			.then(data => {
				let updatedTrainings = [...trainings];
				updatedTrainings[index].exercise = null;
				setExercises(data);
				setTrainings(updatedTrainings);
			})
			.catch(err => console.error(err));
	};

	const handleAddExercise = () => {
		setTrainings([...trainings, { exercise: null, trainingDetails: [{ set: 1, weight: 0, repetition: 0 }] }]);
	};

	const handleTrainingDetailChange = (trainingIndex, detailIndex, field, value) => {
		const updatedTrainings = [...trainings];
		updatedTrainings[trainingIndex].trainingDetails[detailIndex][field] = parseInt(value);
		setTrainings(updatedTrainings);
	};

	const handleExerciseChange = (index, exerciseId) => {
		const exercise = exercises.find(ex => ex.id === parseInt(exerciseId));
		const updatedTrainings = [...trainings];
		updatedTrainings[index].exercise = exercise;
		setTrainings(updatedTrainings);
	};

	const handleSetChange = (index, setsCount) => {
		const updatedTrainings = [...trainings];
		updatedTrainings[index].trainingDetails = Array.from({ length: setsCount }, (_, i) => ({
			set: i + 1,
			weight: 0,
			repetition: 0
		}));
		setTrainings(updatedTrainings);
	};

	const handleSave = () => {
		const formatDate = (date) => {
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');
			const seconds = String(date.getSeconds()).padStart(2, '0');

			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		};

		const payload = {
			date: formatDate(new Date(date)),
			trainings
		};

		const method = initialData ? 'PUT' : 'POST';
		const url = initialData ? ApiUrls.TRAINING_DAY.UPDATE(initialData.id) : ApiUrls.TRAINING_DAY.SAVE;

		fetch(url, {
			method: method,
			headers: headers,
			body: JSON.stringify(payload)
		})
			.then(response => response.json())
			.then(data => {
				console.log('Save successful:', data);
				onClose(); // Close the modal after saving
			})
			.catch(err => console.error(err));
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg p-6 w-2/4 max-h-screen overflow-y-auto">
				<h2 className="text-2xl mb-4">Record Training</h2>

				<label className="block mb-4">
					<span className="text-gray-700">Date</span>
					<input
						type="date"
						className="mt-1 block w-full border border-gray-300 rounded-md p-2"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</label>

				{trainings.map((training, index) => (
					<div key={index} className="mb-4">
						<label className="block mb-2">
							<span className="text-gray-700">Muscle Group</span>
							<select
								className="mt-1 block w-full border border-gray-300 rounded-md p-2"
								onChange={(e) => handleMuscleGroupChange(index, e.target.value)}
								value={training.exercise?.muscleGroupId || ''}
							>
								<option value="">Select Muscle Group</option>
								{muscleGroups.map(group => (
									<option key={group.id} value={group.id}>
										{group.name}
									</option>
								))}
							</select>
						</label>

						{selectedMuscleGroup && (
							<>
								<label className="block mb-2">
									<span className="text-gray-700">Exercise</span>
									<select
										className="mt-1 block w-full border border-gray-300 rounded-md p-2"
										onChange={(e) => handleExerciseChange(index, e.target.value)}
										value={training.exercise?.id || ''}
									>
										<option value="">Select Exercise</option>
										{exercises.map(exercise => (
											<option key={exercise.id} value={exercise.id}>
												{exercise.name}
											</option>
										))}
									</select>
								</label>
								{exercises && (
									<>
										<label className="block mb-2">
											<span className="text-gray-700">Sets</span>
											<input
												type="number"
												className="mt-1 block w-full border border-gray-300 rounded-md p-2"
												placeholder="Number of Sets"
												min="1"
												onChange={(e) => handleSetChange(index, e.target.value)}
											/>
										</label>

										{training.trainingDetails.map((detail, detailIndex) => (
											<div key={detailIndex} className="mb-2">
												<div className="flex items-center">
													<span>{detailIndex + 1}.</span>
													<input
														type="number"
														className="border border-gray-300 rounded-md p-2 w-20 m-2"
														placeholder="Weight"
														value={detail.weight}
														onChange={(e) => handleTrainingDetailChange(index, detailIndex, 'weight', e.target.value)}
													/>
													<span>kg</span>
													<input
														type="number"
														className="border border-gray-300 rounded-md p-2 w-20 m-2"
														placeholder="Repetitions"
														value={detail.repetition}
														onChange={(e) => handleTrainingDetailChange(index, detailIndex, 'repetition', e.target.value)}
													/>
													<span>reps</span>
												</div>
											</div>
										))}
									</>
								)}
							</>
						)}
					</div>
				))}

				<button
					onClick={handleAddExercise}
					className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2"
				>
					Add Exercise
				</button>

				<div className="flex justify-end mt-4">
					<button
						onClick={handleSave}
						className="bg-green-500 text-white rounded-lg px-4 py-2 mr-2"
					>
						Save
					</button>
					<button
						onClick={onClose}
						className="bg-red-500 text-white rounded-lg px-4 py-2"
					>
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
		trainings: PropTypes.arrayOf(PropTypes.shape({
			exercise: PropTypes.object,
			trainingDetails: PropTypes.arrayOf(PropTypes.shape({
				set: PropTypes.number.isRequired,
				weight: PropTypes.number.isRequired,
				repetition: PropTypes.number.isRequired,
			})).isRequired
		})).isRequired
	})
};

export default TrainingFormModal;