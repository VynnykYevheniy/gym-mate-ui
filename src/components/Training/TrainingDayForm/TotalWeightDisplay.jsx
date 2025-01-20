import PropTypes from 'prop-types';

const TotalWeightDisplay = ({totalWeight}) => (
	<div className="text-right text-xl text-gray-800 p-2">
		Total Training Weight: {totalWeight} kg
	</div>
);

TotalWeightDisplay.propTypes = {
	totalWeight: PropTypes.number.isRequired,
};

export default TotalWeightDisplay;