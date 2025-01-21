import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";

const HamburgerMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleMenuItemClick = () => {
		// Закрыть меню, когда элемент меню нажат
		setIsOpen(false);
	};
	const handleSettingsClick = () => {
		handleMenuItemClick();
		navigate('/settings');
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
					className={`block w-6 h-1 bg-primary transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''} mb-1`}></span>
				<span
					className={`block w-6 h-1 bg-primary transition-opacity duration-100 ${isOpen ? 'opacity-0' : 'opacity-100'} mb-1`}></span>
				<span
					className={`block w-6 h-1 bg-primary transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
			</button>

			{isOpen && (
				<div className="absolute right-0 w-48 bg-slate-50 shadow-lg mt-2 rounded-md z-50">
					<ul className="py-2">
						<Link to={'/settings'}><li className="px-4 py-2 hover:bg-primaryHover" onClick={handleSettingsClick}>
							{/* Закрываем меню и выполняем логаут */}
								<button onClick={handleSettingsClick}>Settings</button>

						</li>
						</Link>
					</ul>
				</div>
			)}
		</div>
	);
};

export default HamburgerMenu;