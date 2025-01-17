import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import * as UserService from "../../../../service/UserService.jsx";
import Loader from "../../../generic/Loader.jsx";
import * as ImageService from "../../../../service/ImageService.jsx";
import AvatarUploader from "./AvatarUploader";
import ProfileForm from "./ProfileForm";
import ModalFooter from "./ModalFooter";

function EditProfileModal({ isOpen, onClose }) {
	const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));
	const [currentImage, setCurrentImage] = useState(null);
	const [uploadedFile, setUploadedFile] = useState(null);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (userData && userData.imageId) {
			const fetchImage = async () => {
				try {
					const image = await ImageService.getImageById(userData.imageId);
					setCurrentImage(image);
				} catch (error) {
					console.error("Error loading user image", error);
				}
			};
			fetchImage();
		}
	}, [userData]);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setUploadedFile(URL.createObjectURL(file));
		}
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSave = async () => {
		setIsSaving(true);
		try {
			if (uploadedFile) {
				const formData = new FormData();
				formData.append("file", document.getElementById("file-upload").files[0]);
				const uploadResponse = await ImageService.upload(formData);
				localStorage.setItem("image", JSON.stringify(uploadResponse));
			}
			const updatedUserData = {
				...userData,
				imageId: JSON.parse(localStorage.getItem("image")),
			};
			const updatedUser = await UserService.update(updatedUserData);
			localStorage.setItem("user", JSON.stringify(updatedUser));
			alert("ProfileInfo updated successfully!");
			onClose();
		} catch (error) {
			console.error("Error updating ProfileInfo:", error);
			alert("Failed to update ProfileInfo. Please try again later.");
		} finally {
			setIsSaving(false);
		}
	};

	if (!isOpen) return null;

	return isSaving ? (
		<Loader />
	) : (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 mb-16">
			<div className="bg-zinc-50 rounded-lg p-4 w-11/12 sm:w-1/2 max-h-[90vh] shadow-2xl transform transition-all duration-300 overflow-y-scroll">
				<h2 className="text-2xl text-gray-500 mb-2">Edit Profile</h2>
				<AvatarUploader
					currentImage={currentImage}
					uploadedFile={uploadedFile}
					onFileChange={handleFileChange}
				/>
				<ProfileForm userData={userData} onInputChange={handleInputChange} />
				<ModalFooter onSave={handleSave} onClose={onClose} isSaving={isSaving} />
			</div>
		</div>
	);
}

EditProfileModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default EditProfileModal;
