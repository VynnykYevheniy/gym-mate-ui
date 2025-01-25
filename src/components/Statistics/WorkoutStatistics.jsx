import PropTypes from "prop-types";

const WorkoutStatistics = ({muscleGroupData}) => {
	if (!muscleGroupData) {
		return <div>No workout data available</div>;
	}

	return (
		<section>
			<h2 className="text-xl font-bold mb-4">Workout Statistics</h2>
			<div className="grid grid-cols-2 gap-4">
				<div className="stat-card">
					<h3 className="text-sm font-medium">Total Workouts</h3>
					<p className="text-lg font-bold">{muscleGroupData.totalWorkouts}</p>
				</div>
				<div className="stat-card">
					<h3 className="text-sm font-medium">Total Exercises</h3>
					<p className="text-lg font-bold">{muscleGroupData.totalExercises}</p>
				</div>
				<div className="stat-card">
					<h3 className="text-sm font-medium">Avg Weight (kg)</h3>
					<p className="text-lg font-bold">{muscleGroupData.avgWeight?.toFixed(2)}</p>
				</div>
				<div className="stat-card">
					<h3 className="text-sm font-medium">Max Weight (kg)</h3>
					<p className="text-lg font-bold">{muscleGroupData.maxWeight?.toFixed(2)}</p>
				</div>
				<div className="stat-card">
					<h3 className="text-sm font-medium">Avg Reps</h3>
					<p className="text-lg font-bold">{muscleGroupData.avgReps?.toFixed(2)}</p>
				</div>
				<div className="stat-card">
					<h3 className="text-sm font-medium">Avg Sets</h3>
					<p className="text-lg font-bold">{muscleGroupData.avgSets?.toFixed(2)}</p>
				</div>
				<div className="stat-card">
					<h3 className="text-sm font-medium">Last Workout Date</h3>
					<p className="text-lg font-bold">{muscleGroupData.lastWorkoutDate}</p>
				</div>
			</div>
		</section>
	);
};

WorkoutStatistics.propTypes = {
	muscleGroupData: PropTypes.shape({
		totalWorkouts: PropTypes.number.isRequired,
		totalExercises: PropTypes.number.isRequired,
		avgWeight: PropTypes.number.isRequired,
		maxWeight: PropTypes.number.isRequired,
		avgReps: PropTypes.number.isRequired,
		avgSets: PropTypes.number.isRequired,
		lastWorkoutDate: PropTypes.string.isRequired,
	}),
};

export default WorkoutStatistics;