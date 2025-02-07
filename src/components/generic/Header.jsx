import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import HamburgerMenu from './HamburgerMenu.jsx';
import AuthContext from "../../context/AuthProvider.jsx";
import {useContext} from "react";

export default function Header() {
	const {token} = useContext(AuthContext);
	const {t, i18n} = useTranslation();
	const profileLink = localStorage.getItem('profileLink') || "/";

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
		<header
			className="relative flex items-center justify-between p-2 bg-white h-12">
			<Link to={profileLink} className="flex items-center gap-2">
				<div className="h-10 w-10 bg-[url('./assets/biceps.svg')] bg-no-repeat bg-contain"/>
				<span className="text-2xl font-black text-gray-800">
					Gym
					<span className="text-primary"> Mate</span>
				</span>
			</Link>

			<div className="flex items-center space-x-4">
				<select
					onChange={(e) => changeLanguage(e.target.value)}
					className="rounded-md border border-gray-300 bg-white shadow-sm focus:border-primary focus:ring focus:ring-primary">
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
								className="nav-link rounded-md bg-primary py-2 px-4 font-semibold text-white shadow-lg transition duration-150 ease-in-out hover:bg-primary hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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