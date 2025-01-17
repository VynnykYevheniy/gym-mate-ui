import PropTypes from 'prop-types';

const StatItem = ({icon, value}) => {
	return (
		<li className="flex flex-col items-center justify-center">
			<div className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-primary">
				{icon}
			</div>
			<span className="text-lg">{value}</span>
		</li>
	);
};

StatItem.propTypes = {
	icon: PropTypes.element.isRequired, // Іконка, обов'язкова
	value: PropTypes.string.isRequired, // Значення, обов'язкове
};

export default StatItem;