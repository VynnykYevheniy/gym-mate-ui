import {FaArrowsAltV, FaPhone, FaTelegramPlane, FaUserCircle} from 'react-icons/fa'; // Height icon
import {GiWeight} from 'react-icons/gi'; // Keeping the GiWeight for weight representation
import {useTranslation} from 'react-i18next';
import {currentUser} from "../service/UserService.jsx";
import {useEffect, useState} from "react";
import Loader from "./Loader.jsx";

const UserProfile = () => {
	const {t} = useTranslation();
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
		return <Loader/>; // Optional: Add a loading state while fetching user data
	}
	const handleEditProfile = () => {
		// Логика для открытия формы редактирования профиля
	};


	return (
		<main className="flex flex-col items-center p-6 pb-12">
			{/* Profile Section */}
			<section className="w-full max-w-4xl p-6 text-center bg-white rounded-lg shadow-lg border border-gray-400">
				<div
					className="flex flex-row items-center justify-between sm:items-start sm:space-x-6 ">
					{/* Profile Picture */}
					<div
						className="w-32 h-32 rounded-full overflow-hidden shadow-xl flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 ring-2 ring-white border-4 border-blue-300">
						<FaUserCircle className="h-24 w-24 text-white"/> {/* Profile icon */}
					</div>

					{/* User Info */}
					<div className="text-right sm:text-right">
						<h2 className="text-3xl font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
						<p className="text-gray-500 mb-4">{user.login}</p>
					</div>

				</div>
				{/* Additional Stats */}
				<ul className="py-4 my-6 text-gray-700 flex items-center justify-around border-1 shadow-mb w-full  rounded-lg
				pb-4 border-y-2">
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

				{/* Profile Details */}
				<ul className="space-y-6">
					{[
						{
							icon: <FaPhone className="mr-3 text-blue-600"/>,
							label: t('userProfile.phoneNumber'),
							value: user.phoneNumber || '+1234567890',
							bgColor: 'bg-blue-100',
							textColor: 'text-blue-600',
						},
						{
							icon: <FaTelegramPlane className="mr-3 text-teal-600"/>,
							label: t('userProfile.email'),
							value: user.email,
							bgColor: 'bg-teal-100',
							textColor: 'text-teal-600',
						},
					].map((item, index) => (
						<li key={index}
							className={`flex items-center justify-between border-2 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl ${item.bgColor}`}>
							<div className={`flex items-center justify-center rounded-full p-3 ${item.bgColor}`}>
								{item.icon}
							</div>
							<div className="flex flex-col md:flex-row md:items-center md:justify-between ml-4">
								<span className={`ml-2 ${item.textColor} font-medium`}>{item.value}</span>
							</div>
						</li>
					))}
				</ul>
			</section>
			{/* Floating Action Button */}
			<div className="fixed bottom-6 right-6">
				<button
					aria-label="Edit Profile"
					onClick={handleEditProfile}
					className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition">
					<FaUserCircle className="h-8 w-8"/>
				</button>
			</div>
		</main>
	);
};

export default UserProfile;