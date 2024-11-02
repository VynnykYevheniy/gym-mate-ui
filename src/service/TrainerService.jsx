import axiosInstance from "../api/axiosConfig.jsx";
import ApiUrls from "../model/ApiUrls.js";

export const fetchTrainers = async () => {
	try {
		const response = await axiosInstance.get(ApiUrls.TRAINER.ALL);
		console.log('Loaded trainers:', response.data);
		return response.data; // Return the fetched data
	} catch (error) {
		console.error('Error fetching trainers:', error);
		throw new Error('Ошибка при загрузке данных тренеров.'); // Throw an error for handling in the component
	}
};
