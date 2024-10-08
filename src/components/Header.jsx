import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HamburgerMenu from './HamburgerMenu';

export default function Header() {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const { t, i18n } = useTranslation(); // Импортируйте i18n для смены языка

	// Monitor token changes in localStorage (from other tabs/windows)
	useEffect(() => {
		const handleStorageChange = (event) => {
			if (event.key === 'token') {
				setToken(localStorage.getItem('token')); // Update token if it's changed in another tab
			}
		};

		window.addEventListener('storage', handleStorageChange);

		// Clean up the event listener
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	// Update token state when it changes directly in this tab (after login/logout)
	useEffect(() => {
		const token = localStorage.getItem('token');
		setToken(token); // Update token state when it changes
	}, [localStorage.getItem('token')]); // Dependency on the token stored in localStorage

	// Функция для смены языка
	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
		<header className="flex items-center justify-between p-6 bg-white shadow">
			<Link to="/" className="flex items-center gap-2">
				<div className="h-10 w-10 bg-[url('./assets/biceps.svg')] bg-no-repeat bg-contain"/>
				<span className="text-xl font-black">Gym
            <span className="text-green-600"> Mate</span>
        </span>
			</Link>

			<div className="flex items-center space-x-4">
				{/* Выпадающий список для смены языка */}
				<select
					onChange={(e) => changeLanguage(e.target.value)}
					className="rounded-md border-gray-300 bg-white shadow-sm focus:border-green-500 focus:ring-green-500">
					<option value="en">Eng</option>
					<option value="uk">Укр</option>
					<option value="ru">Рус</option>
				</select>
			</div>

			{token ? (
				<HamburgerMenu />
			) : (
				<nav>
					<ul className="list-none flex space-x-2">
						<li>
							<Link
								className="nav-link scrollto rounded-md bg-green-600 py-2 px-4 font-semibold text-white shadow-lg transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
								to="/signin">{t('header.signIn')}</Link>
						</li>
						<li>
							<Link
								className="nav-link scrollto rounded-md bg-green-600 py-2 px-4 font-semibold text-white shadow-lg transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
								to="/signup">{t('header.signUp')}</Link>
						</li>
					</ul>
				</nav>
			)}
		</header>
	);
}