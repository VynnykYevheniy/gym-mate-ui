import PropTypes from "prop-types";

const CountSetsInput = ({index, training, handleSetsChange}) => {
	return (
		<div className="mb-4 flex items-center">
			<label htmlFor={`sets-${index}`} className="block w-1/4 mb-2 text-sm font-medium text-gray-500">Sets</label>
			<input
				type="number"
				id={`sets-${index}`}
				min="1"
				max="4"
				placeholder="Number of sets (e.g., 4)"
				value={training.trainingDetails.length ? training.trainingDetails.length : ''}
				onChange={(e) => handleSetsChange(index, e.target.value)}
				className="w-3/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
			/>
		</div>
	);
}
CountSetsInput.propTypes = {
	index: PropTypes.number.isRequired,
	training: PropTypes.object.isRequired,
	handleSetsChange: PropTypes.func.isRequired,
}
export default CountSetsInput;