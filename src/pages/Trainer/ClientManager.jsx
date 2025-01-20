import {useTranslation} from 'react-i18next';
import {currentUser} from "../../service/UserService.jsx";
import {useEffect, useState} from "react";
import SidebarClientsList from "./SidebarClientsList.jsx";
import {GiWeight} from "react-icons/gi";
import {FaArrowsAltV, FaPhone, FaTelegramPlane, FaUserCircle} from "react-icons/fa";
import Loader from "../../components/generic/Loader.jsx";


const ClientManager = () => {
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


	return (
		<>
			<SidebarClientsList/>
			<main className=" flex items-center justify-center flex-col pb-12 ml-16">

				{/* ProfileInfo Selection */}
				<section className="w-full p-2 text-center bg-white rounded-lg">
					<div
						className="flex flex-row  items-center justify-between sm:items-start sm:space-x-6 ">
						{/* ProfileInfo Picture */}
						<div
							className=" w-32 h-32 rounded-full border-2 border-b-cyan-50 overflow-hidden  flex items-center justify-center">
							<img
								src={/*UserSvg*/ "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"} // путь к картинке профиля пользователя
								alt={`${user.firstName} ${user.lastName}`}
								className="w-full h-full shadow-xl rounded-full object-cover bg-white" // делаем изображение круглым и пропорциональным
							/>
						</div>
						{/* User Info */}
						<div className="text-right sm:text-right">
							<h2 className="text-2xl ">{`${user.firstName} ${user.lastName}`}</h2>
							<p className="text-gray-500 mb-4">@{user.login}</p>
						</div>
					</div>


					{/* ProfileInfo Details */}
					<ul className="grid gap-2 text-right grid-cols-1 md:grid-cols-2 mt-5">
						{[
							{
								icon: <FaPhone className="mr-3 text-blue-600"/>,
								label: t('userProfile.phoneNumber'),
								value: user.phoneNumber || '0681231337',
								bgColor: 'bg-blue-100',
								textColor: 'text-blue-600',
							},
							{
								icon: <FaTelegramPlane className="mr-3 text-teal-600"/>,
								label: t('user@gmail.com'),
								value: user.email,
								bgColor: 'bg-teal-100',
								textColor: 'text-teal-600',
							},
						].map((item, index) => (
							<li key={index}
								className={`flex items-center justify-between p-2 rounded-lg ${item.bgColor}`}>
								<div className={`flex items-center  justify-center rounded-full ${item.bgColor}`}>
									{item.icon}
								</div>
								<div className="flex flex-col md:flex-row md:items-center md:justify-between">
									<span className={`${item.textColor}`}>{item.value}</span>
								</div>
							</li>
						))}
					</ul>
					{/* Additional Stats */}
					<ul className="py-4  text-gray-500 flex items-center justify-around shadow-mb w-full  rounded-lg
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


				</section>
				<section className="w-full p-2 text-center bg-white rounded-lg">
					{/*<Calendar/>*/}
				</section>


			</main>
		</>
	);
};

export default ClientManager;