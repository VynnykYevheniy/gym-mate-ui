import PropTypes from "prop-types";

const ExerciseSelection = ({index, training, handleExerciseChange}) => {
	return (
		<div className="mb-4 flex items-center">
			<label htmlFor={`exercise-${index}`} className="block w-1/4 mb-2 text-sm text-gray-500">Exercise</label>
			<select
				id={`exercise-${index}`}
				value={training.exercises ? (training.exercise?.id || '') : (training.exercise?.id || '')}
				onChange={(e) => handleExerciseChange(index, e.target.value)}
				className="w-3/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
			>
				<option value="" disabled selected>Select an exercise</option>
				{training.exercises?.map((exercise) => (
					<option key={exercise.id} value={exercise.id}>
						{exercise.name}
					</option>
				))}
				{!training.exercises && training.exercise && (
					<option key={training.exercise.id} value={training.exercise.id}>
						{training.exercise.name}
					</option>
				)}
			</select>
		</div>
	);
}
ExerciseSelection.propTypes = {
	index: PropTypes.number.isRequired,
	training: PropTypes.object.isRequired,
	handleExerciseChange: PropTypes.func.isRequired,
}

export default ExerciseSelection;