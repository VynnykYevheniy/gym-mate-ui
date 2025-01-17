import PropTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';

const ProfilePicture = ({ image }) => {
	return (
		<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary flex items-center justify-center bg-gray-200">
			{image ? (
				<img
					src={image}
					alt="ProfileInfo Picture"
					className="w-full h-full object-cover"
				/>
			) : (
				<FaUserCircle className="text-gray-400 text-6xl" />
			)}
		</div>
	);
};

ProfilePicture.propTypes = {
	image: PropTypes.string, // URL зображення, необов'язкове
};

export default ProfilePicture;