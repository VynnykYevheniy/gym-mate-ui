import PropTypes from 'prop-types';

const ContactItem = ({icon, value, bgColor, textColor}) => (
	<li
		className={`flex items-center justify-between p-2 rounded-lg ${bgColor}`}>
		<div className={`flex items-center justify-center rounded-full ${bgColor}`}>
			{icon}
		</div>
		<div className="flex flex-col md:flex-row md:items-center md:justify-between">
			<span className={`${textColor}`}>{value}</span>
		</div>
	</li>
);

ContactItem.propTypes = {
	icon: PropTypes.element.isRequired,
	value: PropTypes.string.isRequired,
	bgColor: PropTypes.string.isRequired,
	textColor: PropTypes.string.isRequired,
};

export default ContactItem;
