import {FaArrowsAltV, FaPhone, FaTelegramPlane, FaUserCircle} from 'react-icons/fa'; // Height icon
import {GiWeight} from 'react-icons/gi'; // Keeping the GiWeight for weight representation
import {useTranslation} from 'react-i18next';
import {useEffect, useState} from "react";
import Loader from "./Loader.jsx";
import WeightBMIChart from "./WeightChart.jsx"


const UserProfile = () => {
	const {t} = useTranslation();
	const [user, setUser] = useState(null);
	const weightData = [
		{date: '2023-10-01', weight: 55},
		{date: '2023-10-02', weight: 58},
		{date: '2023-10-03', weight: 69},
		{date: '2023-10-04', weight: 70},
		{date: '2023-12-04', weight: 80},
		{date: '2023-10-04', weight: 67},
		{date: '2023-10-04', weight: 76},
		{date: '2023-10-04', weight: 73},
		{date: '2023-10-04', weight: 80},
		{date: '2023-10-04', weight: 90},
		{date: '2023-10-04', weight: 92},
		{date: '2023-12-04', weight: 79},
		{date: '2023-12-04', weight: 82}];
	const bmiData = [
		{ date: '2023-10-01', bmi: 18.5 },
		{ date: '2023-10-02', bmi: 19.0 },
		{ date: '2023-10-03', bmi: 21.4 },
		{ date: '2023-10-04', bmi: 21.7 },
		{ date: '2023-10-05', bmi: 22.1 },
		{ date: '2023-10-06', bmi: 23.5 },
		{ date: '2023-10-07', bmi: 24.1 },
		{ date: '2023-10-08', bmi: 25.3 },
		{ date: '2023-10-09', bmi: 26.8 },
		{ date: '2023-10-10', bmi: 27.2 },
		{ date: '2023-10-11', bmi: 27.5 },
		{ date: '2023-10-12', bmi: 28.0 },
		{ date: '2023-10-13', bmi: 28.5 },
	];

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("user"))); // Call the function to fetch user data
	}, []); // Empty dependency array ensures this runs only once when the component mounts

	if (!user) {
		return <Loader/>; // Optional: Add a loading state while fetching user data
	}
	const handleEditProfile = () => {
		// Логика для открытия формы редактирования профиля
	};


	return (
		<main className=" flex-col items-center justify-center p-4 pb-12 ">
			{/* Profile Section */}
			<section
				className="w-full p-6 text-center bg-white rounded-lg mb-6">
				<div
					className="flex flex-row items-center justify-between sm:items-start sm:space-x-6 ">
					{/* Profile Picture */}
					<div
						className="w-32 h-32 rounded-full overflow-hidden shadow-xl flex items-center justify-center  ring-2 ring-white border-4 border-blue-300">
						<FaUserCircle className="h-24 w-24 text-white"/> {/* Profile icon */}
					</div>

					{/* User Info */}
					<div className="text-right sm:text-right">
						<h2 className="text-2xl ">{`${user.firstName} ${user.lastName}`}</h2>
						<p className="text-gray-500 mb-4">@{user.login}</p>
					</div>

				</div>
				{/* Additional Stats */}

				<ul className="py-4 my-6 text-gray-500 flex items-center justify-around shadow-mb w-full  rounded-lg
				pb-4">


					<li className="flex flex-col items-center justify-center">
						<div
							className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg ring-2 ring-white border-4 border-blue-300">
							<FaUserCircle className="h-10 w-10 text-white"/> {/* Placeholder for age */}
						</div>
						<div className="text-lg ">{user.age || 24} y.o</div>
					</li>
					<li className="flex flex-col items-center justify-center">
						<div
							className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg ring-2 ring-white border-4 border-blue-300">
							<GiWeight className="h-10 w-10 text-white"/> {/* Weight icon */}
						</div>
						<div className="text-lg ">{user.weight || 75} kg</div>
					</li>
					<li className="flex flex-col items-center justify-center">
						<div
							className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg ring-2 ring-white border-4 border-blue-300">
							<FaArrowsAltV className="h-10 w-10 text-white"/> {/* Height icon */}
						</div>
						<div className="text-lg ">{user.height || 175} cm</div>
					</li>
				</ul>


				{/* Profile Details */}
				<ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{[
						{
							icon: <FaPhone className="mr-3 text-blue-600"/>,
							label: t('userProfile.phoneNumber'),
							value: user.phoneNumber || '+380681231337',
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
			<section
				className="w-full p-2 text-center bg-white rounded-lg mb-6">
				<WeightBMIChart weightData={weightData} bmiData={bmiData}/>
			</section>
			{/* Floating Action Button */}
			<div className="fixed bottom-6 right-6 mb-20">
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