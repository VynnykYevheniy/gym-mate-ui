import PropTypes from "prop-types";
import { useState } from "react";

function EditProfileModal({
							  isEditing,
							  editSection,
							  formData,
							  handleChange,
							  handleSaveChanges,
							  setIsEditing,
							  handleFileUpload,
						  }) {
	const [selectedColor, setSelectedColor] = useState(formData.logo || "gray");
	const [uploadedFile, setUploadedFile] = useState(formData.avatarFile || null);
	if (!isEditing) return null;

	// Обработка выбора цвета
	const handleColorSelect = (color) => {
		setSelectedColor(color);
		setUploadedFile(null); // Сбросить загруженный файл
	};

	// Обработка загрузки изображения
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setUploadedFile(URL.createObjectURL(file)); // Создаём локальный preview
			setSelectedColor(null); // Сбросить выбранный цвет
		}
	};

	// Сохранение изменений
	const handleSaveAvatar = () => {
		handleSaveChanges({
			logo: selectedColor,
			avatarFile: uploadedFile,
		});
		setIsEditing(false);
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
			<div className="bg-white rounded-lg p-6 max-w-md w-full">
				<h2 className="text-2xl text-green-500 mb-4">Edit {editSection}</h2>
				<form className="space-y-4">
					{editSection === 'avatar' && (
						<div className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6 bg-white">
							{/* Предпросмотр аватара */}
							<div className="flex items-center justify-center mb-6">
								<div
									className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300"
									style={{
										backgroundColor: selectedColor || "transparent",
									}}
								>
									{uploadedFile && (
										<img
											src={uploadedFile}
											alt="avatar preview"
											className="w-full h-full object-cover"
										/>
									)}
								</div>
							</div>



							{/* Круглые логотипы на выбор */}
							<div className="grid grid-cols-5 gap-4 mb-6">
								{["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan", "gray", "teal"].map((color, index) => (
									<div
										key={index}
										onClick={() => handleColorSelect(color)} // Передаем название цвета
										className={`w-16 h-16 rounded-full cursor-pointer border-4 ${
											formData.logo === color ? "border-green-500" : "border-transparent"
										}`}
										style={{backgroundColor: color}} // Используем цвет напрямую
									/>
								))}
							</div>


							{/* Загрузка изображения */}
							<p className="text-gray-700 font-medium mb-2">Или загрузите изображение:</p>
							<input
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								className="w-full px-4 py-2 border rounded-lg mb-4"
							/>

							{/* Кнопки управления */}
							<div className="flex justify-between items-center">
								<button
									onClick={() => setIsEditing(false)}
									className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
								>
									Отмена
								</button>
								<button
									onClick={handleSaveAvatar}
									className="bg-green-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
									disabled={!selectedColor && !uploadedFile}
								>
									Сохранить
								</button>
							</div>


							<label className="block text-gray-700">Upload Profile Picture</label>
							<input
								type="file"
								accept="image/*"
								onChange={handleFileUpload}
								className="w-full px-4 py-2 border rounded-lg"
							/>
						</div>
					)}
					{editSection === 'contact' && (
						<>
							<div>
								<label className="block text-gray-700">First Name</label>
								<input
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-gray-700">Last Name</label>
								<input
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-gray-700">Phone Number</label>
								<input
									type="text"
									name="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-gray-700">Email</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>
						</>
					)}
					{editSection === 'anthropometry' && (
						<>
							<div>
								<label className="block text-gray-700">Age</label>
								<input
									type="number"
									name="age"
									value={formData.age}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-gray-700">Weight</label>
								<input
									type="number"
									name="weight"
									value={formData.weight}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-gray-700">Height</label>
								<input
									type="number"
									name="height"
									value={formData.height}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>
						</>
					)}
				</form>
				<div className="flex justify-end mt-4">
					<button
						onClick={() => setIsEditing(false)}
						className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-lg"
					>
						Cancel
					</button>
					<button
						onClick={handleSaveChanges}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

EditProfileModal.propTypes = {
	isEditing: PropTypes.bool.isRequired,
	editSection: PropTypes.string.isRequired,
	formData: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSaveChanges: PropTypes.func.isRequired,
	setIsEditing: PropTypes.func.isRequired,
	handleFileUpload: PropTypes.func.isRequired
};
export default EditProfileModal;