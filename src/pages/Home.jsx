import {useEffect, useState} from 'react';
import WelcomeComponent from "../components/WelcomeComponent.jsx";
import {currentUser} from "../service/UserService.jsx";
import UserProfile from "../components/UserProfile.jsx"; // Import the UserProfile component

export default function Home() {
	const token = JSON.parse(localStorage.getItem("token"));
	if (!token?.accessToken) {
		return <WelcomeComponent/>;
	}

	return (
		<>
			<div
				className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
				{/* User display section (as previously implemented) */}
			</div>

			{/* Add UserProfile component here and pass user as a prop */}
			<UserProfile/>

			<div
				className="m-1 max-w-2xl mx-4 sm:max-w-sm md:max-wd-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
			</div>
		</>
	);
}