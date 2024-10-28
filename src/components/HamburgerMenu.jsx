import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {handleLogout} from '../service/AuthService.jsx';

const HamburgerMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleMenuItemClick = () => {
		// Close the menu when a menu item is clicked
		setIsOpen(false);
	};

	const handleLogoutClick = () => {
		handleLogout(); // Выполняем логаут
		handleMenuItemClick();  // Закрываем меню
		navigate('/signin');
	};

	return (
		<div className="relative">
			<button
				className="flex flex-col items-center justify-center p-2 text-gray-500 rounded-md focus:outline-none"
				onClick={toggleMenu}
				aria-label="Toggle menu"
				aria-expanded={isOpen}
				role="button"
				tabIndex={0}
			>
				<span
					className={`block w-6 h-1 bg-green-600 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''} mb-1`}></span>
				<span
					className={`block w-6 h-1 bg-green-600 transition-opacity duration-100 ${isOpen ? 'opacity-0' : 'opacity-100'} mb-1`}></span>
				<span
					className={`block w-6 h-1 bg-green-600 transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
			</button>

			{isOpen && (
				<div className="absolute right-0 w-48 bg-white shadow-lg mt-2 rounded-md z-50">
					<ul className="py-2">
						<li className="px-4 py-2 hover:bg-red-600">
							{/* Закрываем меню и выполняем логаут */}
							<button onClick={handleLogoutClick}>Log out</button>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default HamburgerMenu;