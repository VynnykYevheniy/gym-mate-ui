import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import HamburgerMenu from './HamburgerMenu';

export default function Header() {
	const [token, setToken] = useState(localStorage.getItem('token')); // Инициализируем состояние токена
	const {t, i18n} = useTranslation();

	useEffect(() => {
		const handleTokenChange = () => {
			setToken(localStorage.getItem('token')); // Обновляем состояние токена при изменении или удалении
		};

		// Перехватываем изменения токена в localStorage
		window.addEventListener('storage', handleTokenChange);

		// Переопределяем localStorage.setItem для обновления токена
		const originalSetItem = localStorage.setItem;
		localStorage.setItem = function (key, value) {
			originalSetItem.apply(this, arguments);
			if (key === 'token') {
				handleTokenChange(); // Обновляем токен после логина/разлогина
			}
		};

		// Переопределяем localStorage.removeItem для отслеживания удаления токена
		const originalRemoveItem = localStorage.removeItem;
		localStorage.removeItem = function (key) {
			originalRemoveItem.apply(this, arguments);
			if (key === 'token') {
				handleTokenChange(); // Обновляем токен после его удаления
			}
		};

		// Убираем обработчики при размонтировании компонента
		return () => {
			window.removeEventListener('storage', handleTokenChange);
			localStorage.setItem = originalSetItem; // Восстанавливаем оригинальный setItem
			localStorage.removeItem = originalRemoveItem; // Восстанавливаем оригинальный removeItem
		};
	}, []);

	// Функция для смены языка
	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
		<header
			className="relative flex items-center bg-gradient-to-r from-white to-slate-50 justify-between p-2 bg-slate-50 shadow-lg h-16">
			<div className="flex items-center gap-2">
				<div className="h-10 w-10 bg-[url('./assets/biceps.svg')] bg-no-repeat bg-contain"/>
				<span className="text-2xl font-black text-gray-800">
					Gym
					<span className="text-green-500"> Mate</span>
				</span>
			</div>

			<div className="flex items-center space-x-4">
				{/* Language selector */}
				<select
					onChange={(e) => changeLanguage(e.target.value)}
					className="rounded-md border border-gray-300 bg-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500">
					<option value="en">Eng</option>
					<option value="uk">Укр</option>
					<option value="ru">Рус</option>
				</select>
			</div>

			{token ? (
				<HamburgerMenu/>
			) : (
				<nav className="hidden md:flex">
					<ul className="list-none flex space-x-2">
						<li>
							<Link
								className="nav-link rounded-md bg-green-500 py-2 px-4 font-semibold text-white shadow-lg transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
								to="/signin">
								{t('header.signIn')}
							</Link>
						</li>
						<li>
							<Link
								className="nav-link rounded-md bg-green-500 py-2 px-4 font-semibold text-white shadow-lg transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
								to="/signup">
								{t('header.signUp')}
							</Link>
						</li>
					</ul>
				</nav>
			)}
		</header>
	);
}