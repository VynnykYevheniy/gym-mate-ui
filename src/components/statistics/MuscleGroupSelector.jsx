// Muscle Group and Exercise Selector Component
import PropTypes from "prop-types";

const MuscleGroupSelector = ({
								 muscleGroups,
								 selectedMuscleGroup,
								 selectedExercise,
								 onMuscleGroupChange,
								 onExerciseChange,
							 }) => (
	<div className="flex space-x-4 justify-center mt-4">
		<select
			className="border p-2 rounded"
			value={selectedMuscleGroup}
			onChange={(e) => onMuscleGroupChange(e.target.value)}
		>
			{Object.keys(muscleGroups).map((muscleGroup) => (
				<option key={muscleGroup} value={muscleGroup}>
					{muscleGroup}
				</option>
			))}
		</select>
		<select
			className="border p-2 rounded"
			value={selectedExercise}
			onChange={(e) => onExerciseChange(e.target.value)}
		>
			{muscleGroups[selectedMuscleGroup].map((exercise) => (
				<option key={exercise} value={exercise}>
					{exercise}
				</option>
			))}
		</select>
	</div>
);

MuscleGroupSelector.propTypes = {
	muscleGroups: PropTypes.object.isRequired,
	selectedMuscleGroup: PropTypes.string.isRequired,
	selectedExercise: PropTypes.string.isRequired,
	onMuscleGroupChange: PropTypes.func.isRequired,
	onExerciseChange: PropTypes.func.isRequired,
};

export default MuscleGroupSelector;