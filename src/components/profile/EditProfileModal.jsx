import PropTypes from "prop-types";
import {useState} from "react";
import * as UserService from "../../service/UserService.jsx";
import Loader from "../generic/Loader.jsx";
import * as ImageService from "../../service/ImageService.jsx";

function EditProfileModal({isOpen, onClose}) {
	const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));
	const [uploadedFile, setUploadedFile] = useState(null);
	const [isSaving, setIsSaving] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	// Handle file upload for avatar
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setUploadedFile(URL.createObjectURL(file)); // Local preview
		}
	};

	// Handle form input changes
	const handleInputChange = (event) => {
		const {name, value} = event.target;
		setUserData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSave = async () => {
		setIsSaving(true); // Show loader
		try {
			// If a new file is uploaded
			if (uploadedFile) {
				const formData = new FormData();
				formData.append("file", document.getElementById("file-upload").files[0]);
				console.log(formData);
				// Upload file to server
				const uploadResponse = await ImageService.upload(formData);
				console.log(uploadResponse);
				// Save image object to localStorage
				localStorage.setItem("image", JSON.stringify(uploadResponse));
			}
			// Update user data
			const updatedUserData = {
				...userData,
				imageId: JSON.parse(localStorage.getItem("image")), // Update imageId
			};
			console.log(updatedUserData);
			// Send updated user data to server
			const updatedUser = await UserService.update(updatedUserData);
			console.log(updatedUser);
			// Save updated user data to localStorage
			localStorage.setItem("user", JSON.stringify(updatedUser));

			alert("Profile updated successfully!");
			onClose(); // Close modal
		} catch (error) {
			console.error("Error updating profile:", error);
			alert("Failed to update profile. Please try again later.");
		} finally {
			setIsSaving(false); // Hide loader
		}
	};

	// Render the avatar section with file upload
	const renderAvatarSection = () => (
		<div className="flex flex-col items-center my-6">
			<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-300">
				{uploadedFile && (
					<img
						src={uploadedFile}
						alt="avatar preview"
						className="w-full h-full object-cover"
					/>
				)}
			</div>
			{/* File upload button for avatar */}
			<label
				htmlFor="file-upload"
				className="w-full mt-4 px-6 py-3 bg-green-500 text-white rounded-lg flex items-center justify-center cursor-pointer shadow-lg hover:bg-green-400 transition"
			>
				<span className="mr-2">Upload Avatar</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					className="w-5 h-5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M15 12l4-4m0 0l4 4m-4-4v12"
					/>
				</svg>
				<input
					id="file-upload"
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="hidden"
				/>
			</label>
		</div>
	);

	const renderFormFields = () => {
		const togglePasswordVisibility = () => {
			setShowPassword((prev) => !prev);
		};

		return (
			<div className="space-y-6">
				{[
					{label: "First Name", name: "firstName", type: "text"},
					{label: "Last Name", name: "lastName", type: "text"},
					{label: "Age", name: "age", type: "number"},
					{label: "Phone Number", name: "phoneNumber", type: "number"},
					{label: "Email", name: "email", type: "email"},
					{
						label: "Password",
						name: "password",
						type: showPassword ? "text" : "password",
						placeholder: "******",
					},
				].map(({label, name, type, placeholder}) => (
					<div key={name} className="mb-4 flex flex-col">
						<label className="text-mb text-gray-500 mb-2">{label}</label>
						<div className="relative">
							<input
								type={type}
								name={name}
								value={name === "password" ? null : userData[name]}
								onChange={handleInputChange}
								placeholder={placeholder}
								className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition w-full"
							/>
							{name === "password" && (
								<button
									type="button"
									onClick={togglePasswordVisibility}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
								>
									{showPassword ? "Hide" : "Show"}
								</button>
							)}
						</div>
					</div>
				))}
			</div>
		);
	};

	if (!isOpen) return null;
	return isSaving ? (
		<Loader/>
	) : (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 mb-16">
			<div
				className="bg-zinc-50 rounded-lg p-4 w-11/12 sm:w-1/2 max-h-[90vh] shadow-2xl transform transition-all duration-300 overflow-y-scroll">
				{/* Sticky Header */}
				<div className="sticky mb-2">
					<h2 className="text-2xl text-gray-500 mb-2">Edit Profile</h2>
				</div>
				{/* Avatar Section */}
				{renderAvatarSection()}

				{/* Form Fields */}
				{renderFormFields()}

				{/* Save/Cancel Buttons */}
				<div className="flex space-x-6 mt-6 justify-center">
					<button
						onClick={handleSave}
						className={`bg-green-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 transition ${
							isSaving ? "opacity-50 cursor-not-allowed" : ""
						}`}
						disabled={isSaving}
					>
						Save
					</button>
					<button
						onClick={() => onClose()}
						className="bg-red-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 transition"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

EditProfileModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default EditProfileModal;