import axiosInstance from "../api/AxiosConfig.jsx";
import ApiUrls from "../model/ApiUrls.js";

export const getBMI = async () => {
	try {
		const response = await axiosInstance.get(ApiUrls.CHART.BMI);
		return response.data;
	} catch (error) {
		console.error('Failed to get all analytics:', error);
		throw new Error('Request to get all analytics failed: ' + error.message);
	}
};

export const getWeight = async () => {
	try {
		const response = await axiosInstance.get(ApiUrls.CHART.WEIGHT);
		return response.data;
	} catch (error) {
		console.error('Failed to get all analytics:', error);
		throw new Error('Request to get all analytics failed: ' + error.message);
	}
};