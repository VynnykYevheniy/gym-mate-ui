import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import UserSvg from '../assets/image/UserSvg.svg';
import CalendarSvg from '../assets/image/CalendarSvg.svg';
import WorkoutSvg from '../assets/image/WorkoutSvg.svg';
import Trainer from '../assets/Trainer.svg';
import ManagerSvg from '../assets/manager.svg';

export default function BottomNavbar() {
	// Локальное состояние для хранения ссылки на профиль
	const [profileLink, setProfileLink] = useState(localStorage.getItem("profileLink"));

	// Эффект для отслеживания изменений в localStorage
	useEffect(() => {
		const handleStorageChange = () => {
			const updatedProfileLink = localStorage.getItem("profileLink");
			setProfileLink(updatedProfileLink);
		};

		// Добавляем прослушиватель события изменения localStorage
		window.addEventListener("storage", handleStorageChange);

		// Обновляем значение при каждом рендере компонента
		handleStorageChange();

		// Убираем прослушиватель при размонтировании компонента
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	return (
		<div className="fixed inset-x-0 bottom-0 bg-white shadow-lg z-50 h-16">
			<div className="flex justify-between items-center p-4">
				<Link to={profileLink || '/'} className="flex flex-col items-center text-gray-500 hover:text-green-600">
					<img src={UserSvg} alt="Profile Icon" className="h-5 w-5 text-red-400"/>
					<span>Profile</span>
				</Link>
				<Link to="/calendar" className="flex flex-col items-center text-gray-500 hover:text-green-600">
					<img src={CalendarSvg} alt="Calendar Icon" className="h-5 w-5 text-red-400"/>
					<span>Calendar</span>
				</Link>
				<Link to="/training" className="flex flex-col items-center text-gray-500 hover:text-green-600">
					<img src={WorkoutSvg} alt="Workout Icon" className="h-5 w-5 text-red-400"/>
					<span>Workout</span>
				</Link>
				<Link to="/trainer" className="flex flex-col items-center text-gray-500 hover:text-green-600">
					<img src={Trainer} alt="Trainer Icon" className="h-5 w-5 text-red-400"/>
					<span>Trainer</span>
				</Link>
				<Link to="/clientmanager" className="flex flex-col items-center text-gray-500 hover:text-green-600">
					<img src={ManagerSvg} alt="Manager Icon" className="h-5 w-5 text-red-400"/>
					<span>Client Manager</span>
				</Link>
			</div>
		</div>
	);
}