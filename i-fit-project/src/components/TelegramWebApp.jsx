import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../context/TokenContext.jsx';
import Token from "../model/Token";

const TelegramWebApp = () => {
	const { setToken } = useToken();
	const [loading, setLoading] = useState(true);
	const [token, setLocalToken] = useState(null); // Локальное состояние для токена
	const navigate = useNavigate();

	useEffect(() => {
		const script = document.createElement('script');
		script.src = "https://telegram.org/js/telegram-web-app.js";
		script.async = true;
		document.body.appendChild(script);

		script.onload = async () => {
			window.Telegram.ready();
			const TelegramWebApp = window.Telegram.WebApp;

			// Получение данных о пользователе
			const userData = {
				id: TelegramWebApp.initDataUnsafe.user.id,
				username: TelegramWebApp.initDataUnsafe.user.username,
				firstName: TelegramWebApp.initDataUnsafe.user.first_name,
				lastName: TelegramWebApp.initDataUnsafe.user.last_name
			};

			// Отправка данных на сервер
			setLoading(true);
			try {
				const response = await fetch('https://gym-manager-co9r.onrender.com/api/auth/telegram', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userData),
				});

				if (response.ok) {
					const data = await response.json();
					// Создаем объект Token и сохраняем его в состоянии
					const tokenInstance = new Token(data.accessToken, data.expiresIn, data.refreshToken, data.refreshExpiresIn);
					setToken(tokenInstance);
					setLocalToken(tokenInstance); // Сохраняем токен в локальном состоянии
				} else {
					console.error('Ошибка:', response.statusText);
				}
			} catch (error) {
				console.error('Ошибка:', error);
			} finally {
				setLoading(false);
			}
		};

		return () => {
			document.body.removeChild(script);
		};
	}, [setToken]);

	// Редирект при успешной загрузке
	useEffect(() => {
		if (!loading && token) {
			navigate('/'); // Перенаправляем на главную страницу
		}
	}, [loading, token, navigate]);

	return (
		<div>
			{loading ? (
				<div className="loader">
					<span className="loading loading-spinner text-info"></span>
					<span className="loading loading-spinner text-success"></span>
					<span className="loading loading-spinner text-warning"></span>
					<span className="loading loading-spinner text-error"></span>
				</div>
			) : (
				<div>Your token has been received.</div>
			)}
		</div>
	);
};

export default TelegramWebApp;