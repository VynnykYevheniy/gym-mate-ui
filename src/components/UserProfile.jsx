import { FaArrowsAltV, FaPhone, FaTelegramPlane, FaUserCircle } from 'react-icons/fa'; // Height icon
import { GiWeight } from 'react-icons/gi'; // Keeping the GiWeight for weight representation
import { useTranslation } from 'react-i18next';
import { currentUser } from "../service/UserService.jsx";
import { useEffect, useState } from "react";

const UserProfile = () => {
	const { t } = useTranslation();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const user = await currentUser();
				console.log(user);
				setUser(user);
			} catch (error) {
				console.error('Ошибка:', error);
			}
		};

		fetchUserData(); // Call the function to fetch user data
	}, []); // Empty dependency array ensures this runs only once when the component mounts

	if (!user) {
		return <div>Loading...</div>; // Optional: Add a loading state while fetching user data
	}

	return (
		<main className="flex flex-col items-center p-6 pb-12">
			{/* Profile Section */}
			<section className="w-full max-w-4xl p-6 text-center bg-white rounded-lg shadow-lg border border-green-300">
				{/* Profile Picture */}
				<div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-xl flex items-center justify-center border-4 border-blue-300">
					<FaUserCircle className="h-24 w-24 text-gray-400" /> {/* Profile icon */}
				</div>

				{/* User Info */}
				<h2 className="text-2xl font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
				<p className="text-gray-500 mb-4">{user.email}</p>

				{/* Additional Stats */}
				<ul className="py-4 mt-6 text-gray-700 flex items-center justify-around border-1 bg-gray-50 shadow-mb w-full rounded-lg">
					<li className="flex flex-col items-center justify-center">
						<div
							className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg ring-2 ring-white border-4 border-blue-300">
							<GiWeight className="h-10 w-10 text-white"/> {/* Weight icon */}
						</div>
						<div className="text-lg font-semibold">{user.weight || 75} kg</div>
					</li>
					<li className="flex flex-col items-center justify-center">
						<div
							className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg ring-2 ring-white border-4 border-blue-300">
							<FaArrowsAltV className="h-10 w-10 text-white"/> {/* Height icon */}
						</div>
						<div className="text-lg font-semibold">{user.height || 175} cm</div>
					</li>
					<li className="flex flex-col items-center justify-center">
						<div
							className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg ring-2 ring-white border-4 border-blue-300">
							<FaUserCircle className="h-10 w-10 text-white"/> {/* Placeholder for age */}
						</div>
						<div className="text-lg font-semibold">{user.age || 24} y.o</div>
					</li>
				</ul>

				{/* Action Button */}
				<div className="flex justify-center my-4"> {/* Use my-4 for equal vertical margins */}
					<button className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition">
						Edit Profile
					</button>
				</div>

				{/* Profile Details */}
				<ul className="p-4 space-y-4 bg-gray-50 rounded-lg shadow-md">
					{[
						{
							icon: <FaPhone className="mr-2 text-blue-500" />,
							label: t('userProfile.phoneNumber'),
							value: user.phoneNumber || '+123-456-78-90'
						},
						{
							icon: <FaTelegramPlane className="mr-2 text-blue-500" />,
							label: t('userProfile.telegramId'),
							value: '@gym_mate'
						},
					].map((item, index) => (
						<li key={index}
							className="flex items-center p-4 bg-white rounded-lg shadow-sm transition-all duration-200 hover:bg-gray-200 md:flex-row flex-col border-4 border-blue-300">
							<div className="flex items-center mb-2 md:mb-0">
								{item.icon}
							</div>
							<div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
								<strong className="text-gray-700">{item.label}:</strong>
								<span className="ml-1 text-gray-900">{item.value}</span>
							</div>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
};

export default UserProfile;