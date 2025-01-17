import {useState} from "react";
import * as UserService from "../service/UserService.jsx";
import {useNavigate} from "react-router-dom";
import * as ImageService from "../service/ImageService.jsx";
import * as AnalyticsBodyService from "../service/AnalyticsBodyService.jsx";

const WelcomePage = () => {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		role: "CLIENT",
		height: "",
		weight: "",
		birthday: "",
		goal: "",
		logo: "",
	});
	const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));
	const [uploadedFile, setUploadedFile] = useState(null);
	const [currentSlide, setCurrentSlide] = useState(0);
	const totalSlides = 5; // Общее количество слайдов
	const navigate = useNavigate();

	const handleNextSlide = () => {
		setCurrentSlide((prevSlide) => Math.min(prevSlide + 1, totalSlides - 1));
	};

	const handlePrevSlide = () => {
		setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
	};

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSelectChange = (e) => {
		const {name, value} = e.target;
		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCustomLogoUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			setUploadedFile(URL.createObjectURL(file)); // Local preview
		}
	};

	const handleSave = async () => {
		try {
			// If a new file is uploaded
			if (uploadedFile) {
				const formData = new FormData();
				formData.append("file", document.getElementById("file-upload").files[0]);
				const uploadResponse = await ImageService.upload(formData);
				console.log(uploadResponse);
				// Save image object to localStorage
				localStorage.setItem("image", JSON.stringify(uploadResponse));
			}

			// Update user data with the image ID (if any)
			const updatedUserData = {
				...userData,
				imageId: JSON.parse(localStorage.getItem("image")),
				firstName: user.firstName,
				lastName: user.lastName,
				birthday: user.birthday,
				// goal: user.goal
			};

			console.log(updatedUserData);
			// Send updated user data to server
			const updatedUser = await UserService.update(updatedUserData);
			console.log(updatedUser);
			// Save updated user data to localStorage
			localStorage.setItem("user", JSON.stringify(updatedUser));

			const data = {
				date: new Date().toISOString().split('T')[0],
				weight: user.weight,  // Ensure number format
				height: user.height,  // Ensure number format
			};

			// Save the data through the service
			await AnalyticsBodyService.save(data);

			alert("ProfileInfo updated successfully!");
			navigate("/"); // Навигация после сохранения
		} catch (error) {
			console.error("Error updating ProfileInfo:", error);
			alert("Failed to update ProfileInfo. Please try again later.");
		}
	};
	const fields = [
		{name: 'firstName', label: 'Имя', type: 'text', placeholder: 'Имя'},
		{name: 'lastName', label: 'Фамилия', type: 'text', placeholder: 'Фамилия'},
		{name: 'height', label: 'Рост (см)', type: 'number', placeholder: 'Рост (см)'},
		{name: 'weight', label: 'Вес (кг)', type: 'number', placeholder: 'Вес (кг)'},
		{name: 'birthday', label: 'Дата рождения', type: 'date', placeholder: ''},
		{name: 'goal', label: 'Цель', type: 'select', placeholder: ''}
	];
	return (
		<main
			className="h-full flex items-center justify-center flex-col p-4 bg-[url('../src/assets/BgWave.svg')] bg-no-repeat bg-bottom bg-fixed">
			<div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-md">
				<section className="relative h-full">
					<div
						className="flex transition-transform duration-500"
						style={{transform: `translateX(-${currentSlide * 100}%)`}}
					>
						{/* Slide 1: Имя и Фамилия */}
						<div className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6">
							<h1 className="text-2xl text-green-500 mb-4">Введите Ваше имя и фамилию:</h1>
							<input
								type="text"
								name="firstName"
								placeholder="Имя"
								value={user.firstName}
								onChange={handleInputChange}
								className="mb-3 p-3 border border-gray-300 rounded-lg w-full"
							/>
							<input
								type="text"
								name="lastName"
								placeholder="Фамилия"
								value={user.lastName}
								onChange={handleInputChange}
								className="mb-3 p-3 border border-gray-300 rounded-lg w-full"
							/>
						</div>
						{/* Slide 2: Рост, Вес, Дата рождения */}
						<div
							className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6 bg-green-500">
							<h1 className="text-2xl text-white mb-4">Введите рост, вес, дату рождения:</h1>
							<input
								type="number"
								name="height"
								placeholder="Рост (см)"
								value={user.height}
								onChange={handleInputChange}
								className="mb-3 p-3 border border-gray-300 rounded-lg w-full"
							/>
							<input
								type="number"
								name="weight"
								placeholder="Вес (кг)"
								value={user.weight}
								onChange={handleInputChange}
								className="mb-3 p-3 border border-gray-300 rounded-lg w-full"
							/>
							<div className="flex space-x-2 mb-3 w-full">
								<label className="text-white text-left w-full mb-2">Дата рождения:</label>
								<input
									type="date"
									name="birthday"
									value={user.birthday}
									onChange={handleInputChange}
									className="mb-3 p-3 border border-gray-300 rounded-lg w-full"
								/>
							</div>
						</div>

						{/* Slide 3: Цель */}
						<div
							className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6 bg-white">
							<h1 className="text-2xl text-green-500 mb-4">Выберите цель:</h1>
							<select
								name="goal"
								value={user.goal}
								onChange={handleSelectChange}
								className="mb-3 p-3 border border-gray-300 rounded-lg w-full"
							>
								<option value="" disabled>
									Выберите...
								</option>
								<option value="Набрать вес">Набрать вес</option>
								<option value="Похудеть">Похудеть</option>
							</select>
						</div>

						{/* Slide 4: Выбор логотипа */}
						<div
							className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6 bg-white">
							<h1 className="text-2xl text-green-500 mb-4">Выберите логотип:</h1>
							{/* Загрузка собственного логотипа */}
							<label className="block mb-4">
								<input
									id="file-upload"
									type="file"
									accept="image/*"
									onChange={handleCustomLogoUpload}
									className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
								/>
							</label>

							{/* Блок предпросмотра */}
							<div
								className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-300 flex items-center justify-center bg-gray-200">
								{uploadedFile ? (
									<img
										src={uploadedFile}
										alt="Предпросмотр логотипа"
										className="w-full h-full object-cover"
									/>
								) : (
									<div
										className="w-28 h-28 rounded-full"
									/>
								)}
							</div>
						</div>
						{/* Slide 5: Финал */}
						<div
							className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6 bg-white">
							<h1 className="text-2xl text-green-500 mb-4">Your Profile:)</h1>
							{/* Блок предпросмотра */}
							<div
								className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-300 flex items-center justify-center bg-gray-200">
								{uploadedFile ? (
									<img
										id="file-upload"
										src={uploadedFile}
										alt="Предпросмотр логотипа"
										className="w-full h-full object-cover"
									/>
								) : (
									<div
										className="w-28 h-28 rounded-full"
									/>
								)}
							</div>
							{fields.map((field, index) => (
								<div key={index} className="flex items-center mt-4 w-full">
									<label htmlFor={field.name} className="text-gray-700 font-semibold mr-3 w-1/3">
										{field.label}
									</label>
									<input
										type={field.type}
										name={field.name}
										placeholder={field.placeholder}
										value={user[field.name]}
										onChange={handleInputChange}
										disabled
										className="p-3 border border-gray-300 rounded-lg w-2/3 bg-gray-100 cursor-not-allowed"
									/>
								</div>
							))}
						</div>
					</div>

					{/* Фиксированные кнопки */}
					<div className="flex justify-between items-center px-4 py-2">
						<button
							disabled={currentSlide === 0}
							onClick={handlePrevSlide}
							className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
						>
							Назад
						</button>
						{/* Проверка на каждом слайде */}
						<button
							onClick={currentSlide === totalSlides - 1 ? handleSave : handleNextSlide}
							className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
						>
							{currentSlide === totalSlides - 1 ? "Save" : "Next"}
						</button>
					</div>
					{/* Статус-бар */}
					<div className="w-full bg-white h-2">
						<div
							className="bg-green-500 h-full transition-all duration-500"
							style={{width: `${((currentSlide + 1) / totalSlides) * 100}%`}}
						></div>
					</div>
				</section>
			</div>
		</main>
	);
};

export default WelcomePage;