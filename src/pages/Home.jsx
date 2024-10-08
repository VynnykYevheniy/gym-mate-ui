import {useEffect, useState} from 'react';
import WelcomeComponent from "../components/WelcomeComponent.jsx";
import HeightSwg from "../assets/height.svg"
import WeightSwg from "../assets/weight.svg"
import AgeSwg from "../assets/age.svg"
import {currentUser} from "../service/UserService.jsx";

export default function Home() {
	const [user, setUser] = useState(null);
	const token = JSON.parse(localStorage.getItem("token"));
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const user = await currentUser();
				setUser(user);
			} catch (error) {
				console.error('Ошибка:', error);
			}
		};

		if (!user && token?.accessToken) {
			fetchUserData();
		}
	}, [token])
	if (!token?.accessToken) {
		return <WelcomeComponent/>;
	}
	return (
		<>
			<div
				className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
				<div className="rounded-t-lg h-32 overflow-hidden">
					<img className="object-cover object-top w-full"
						 src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
						 alt='Mountain'/>
				</div>
				<div
					className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
					<img className="object-cover object-center h-32"
						 src='https://www.seekpng.com/png/detail/202-2024774_my-profile-comments-my-profile-icon-png.png'
						 alt='Woman looking front'/>
				</div>
				<div className="text-center mt-2">
					<h2 className="font-semibold"> {user ? (user.firstName + ' ' + user.lastName) : ('Name')}</h2>
					<p className="text-gray-500">Telegram: {user ? (user.login) : ('Login')}</p>
				</div>
				<ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
					<li className="flex flex-col items-center justify-around">
						<img src={HeightSwg} className="h-10 w-10" alt="Height Icon"/>
						<div>131 cm</div>
					</li>
					<li className="flex flex-col items-center justify-between">
						<img src={WeightSwg} className="h-10 w-10" alt="Weight Icon"/>
						<div>81 kg</div>
					</li>
					<li className="flex flex-col items-center justify-around">
						<img src={AgeSwg} className="h-10 w-10" alt="Age Icon"/>
						<div>15 y.o</div>
					</li>
				</ul>
				<div className="p-4 border-t mx-8 mt-2">
				</div>
			</div>

			<div
				className=" m-1 max-w-2xl mx-4 sm:max-w-sm md:max-wd-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
			</div>
		</>
	)
}