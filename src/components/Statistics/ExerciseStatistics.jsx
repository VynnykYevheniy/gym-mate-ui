import PropTypes from 'prop-types';

const ExerciseStatistics = ({ exerciseStats }) => {
	if (!exerciseStats) {
		return <div>No exercise data available</div>;
	}

	return (
		<section>
			<h2 className="text-xl font-bold mb-4">Exercise Statistics</h2>
			<div className="grid grid-cols-2 gap-4">
				<div className="stat-card">
					<h3 className="text-sm font-medium">Total Sets</h3>
					<p className="text-lg font-bold">{exerciseStats.totalSets}</p>
				</div>
				<div className="stat-card">
					<h3 className="text-sm font-medium">Total Reps</h3>
					<p className="text-lg font-bold">{exerciseStats.totalReps}</p>
				</div>
				<div className="stat-card">
					<h3 className="text-sm font-medium">Avg Weight (kg)</h3>
					<p className="text-lg font-bold">{exerciseStats.avgWeight?.toFixed(2)}</p>
				</div>
				<div className="stat-card">
					<h3 className="text-sm font-medium">Max Weight (kg)</h3>
					<p className="text-lg font-bold">{exerciseStats.maxWeight?.toFixed(2)}</p>
				</div>
				<div className="stat-card">
					<h3 className="text-sm font-medium">Weight Progress (%)</h3>
					<p className="text-lg font-bold">{exerciseStats.weightProgress?.toFixed(2)}%</p>
				</div>
				<div className="stat-card">
					<h3 className="text-sm font-medium">Last Exercise Date</h3>
					<p className="text-lg font-bold">{exerciseStats.lastExerciseDate}</p>
				</div>
			</div>
		</section>
	);
};

ExerciseStatistics.propTypes = {
	exerciseStats: PropTypes.shape({
		totalSets: PropTypes.number.isRequired,
		totalReps: PropTypes.number.isRequired,
		avgWeight: PropTypes.number.isRequired,
		maxWeight: PropTypes.number.isRequired,
		weightProgress: PropTypes.number.isRequired,
		lastExerciseDate: PropTypes.string.isRequired,
	}),
};

export default ExerciseStatistics;