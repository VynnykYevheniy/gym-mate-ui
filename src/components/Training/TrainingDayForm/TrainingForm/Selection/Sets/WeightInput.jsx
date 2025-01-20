import {FaWeightHanging} from "react-icons/fa";
import PropTypes from "prop-types";

const WeightInput = ({index, setIndex, weight, handleTrainingDetailChange}) => {
	return (
		<div className="relative w-1/2">
			<label className="sr-only" htmlFor={`weight-${index}-${setIndex}`}>Weight</label>
			<FaWeightHanging className="absolute left-3 top-4 text-gray-500"/>
			<input
				type="number"
				id={`weight-${index}-${setIndex}`}
				className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
				placeholder="kg"
				value={weight}
				onChange={(e) => handleTrainingDetailChange(index, setIndex, 'weight', e.target.value)}
			/>
		</div>
	);
}
WeightInput.propTypes = {
	index: PropTypes.number.isRequired,
	setIndex: PropTypes.func.isRequired,
	weight: PropTypes.number.isRequired,
	handleTrainingDetailChange: PropTypes.func.isRequired,
}
export default WeightInput;