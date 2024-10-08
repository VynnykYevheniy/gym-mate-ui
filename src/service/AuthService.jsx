import axiosInstance from '../api/axiosConfig.jsx';
import ApiUrls from '../model/ApiUrls.js';

export const handleToken = (token, navigate) => {
	if (token && token.accessToken) {
		localStorage.setItem('token', JSON.stringify(token));
		navigate('/');
		return token;
	}
	return null; // Return null if token is invalid
};

// Function to log out the user
export const handleLogout = (navigate) => {
	// Remove the token from localStorage
	localStorage.removeItem('token');
	// Redirect to the sign-in page
	navigate('/signin');
};

// Function for user login
export const loginRequest = async (login, password, navigate) => {
	const requestBody = { login, password };
	try {
		const response = await axiosInstance.post(ApiUrls.AUTH.SIGN_IN, requestBody);
		return handleToken(response.data, navigate);
	} catch (error) {
		throw new Error('Login failed: ' + error.message);
	}
};

// Function for Telegram authentication
export const authenticateTelegramUser = async (userData, navigate) => {
	try {
		const response = await axiosInstance.post(ApiUrls.AUTH.TELEGRAM, userData);
		return handleToken(response.data, navigate);
	} catch (error) {
		throw new Error('Telegram authentication failed: ' + error.message);
	}
};

export const registerRequest = async (login, email, password) => {
	const requestBody = { login, email, password };
	try {
		const response = await axiosInstance.post(ApiUrls.AUTH.SIGN_UP, requestBody);
		return response.data; // Return response data on success
	} catch (error) {
		throw new Error('Registration failed: ' + error.message);
	}
};