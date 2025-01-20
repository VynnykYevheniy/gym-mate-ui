import PropTypes from "prop-types";

const MuscleGroupSelection = ({index, training, muscleGroups, handleMuscleGroupChange}) => {
	return (
		<div className="mb-4 flex items-center">
			<label htmlFor={`muscleGroup-${index}`} className="block w-1/4 mb-2 text-sm text-gray-500">Muscle
				Group</label>
			<select
				id={`muscleGroup-${index}`}
				value={training.muscleGroup?.id || training.exercise?.muscleGroup?.id || ''}
				onChange={(e) => handleMuscleGroupChange(index, e.target.value)}
				className="w-3/4 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
			>
				<option value="" disabled selected>Select a muscle group</option>
				{muscleGroups.map((group) => (
					<option key={group.id} value={group.id}>
						{group.name}
					</option>
				))}
			</select>
		</div>
	);
}
MuscleGroupSelection.propTypes = {
	index: PropTypes.number.isRequired,
	training: PropTypes.object.isRequired,
	handleMuscleGroupChange: PropTypes.func.isRequired,
	muscleGroups: PropTypes.array.isRequired,
}
export default MuscleGroupSelection