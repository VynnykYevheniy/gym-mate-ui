import PropTypes from 'prop-types';
import ProfilePicture from './ProfilePicture.jsx';
import UserInfo from './UserInfo.jsx';

const UserProfile = ({user, image}) => {
	return (
		<div className="flex flex-row items-start justify-between sm:items-start sm:space-x-6">
			{/* ProfileInfo Picture */}
			<ProfilePicture image={image}/>
			{/* User Info */}
			<UserInfo
				firstName={user?.firstName}
				lastName={user?.lastName}
				login={user?.login}
			/>
		</div>
	);
};

UserProfile.propTypes = {
	user: PropTypes.shape({
		firstName: PropTypes.string, // Ім'я користувача
		lastName: PropTypes.string,  // Прізвище користувача
		login: PropTypes.string,     // Логін користувача
	}),
	image: PropTypes.string, // URL зображення профілю
};

export default UserProfile;