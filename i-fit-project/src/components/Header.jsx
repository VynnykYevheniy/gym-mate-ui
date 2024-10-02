import {Link} from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

export default function Header() {
	const token = localStorage.getItem('token');

	return (
		<header className="flex items-center justify-between p-6 bg-white shadow">
			<Link to="/" className="flex items-center gap-2">
				<div className="h-10 w-10 bg-[url('./assets/biceps.svg')] bg-no-repeat bg-contain"/>
				<span className="text-xl font-black">Gym
            <span className="text-green-600"> Mate</span>
        </span>
			</Link>

			{token ? (
				<HamburgerMenu/>
			) : (
				<nav>
					<ul className="list-none flex space-x-2">
						<li>
							<Link
								className="nav-link scrollto rounded-md bg-green-600 py-2 px-4 font-semibold text-white shadow-lg transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
								to="/signin">Sign In</Link>
						</li>
						<li>
							<Link
								className="nav-link scrollto rounded-md bg-green-600 py-2 px-4 font-semibold text-white shadow-lg transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
								to="/signup">Sign Up</Link>
						</li>
					</ul>
				</nav>
			)}
		</header>
	);
}