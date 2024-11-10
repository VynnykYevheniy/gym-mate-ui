import {FaArrowsAltV, FaPhone, FaTelegramPlane, FaUserCircle} from 'react-icons/fa';
import {GiWeight} from 'react-icons/gi';
import {useTranslation} from 'react-i18next';
import {useEffect, useState} from 'react';
import Loader from '../generic/Loader.jsx';
import WeightBMIChart from './WeightChart.jsx';
import {fetchAnalytics, fetchCurrentAnalytics, updateUser} from "../../service/UserService.jsx";
import EditOptionsDropdown from "./EditButton.jsx";
import EditProfileModal from "./EditProfileModal.jsx";

const UserProfile = () => {
	const {t} = useTranslation();
	const [user, setUser] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editSection, setEditSection] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phoneNumber: '',
		email: '',
		weight: '',
		height: ''
	});

	const [weightData, setWeightData] = useState();
	const [bmiData, setBmiData] = useState();

	useEffect(() => {
		const savedUser = JSON.parse(localStorage.getItem("user"));
		setUser(savedUser);
		setFormData({
			firstName: savedUser?.firstName || '',
			lastName: savedUser?.lastName || '',
			phoneNumber: savedUser?.phoneNumber || '',
			email: savedUser?.email || '',
		});

		const fetchAndSetAnalytics = async () => {
			const analytics = await fetchAnalytics();
			const currentAnalytics = await fetchCurrentAnalytics();
			const weights = [];
			const bmiData = [];

			analytics.forEach((analytic) => {
				weights.push({date: analytic.date, weight: analytic.weight});
				bmiData.push({date: analytic.date, bmi: analytic.bmi});
			});

			setWeightData(weights);
			setBmiData(bmiData);
			setUser((prevUser) => ({
				...prevUser, // Keep existing user data
				weight: currentAnalytics.weight,
				height: currentAnalytics.height
			}));
		};
		fetchAndSetAnalytics();
	}, []);


	if (!user) {
		return <Loader/>;
	}

	const handleEditProfile = (section) => {
		setIsEditing(true);
		setEditSection(section);
		setShowDropdown(false); // Close dropdown after selection
	};

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSaveChanges = async () => {
		try {
			const updatedUser = await updateUser({...user, ...formData});
			setUser(updatedUser);
			localStorage.setItem("user", JSON.stringify(updatedUser));
			setIsEditing(false);
		} catch (error) {
			console.error('Error updating user profile:', error);
			alert('Failed to update profile. Please try again.');
		}
	};

	return (
		<main className="flex-col items-center justify-center p-4 pb-12">
			{/* profile Section */}
			<section
				className="w-full p-6 text-center bg-white rounded-lg mb-6">
				<div
					className="flex flex-row items-center justify-between sm:items-start sm:space-x-6 ">
					{/* profile Picture */}
					<div
						className="w-32 h-32 rounded-full overflow-hidden shadow-xl flex items-center justify-center  ring-2 ring-white border-4 border-blue-300">
						<img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" alt="profile Picture"/>
						<FaUserCircle className="h-24 w-24 text-white"/> {/* profile icon */}
					</div>

					{/* User Info */}
					<div className="text-right sm:text-right">
						<h2 className="text-2xl ">{`${user.firstName} ${user.lastName}`}</h2>
						<p className="text-gray-500 mb-4">@{user.login}</p>
					</div>

				</div>
				{/* Additional Stats */}
				<ul className="py-4 my-6 text-gray-500 flex items-center justify-around shadow-mb w-full  rounded-lg
				pb-4">
					<li className="flex flex-col items-center justify-center">
						<div
							className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg ring-2 ring-white border-4 border-blue-300">
							<FaUserCircle className="h-10 w-10 text-white"/> {/* Placeholder for age */}
						</div>
						<div className="text-lg ">{user.age || 24} y.o</div>
					</li>
					<li className="flex flex-col items-center justify-center">
						<div
							className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg ring-2 ring-white border-4 border-blue-300">
							<GiWeight className="h-10 w-10 text-white"/> {/* Weight icon */}
						</div>
						<div className="text-lg ">{user.weight || 75} kg</div>
					</li>
					<li className="flex flex-col items-center justify-center">
						<div
							className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg ring-2 ring-white border-4 border-blue-300">
							<FaArrowsAltV className="h-10 w-10 text-white"/> {/* Height icon */}
						</div>
						<div className="text-lg ">{user.height || 175} cm</div>
					</li>
				</ul>

				{/* profile Details */}
				<ul className="grid grid-cols-1 md:grid-cols-4 gap-2">
					{[
						{
							icon: <FaPhone className="mr-3 text-blue-600"/>,
							label: t('userProfile.phoneNumber'),
							value: user.phoneNumber || '+380681231337',
							bgColor: 'bg-blue-100',
							textColor: 'text-blue-600',
						},
						{
							icon: <FaTelegramPlane className="mr-3 text-teal-600"/>,
							label: t('userProfile.email'),
							value: user.email,
							bgColor: 'bg-teal-100',
							textColor: 'text-teal-600',
						},
					].map((item, index) => (
						<li key={index}
							className={`flex items-center justify-between p-2 rounded-lg ${item.bgColor}`}>
							<div className={`flex items-center justify-center rounded-full ${item.bgColor}`}>
								{item.icon}
							</div>
							<div className="flex flex-col md:flex-row md:items-center md:justify-between">
								<span className={`${item.textColor}`}>{item.value}</span>
							</div>
						</li>
					))}
				</ul>


			</section>
			<section
				className="w-full p-2 text-center bg-white rounded-lg mb-6">
				<WeightBMIChart weightData={weightData} bmiData={bmiData}/>
			</section>
			{/* Floating Action Button */}
			<div className="fixed bottom-6 right-6 mb-20">
				<button
					aria-label="Edit Profile"
					onClick={handleEditProfile}
					className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition">
					<FaUserCircle className="h-8 w-8"/>
				</button>
			</div>

			{/* Edit Options Dropdown */}
			<div>
				<EditOptionsDropdown
					toggleDropdown={toggleDropdown}
					showDropdown={showDropdown}
					handleEditProfile={handleEditProfile}
				/>
				<EditProfileModal
					isEditing={isEditing}
					editSection={editSection}
					formData={formData}
					handleChange={handleChange}
					handleSaveChanges={handleSaveChanges}
					setIsEditing={setIsEditing}
				/>
			</div>
		</main>
	);
};

export default UserProfile;