import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Loader from "./generic/Loader.jsx";
import {authenticateTelegramUser} from "../service/AuthService.jsx";

const TelegramWebApp = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const getUserData = () => {
		const TelegramWebApp = window.Telegram.WebApp;
		return {
			id: TelegramWebApp.initDataUnsafe?.user?.id || null,
			username: TelegramWebApp.initDataUnsafe?.user?.username || null,
			firstName: TelegramWebApp.initDataUnsafe?.user?.firstName || null,
			lastName: TelegramWebApp.initDataUnsafe?.user?.lastName || null
		};
	};

	const handleError = useCallback((message) => {
		setError(message);
		setLoading(false);
	}, [setError, setLoading]);

	const authenticateUser = useCallback(
		async (userData) => {
			setLoading(true);
			try {
				const token = await authenticateTelegramUser(userData, navigate);
				if (!token) {
					setError('Invalid credentials, please try again.');
				}
			} catch (error) {
				console.error('Ошибка:', error);
				handleError('Не удалось аутентифицироваться через Telegram. Пожалуйста, попробуйте снова.');
			} finally {
				setLoading(false);
			}
		}, [navigate, setError, handleError, setLoading]
	);

	useEffect(() => {
		if (window.Telegram && window.Telegram.WebApp) {
			const userData = getUserData();
			if (!userData.id || !userData.username || !userData.firstName || !userData.lastName) {
				handleError("Не удалось получить данные пользователя с Telegram. Пожалуйста, попробуйте снова.");
				return;
			}
			authenticateUser(userData);
		} else {
			handleError("Не удалось загрузить Telegram WebApp API.");
		}
	}, [authenticateUser, handleError, navigate]);

	// Если есть ошибка, отображаем её
	if (error) {
		return <div>{error}</div>;
	}

	return <Loader loading={loading}/>;
};

export default TelegramWebApp;