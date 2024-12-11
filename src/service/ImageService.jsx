import axiosInstance from "../api/axiosConfig.jsx";
import ApiUrls from "../model/ApiUrls.js";

export const upload = async (formData) => {
	try {
		const response = await axiosInstance.post(ApiUrls.IMAGE.UPLOAD, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data; // Возвращаем объект с imageId
	} catch (error) {
		console.error("Failed to upload image:", error);
		throw new Error("Image upload failed: " + error.message);
	}
};

// Метод для получения изображения по ID
export const getImageById = async (imageId) => {
	try {
		const response = await axiosInstance.get(ApiUrls.BASE_URL.concat(ApiUrls.IMAGE.GET_BY_ID(imageId)), {
			responseType: 'blob', // Указываем тип ответа blob для работы с изображениями
		});
		return URL.createObjectURL(response.data); // Конвертируем blob в URL для отображения
	} catch (error) {
		console.error("Failed to fetch image:", error);
		throw new Error("Image fetch failed: " + error.message);
	}
};