import PropTypes from "prop-types";

const EmptyDays = ({count}) => {
	return (
		<>
			{Array.from({length: count}).map((_, index) => (
				<div key={`empty-${index}`} />
			))}
		</>
	);
};

EmptyDays.propTypes = {
	count: PropTypes.number.isRequired,
};

export default EmptyDays;