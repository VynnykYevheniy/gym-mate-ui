import axios from 'axios';
import ApiUrls from "../model/ApiUrls.js";

const axiosInstance = axios.create({
	baseURL: ApiUrls.BASE_URL,
});

// Добавляем интерсептор для обработки запросов
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token')
			? JSON.parse(localStorage.getItem('token')).accessToken
			: null;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
			// config.headers["Content-Type"] = "application/json";
		}
		console.log(config.data);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Обработка ошибок ответа
axiosInstance.interceptors.response.use(
	(response) => {
		console.log(response.data);
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const token = JSON.parse(localStorage.getItem('token'));
				console.log(token);
				const response = await axios.post(ApiUrls.BASE_URL + '/auth/refresh', token);
				const newToken = response.data;

				// Сохраняем новый токен
				localStorage.setItem('token', JSON.stringify(newToken));

				// Устанавливаем новый токен в заголовки
				originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
				return axios(originalRequest);
			} catch (refreshError) {
				// Если обновление токена не удалось, перенаправляем на страницу входа
				console.error('Refresh token failed:', refreshError);
				localStorage.removeItem('token');
				window.location.href = '/signin';
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;