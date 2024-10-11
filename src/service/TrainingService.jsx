import axiosInstance from '../api/axiosConfig'; // Импортируем настроенный экземпляр Axios
import ApiUrls from '../model/ApiUrls.js';

// Получение всех групп мышц
export const fetchMuscleGroups = async () => {
	try {
		const response = await axiosInstance.get(ApiUrls.MUSCLE_GROUP.ALL);
		return response.data;
	} catch (error) {
		console.error('Error fetching muscle groups:', error);
		throw new Error('Failed to fetch muscle groups');
	}
};

// Получение упражнений для выбранной группы мышц
export const fetchExercisesByMuscleGroup = async (muscleGroupId) => {
	try {
		const response = await axiosInstance.get(ApiUrls.EXERCISE.MUSCLE_GROUPS(muscleGroupId));
		return response.data;
	} catch (error) {
		console.error('Error fetching exercises:', error);
		throw new Error('Failed to fetch exercises');
	}
};

// Сохранение или обновление тренировки
export const saveTraining = async (payload) => {
	const url = ApiUrls.TRAINING_DAY.SAVE;
	const method = payload.id == null ? "POST" : "PUT";
	try {
		const response = await axiosInstance({
			url,
			method,
			data: payload,
		});
		return response.data;
	} catch (error) {
		console.error('Error saving training:', error);
		throw new Error('Failed to save training');
	}
};