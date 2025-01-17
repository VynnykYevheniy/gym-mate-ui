import PropTypes from 'prop-types';
import StatItem from './StatItem.jsx';

const StatsList = ({stats}) => {
	return (
		<ul className="py-4 my-6 text-secondTextColor flex items-center justify-around">
			{stats.map((item, index) => (
				<StatItem key={index} icon={item.icon} value={item.value}/>
			))}
		</ul>
	);
};

StatsList.propTypes = {
	stats: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.element.isRequired, // Іконка, обов'язкова
			value: PropTypes.string.isRequired, // Значення, обов'язкове
		})
	).isRequired, // Масив статистики, обов'язковий
};

export default StatsList;