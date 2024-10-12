import WelcomeComponent from "../components/WelcomeComponent.jsx";
import UserProfile from "../components/UserProfile.jsx"; // Import the UserProfile component

export default function Home() {
	const token = JSON.parse(localStorage.getItem("token"));
	return (
		token ? <UserProfile/> : <WelcomeComponent/>
	);
}