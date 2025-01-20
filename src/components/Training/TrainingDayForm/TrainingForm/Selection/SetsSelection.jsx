import * as Props from "prop-types";
import PropTypes from "prop-types";
import SetItem from "./Sets/SetItem.jsx";

const SetsSelection = ({index, trainingDetails, handleTrainingDetailChange}) => {
	return (
		trainingDetails.map((detail, indexDetail) => (
			<SetItem index={index}
					 indexDetail={indexDetail}
					 detail={detail}
					 handleTrainingDetailChange={handleTrainingDetailChange}/>
		))
	);
}
SetsSelection.propTypes = {
	index: PropTypes.number.isRequired,
	trainingDetails: Props.array.isRequired,
	handleTrainingDetailChange: PropTypes.func.isRequired,
}
export default SetsSelection;