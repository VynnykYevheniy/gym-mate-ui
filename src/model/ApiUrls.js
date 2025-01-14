class ApiUrls {
	// static BASE_URL = 'http://localhost:8080/api';
	static BASE_URL = 'https://gym-manager-co9r.onrender.com/api';
	// static BASE_URL = 'http://192.168.0.194:8080/api';

	static AUTH = {
		TELEGRAM: `/auth/telegram`,
		SIGN_IN: `/auth/signin`,
		LOGOUT: `/auth/logout`,
		SIGN_UP: `/auth/signup`,
	};

	static USER = {
		CURRENT: `/user/current`,
		UPDATE: `/user`,
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
		ALL_BY_MONTH: (month, year) => `/trainingDay/${month}/${year}`,
	};

	static MUSCLE_GROUP = {
		ALL: `/muscleGroup`,
	};
	static TRAINER = {
		ALL: `/trainer`,
	};
	static ANALYTICS = {
		ALL: `/body`,
		ADD: `/body`,
		CURRENT: `/body/current`,
	};
	static IMAGE = {
		GET_BY_ID: (id) => `/images/${id}`,
		UPLOAD: `/images/upload`,
	}
}

export default ApiUrls;
