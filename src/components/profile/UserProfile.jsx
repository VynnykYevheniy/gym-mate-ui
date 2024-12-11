import {FaArrowsAltV, FaBirthdayCake, FaPhone, FaTelegramPlane, FaUserCircle} from 'react-icons/fa';
import {GiWeight} from 'react-icons/gi';
import {useTranslation} from 'react-i18next';
import PropTypes from "prop-types";

function UserProfile({ user, body, image }) {
	const {t} = useTranslation();
	return (
		<section className="w-full p-6 text-center bg-white rounded-lg mb-6">
			<div className="flex flex-row items-start justify-between sm:items-start sm:space-x-6">
				{/* Profile Picture */}
				<div
					className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-300 flex items-center justify-center bg-gray-200">
					{image ? (
						<img
							src={image}
							alt="Profile Picture"
							className="w-full h-full object-cover"
						/>
					) : (
						<FaUserCircle className="text-gray-400 text-6xl"/>
					)}
				</div>
				{/* User Info */}
				<div className="text-right sm:text-right">
					<h2 className="text-2xl">{`${user?.firstName || 'First Name'}`}</h2>
					<h2 className="text-2xl">{`${user?.lastName || 'Last Name'}`}</h2>
					<p className="text-gray-500">@{user?.login || 'username'}</p>
				</div>
			</div>
			{/* Additional Stats */}
			<ul className="py-4 my-6 text-gray-500 flex items-center justify-around">
				{[
					{
						icon: <FaBirthdayCake className="h-10 w-10 text-green-400"/>,
						value: `${user?.age || 0} y.o`
					},
					{
						icon: <GiWeight className="h-10 w-10 text-green-400"/>,
						value: `${body?.weight || 75} kg`
					},
					{
						icon: <FaArrowsAltV className="h-10 w-10 text-green-400"/>,
						value: `${body?.height || 175} cm`
					},
				].map((item, index) => (
					<li key={index} className="flex flex-col items-center justify-center">
						<div
							className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-green-300">
							{item.icon}
						</div>
						<span className="text-lg">{item.value}</span>
					</li>
				))}
			</ul>
			{/* Contact Details */}
			<ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{[
					{
						icon: <FaPhone className="mr-3 text-blue-600"/>,
						label: t('userProfile.phoneNumber'),
						value: user?.phoneNumber || '+380681231337',
						bgColor: 'bg-blue-100',
						textColor: 'text-blue-600',
					},
					{
						icon: <FaTelegramPlane className="mr-3 text-teal-600"/>,
						label: t('userProfile.email'),
						value: user?.email || 'email@example.com',
						bgColor: 'bg-teal-100',
						textColor: 'text-teal-600',
					},
				].map((item, index) => (
					<li key={index}
						className={`flex items-center justify-between p-2 rounded-lg ${item.bgColor}`}>
						<div className={`flex items-center justify-center rounded-full ${item.bgColor}`}>
							{item.icon}
						</div>
						<div className="flex flex-col md:flex-row md:items-center md:justify-between">
							<span className={`${item.textColor}`}>{item.value}</span>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}

UserProfile.propTypes = {
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

export default UserProfile;