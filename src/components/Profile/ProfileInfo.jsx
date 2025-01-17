import {useTranslation} from 'react-i18next';
import PropTypes from "prop-types";
import UserProfile from "./UserProfile/UserProfile.jsx";
import UserStats from "./UserStats/UserStats.jsx";
import UserContact from "./UserContact/UserContact.jsx";

const ProfileInfo = ({user, body, image}) => {
	const {t} = useTranslation();
	return (
		<section>
			<UserProfile user={user} image={image}/>
			<UserStats user={user} body={body}/>
			<UserContact user={user} t={t}/>
		</section>
	);
}

ProfileInfo.propTypes = {
	user: PropTypes.shape({
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		login: PropTypes.string,
		age: PropTypes.number,
		phoneNumber: PropTypes.string,
		email: PropTypes.string,
	}),
	body: PropTypes.shape({
		weight: PropTypes.number,
		height: PropTypes.number,
	}),
	image: PropTypes.string,
};

export default ProfileInfo;