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

export const update = async (userData) => {
	try {
		const response = await axiosInstance.put(ApiUrls.USER.UPDATE, userData);
		return response.data;
	} catch (error) {
		console.error('Failed to update user:', error);
		throw new Error('Request to update user failed: ' + error.message);
	}
};