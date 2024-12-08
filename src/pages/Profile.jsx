import WeightBMIChart from "../components/profile/WeightChart.jsx";
import BJUCalculator from "../components/generic/BJUCalculator.jsx";
import UserProfile from "../components/profile/UserProfile.jsx";
import ProfileEditMenu from "../components/profile/ProfileEditMenu.jsx";

const Profile = () => {
	return (
		<main className="flex-col items-center justify-center p-4 pb-12">
			{/* profile Section */}
			<UserProfile/>

			{/* Weight and BMI Chart */}
			<WeightBMIChart/>

			{/* BJU Calculator */}
			<BJUCalculator/>

			{/* Edit Options */}
			<ProfileEditMenu/>

		</main>
	);
}
export default Profile;