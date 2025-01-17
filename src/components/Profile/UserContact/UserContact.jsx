import PropTypes from 'prop-types';
import {FaPhone, FaTelegramPlane} from 'react-icons/fa';
import ContactList from "./ContactList.jsx";


const UserContact = ({user, t}) => {
	const contacts = [
		{
			icon: <FaPhone className="mr-3 text-blue-600"/>,
			label: t('userProfile.phoneNumber'),
			value: user?.phoneNumber || '+380681231337',
			bgColor: 'bg-blue-100',
			textColor: 'text-blue-600',
		},
		{
			icon: <FaTelegramPlane className="mr-3 text-primary"/>,
			label: t('userProfile.email'),
			value: user?.email || 'email@example.com',
			bgColor: 'bg-teal-100',
			textColor: 'text-teal-600',
		},
	];

	return (
		<ContactList contacts={contacts}/>
	);
};

UserContact.propTypes = {
	user: PropTypes.shape({
		phoneNumber: PropTypes.string,
		email: PropTypes.string,
	}).isRequired,
	t: PropTypes.func.isRequired,
};

export default UserContact;
