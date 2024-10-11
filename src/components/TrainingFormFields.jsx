import PropTypes from 'prop-types';

const TrainingFormFields = ({
								index,
								training,
								muscleGroups,
								handleMuscleGroupChange,
								handleExerciseChange,
								handleSetsChange,
								handleTrainingDetailChange
							}) => (
	<div className="mb-4 border border-gray-300 rounded-lg p-4 shadow-md">
		<h3 className="text-lg font-semibold mb-2">Exercise {index + 1}</h3>
		<div className="mb-4">
			<label htmlFor={`muscleGroup-${index}`} className="block mb-1">Muscle Group</label>
			<select
				id={`muscleGroup-${index}`}
				value={training.muscleGroup?.id || training.exercise?.muscleGroup?.id || ''}
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
				value={training.exercises ? (training.exercise?.id || '') : (training.exercise?.id || '')}
				onChange={(e) => handleExerciseChange(index, e.target.value)}
				className="w-full p-2 border border-gray-300 rounded"
			>
				<option value="">Select an exercise</option>
				{training.exercises?.map((exercise) => (
					<option key={exercise.id} value={exercise.id}>
						{exercise.name}
					</option>
				))}
				{/* Если training.exercises отсутствует, добавляем training.exercise как опцию */}
				{!training.exercises && training.exercise && (
					<option key={training.exercise.id} value={training.exercise.id}>
						{training.exercise.name}
					</option>
				)}
			</select>
		</div>
		<div className="mb-4">
			<label htmlFor={`sets-${index}`} className="block mb-1">Sets</label>
			<input
				type="number"
				id={`sets-${index}`}
				min="1"
				max="4"
				value={training.sets || ''}
				onChange={(e) => handleSetsChange(index, e.target.value)}
				className="w-full p-2 border border-gray-300 rounded"
			/>
		</div>
		{training.trainingDetails.map((setDetail, setIndex) => (
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
)

TrainingFormFields.propTypes = {
	index: PropTypes.number.isRequired,
	training: PropTypes.object.isRequired,
	muscleGroups: PropTypes.array.isRequired,
	handleMuscleGroupChange: PropTypes.func.isRequired,
	handleExerciseChange: PropTypes.func.isRequired,
	handleSetsChange: PropTypes.func.isRequired,
	handleTrainingDetailChange: PropTypes.func.isRequired,
};

export default TrainingFormFields;