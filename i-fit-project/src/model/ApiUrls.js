class ApiUrls {
	static LOCAL_URL = 'http://localhost:8080/api';
	static BASE_URL = 'https://gym-manager-co9r.onrender.com/api';

	static AUTH = {
		TELEGRAM: `${ApiUrls.BASE_URL}/auth/telegram`,
		LOGIN: `${ApiUrls.BASE_URL}/auth/login`,
		LOGOUT: `${ApiUrls.BASE_URL}/auth/logout`,
		REGISTRATION: `${ApiUrls.BASE_URL}/auth/register`,
	};

	static USER = {
		CURRENT: `${ApiUrls.BASE_URL}/user/current`,
		UPDATE: `${ApiUrls.BASE_URL}/user/update`,
		DELETE: `${ApiUrls.BASE_URL}/user/delete`,
	};

	// Добавьте другие группы URL по мере необходимости
}

export default ApiUrls;