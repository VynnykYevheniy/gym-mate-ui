class ApiUrls {
	// static BASE_URL = 'http://localhost:8080/api';
	static BASE_URL = 'https://gym-manager-co9r.onrender.com/api';

	static AUTH = {
		TELEGRAM: `${ApiUrls.BASE_URL}/auth/telegram`,
		SIGN_IN: `${ApiUrls.BASE_URL}/auth/signin`,
		LOGOUT: `${ApiUrls.BASE_URL}/auth/logout`,
		SIGN_UP: `${ApiUrls.BASE_URL}/auth/signup`,
	};

	static USER = {
		CURRENT: `${ApiUrls.BASE_URL}/user/current`,
		UPDATE: `${ApiUrls.BASE_URL}/user/update`,
		DELETE: `${ApiUrls.BASE_URL}/user/delete`,
	};

	static EXERCISE = {
		MUSCLE_GROUPS: (muscleGroupId) => `${ApiUrls.BASE_URL}/exercise/muscle-groups/${muscleGroupId}/exercises`,
	};

	static TRAINING_DAY = {
		ALL: `${ApiUrls.BASE_URL}/trainingDay/all`,
		SAVE: `${ApiUrls.BASE_URL}/trainingDay`,
	};

	static MUSCLE_GROUP = {
		ALL: `${ApiUrls.BASE_URL}/muscleGroup`,
	};

	// Добавьте другие группы URL по мере необходимости
}

export default ApiUrls;
