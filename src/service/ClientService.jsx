import axiosInstance from "../api/axiosConfig.jsx";


export const subscribeToTrainer = async (trainerId) => {
	try {
		const response = await axiosInstance.post(`/client/subscribe/${trainerId}`);
		console.log('Successfully subscribed to trainer:', response.data);
		return response.data; // Return the response data
	} catch (error) {
		console.error('Error subscribing to trainer:', error);
		throw new Error('Ошибка при подписке на тренера.'); // Throw an error for handling in the component
	}
};

export const unsubscribeToTrainer = async (trainerId) => {
	try {
		const response = await axiosInstance.post(`/client/unsubscribe/${trainerId}`);
		console.log('Successfully unsubscribe to trainer:', response.data);
		return response.data; // Return the response data
	} catch (error) {
		console.error('Error unsubscribe to trainer:', error);
		throw new Error('Ошибка при отписке на тренера.'); // Throw an error for handling in the component
	}
};

export const fetchUserSubscriptions = async () => {
	try {
		const response = await axiosInstance.get('/client/subscriptions'); // Эндпоинт для получения подписок пользователя
		console.log('Successfully fetched user subscriptions:', response.data);

		// Предполагаем, что response.data уже является массивом идентификаторов
		return response.data; // Возвращаем массив идентификаторов тренеров
	} catch (error) {
		console.error('Error fetching user subscriptions:', error);
		throw new Error('Ошибка при загрузке подписок пользователя.'); // Бросаем ошибку для обработки в компоненте
	}
};