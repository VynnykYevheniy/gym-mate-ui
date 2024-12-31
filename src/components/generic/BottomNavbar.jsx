import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import UserSvg from '../../assets/image/UserSvg.svg';
import CalendarSvg from '../../assets/image/CalendarSvg.svg';
import WorkoutSvg from '../../assets/image/WorkoutSvg.svg';
import Trainer from '../../assets/Trainer.svg';

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
			<div className="flex justify-between items-center p-2">
				<Link to={profileLink || '/'}
					  className="flex flex-col items-center text-gray-500 hover:text-green-600 text-sm">
					<img src={UserSvg} alt="Profile Icon" className="h-6 w-6 mb-1"/>
					<span>Profile</span>
				</Link>
				<Link to="/calendar" className="flex flex-col items-center text-gray-500 hover:text-green-600 text-sm">
					<img src={CalendarSvg} alt="Calendar Icon" className="h-6 w-6 mb-1"/>
					<span>Calendar</span>
				</Link>
				<Link to="/training" className="flex flex-col items-center text-gray-500 hover:text-green-600 text-sm">
					<img src={WorkoutSvg} alt="Workout Icon" className="h-6 w-6 mb-1"/>
					<span>Workout</span>
				</Link>
				<Link to="/statistics"
					  className="flex flex-col items-center text-gray-500 hover:text-green-600 text-sm">
					<img src={Trainer} alt="Trainer Icon" className="h-6 w-6 mb-1"/>
					<span>Analytics</span>
				</Link>
				{/*<Link to="/trainers" className="flex flex-col items-center text-gray-500 hover:text-green-600 text-sm">
					<img src={trainer} alt="trainer Icon" className="h-6 w-6 mb-1"/>
					<span>trainer</span>
				</Link>
				<Link to="/welcome" className="flex flex-col items-center text-gray-500 hover:text-green-600 text-sm">
					<img src={""} alt="trainer Icon" className="h-6 w-6 mb-1"/>
					<span>Welcome</span>
				</Link>
				<Link to="/clientmanager"
					  className="flex flex-col items-center text-gray-500 hover:text-green-600 text-sm">
					<img src={ManagerSvg} alt="Manager Icon" className="h-6 w-6 mb-1"/>
					<span>Client Manager</span>
				</Link>*/}
			</div>
		</div>
	);
}