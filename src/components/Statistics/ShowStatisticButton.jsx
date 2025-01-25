import PropTypes from "prop-types";

const ShowStatisticsButton = ({onClick}) => {
	return (
		<button
			onClick={onClick}
			className="mt-4 px-4 py-2 rounded text-white bg-primary"
		>
			Show Statistics
		</button>
	);
};

ShowStatisticsButton.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default ShowStatisticsButton;