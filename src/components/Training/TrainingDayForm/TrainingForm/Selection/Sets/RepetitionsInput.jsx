import {FaRedo} from "react-icons/fa";
import PropTypes from "prop-types";
import WeightInput from "./WeightInput.jsx";

const RepetitionsInput = ({index, setIndex, repetition, handleTrainingDetailChange}) => {
	return (
		<div className="relative w-1/2">
			<label className="sr-only" htmlFor={`reps-${index}-${setIndex}`}>Reps</label>
			<FaRedo className="absolute left-3 top-4 text-gray-500"/>
			<input
				type="number"
				id={`reps-${index}-${setIndex}`}
				className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
				placeholder="reps"
				value={repetition}
				onChange={(e) => handleTrainingDetailChange(index, setIndex, 'repetition', e.target.value)}
			/>
		</div>
	);
}
WeightInput.propTypes = {
	index: PropTypes.number.isRequired,
	setIndex: PropTypes.func.isRequired,
	repetition: PropTypes.number.isRequired,
	handleTrainingDetailChange: PropTypes.func.isRequired,
}
export default RepetitionsInput;