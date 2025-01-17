import PropTypes from 'prop-types';

const UserInfo = ({ firstName, lastName, login }) => {
	return (
		<div className="text-right sm:text-right">
			<h2 className="text-2xl">{firstName || 'First Name'}</h2>
			<h2 className="text-2xl">{lastName || 'Last Name'}</h2>
			<p className="text-secondTextColor">@{login || 'username'}</p>
		</div>
	);
};

UserInfo.propTypes = {
	firstName: PropTypes.string, // Ім'я користувача, необов'язкове
	lastName: PropTypes.string,  // Прізвище користувача, необов'язкове
	login: PropTypes.string,     // Логін користувача, необов'язкове
};

export default UserInfo;
