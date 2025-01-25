import PropTypes from "prop-types";
import ShowStatisticsButton from "./ShowStatisticButton.jsx";

const MuscleGroupAndExerciseSelection = ({
											 muscleGroups,
											 exercises,
											 selectedMuscleGroup,
											 selectedExercise,
											 handleMuscleGroupChange,
											 handleExerciseChange,
											 fetchStatisticsData
										 }) => {
	return (
		<section>
			<div className="flex space-x-4 justify-center mt-4">
				<select
					className="w-full border p-2 rounded"
					value={selectedMuscleGroup || ''}
					onChange={handleMuscleGroupChange}
				>
					<option value="" disabled>Select Muscle Group</option>
					{muscleGroups.map((muscleGroup) => (
						<option key={muscleGroup.id} value={muscleGroup.id}>
							{muscleGroup.name}
						</option>
					))}
				</select>

				<select
					className="w-full border p-2 rounded"
					value={selectedExercise || ''}
					onChange={handleExerciseChange}
					disabled={!selectedMuscleGroup} // Disabled when no muscle group is selected
				>
					<option value="" disabled>Select Exercise</option>
					{exercises.map((exercise) => (
						<option key={exercise.id} value={exercise.id}>
							{exercise.name}
						</option>
					))}
				</select>
			</div>
			<ShowStatisticsButton onClick={fetchStatisticsData}/>
		</section>
	);
};

MuscleGroupAndExerciseSelection.propTypes = {
	muscleGroups: PropTypes.array.isRequired,
	exercises: PropTypes.array.isRequired,
	selectedMuscleGroup: PropTypes.any,
	selectedExercise: PropTypes.any,
	handleMuscleGroupChange: PropTypes.func.isRequired,
	handleExerciseChange: PropTypes.func.isRequired,
	fetchStatisticsData: PropTypes.func.isRequired,
};

export default MuscleGroupAndExerciseSelection;