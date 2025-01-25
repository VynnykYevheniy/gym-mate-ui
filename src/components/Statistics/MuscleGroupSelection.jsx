import PropTypes from "prop-types";
import ShowStatisticsButton from "./ShowStatisticButton.jsx";

const MuscleGroupSelection = ({muscleGroups, selectedMuscleGroup, handleMuscleGroupChange, fetchStatisticsData}) => {
	return (
		<section>
			<div className="flex justify-center mt-4">
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

			</div>
			<ShowStatisticsButton onClick={fetchStatisticsData}/>
		</section>
	);
};

MuscleGroupSelection.propTypes = {
	muscleGroups: PropTypes.array.isRequired,
	selectedMuscleGroup: PropTypes.any,
	handleMuscleGroupChange: PropTypes.func.isRequired,
	fetchStatisticsData: PropTypes.func.isRequired,
};

export default MuscleGroupSelection;