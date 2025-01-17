import PropTypes from "prop-types";
import ContactItem from "./ContactItem.jsx";

const ContactList = ({contacts}) => {
	return (
		<ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
			{contacts.map((item, index) => (
				<ContactItem
					key={index}
					icon={item.icon}
					value={item.value}
					bgColor={item.bgColor}
					textColor={item.textColor}
				/>
			))}
		</ul>
	);
};

ContactList.propTypes = {
	contacts: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.element.isRequired, // Іконка, обов'язкова
			value: PropTypes.string.isRequired, // Значення, обов'язкове
			bgColor: PropTypes.string.isRequired, // Значення, обов'язкове
			textColor: PropTypes.string.isRequired, // Значення, обов'язкове
		})
	).isRequired, // Масив статистики, обов'язковий
};

export default ContactList;