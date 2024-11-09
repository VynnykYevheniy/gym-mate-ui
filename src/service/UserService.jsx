import axiosInstance from '../api/axiosConfig.jsx'; // Импортируем настроенный экземпляр Axios
import ApiUrls from '../model/ApiUrls.js';

export const currentUser = async () => {
	try {
		const response = await axiosInstance.post(ApiUrls.USER.CURRENT);
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error('Request current user failed: ' + error.message);
	}
};

export const updateUser = async (userData) => {
	try {
		console.log(userData)
		const response = await axiosInstance.put(ApiUrls.USER.UPDATE, userData);
		return response.data;
	} catch (error) {
		console.error('Failed to update user:', error);
		throw new Error('Request to update user failed: ' + error.message);
	}
};

export const fetchAnalytics = async () => {
	try {
		const response = await axiosInstance.get(ApiUrls.ANALYTICS.ALL);
		return response.data;
	} catch (error) {
		console.error('Failed to get all analytics:', error);
		throw new Error('Request to get all analytics failed: ' + error.message);
	}
};

export const fetchCurrentAnalytics = async () => {
	try {
		const response = await axiosInstance.get(ApiUrls.ANALYTICS.CURRENT);
		return response.data;
	} catch (error) {
		console.error('Failed to get all analytics:', error);
		throw new Error('Request to get all analytics failed: ' + error.message);
	}
};