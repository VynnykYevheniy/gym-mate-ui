import WeightInput from "./WeightInput.jsx";
import RepetitionsInput from "./RepetitionsInput.jsx";
import PropTypes from "prop-types";

const SetItem = ({index, indexDetail, detail, handleTrainingDetailChange}) => {
	return (
		<div key={indexDetail} className="mb-4 flex items-center space-x-4">
			<span className="text-gray-400 w-1/8 p-3 ">{indexDetail + 1}</span>

			<WeightInput index={index}
						 weight={detail.weight || ''}
						 setIndex={indexDetail}
						 handleTrainingDetailChange={handleTrainingDetailChange}/>

			<RepetitionsInput index={index}
							  setIndex={indexDetail}
							  repetition={detail.repetition || ''}
							  handleTrainingDetailChange={handleTrainingDetailChange}/>
		</div>
	);
}
SetItem.propTypes = {
	index: PropTypes.number.isRequired,
	indexDetail: PropTypes.number.isRequired,
	detail: PropTypes.object.isRequired,
	handleTrainingDetailChange: PropTypes.func.isRequired,
}
export default SetItem