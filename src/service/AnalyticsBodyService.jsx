import axiosInstance from '../api/AxiosConfig.jsx'; // Импортируем настроенный экземпляр Axios
import ApiUrls from '../model/ApiUrls.js';

export const getAll = async () => {
	try {
		const response = await axiosInstance.get(ApiUrls.ANALYTICS.ALL);
		return response.data;
	} catch (error) {
		console.error('Failed to get all analytics:', error);
		throw new Error('Request to get all analytics failed: ' + error.message);
	}
};

export const getCurrent = async () => {
	try {
		const response = await axiosInstance.get(ApiUrls.ANALYTICS.CURRENT);
		return response.data;
	} catch (error) {
		console.error('Failed to get all analytics:', error);
		throw new Error('Request to get all analytics failed: ' + error.message);
	}
};

export const save = async (dataBody) => {
	try {
		const response = await axiosInstance.post(ApiUrls.ANALYTICS.ADD, dataBody);
		return response.data;
	} catch (error) {
		console.error('Failed to add new analytics:', error);
		throw new Error('Request to new analytics failed: ' + error.message);
	}
};