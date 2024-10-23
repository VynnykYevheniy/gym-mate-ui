class ApiUrls {
	// static BASE_URL = 'http://localhost:8080/api';
	static BASE_URL = 'https://gym-manager-co9r.onrender.com/api';

	static AUTH = {
		TELEGRAM: `/auth/telegram`,
		SIGN_IN: `/auth/signin`,
		LOGOUT: `/auth/logout`,
		SIGN_UP: `/auth/signup`,
	};

	static USER = {
		CURRENT: `/user/current`,
		UPDATE: `/user/update`,
		DELETE: `/user/delete`,
	};

	static EXERCISE = {
		MUSCLE_GROUPS: (muscleGroupId) => `/exercise/muscle-groups/${muscleGroupId}/exercises`,
	};

	static TRAINING_DAY = {
		ALL: `/trainingDay/all`,
		SAVE: `/trainingDay`,
		UPDATE: '/trainingDay',
		DELETE: (id) => `/trainingDay/${id}`,
		ALL_BY_MONTH: (month,year) => `/trainingDay/${month}/${year}`,
	};

	static MUSCLE_GROUP = {
		ALL: `/muscleGroup`,
	};
}

export default ApiUrls;
