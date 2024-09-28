import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useToken} from '../context/TokenContext.jsx';
import Token from "../model/Token";

const TelegramWebApp = () => {
	const {setToken} = useToken();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const script = document.createElement('script');
		script.src = "https://telegram.org/js/telegram-web-app.js";
		script.async = true;
		document.body.appendChild(script);

		script.onload = async () => {
			const TelegramWebApp = window.Telegram.WebApp;

			const userData = {
				id: TelegramWebApp.initDataUnsafe?.user?.id || 123,
				username: TelegramWebApp.initDataUnsafe?.user?.username || 'Evyn1',
				firstName: TelegramWebApp.initDataUnsafe?.user?.first_name || 'Yvheniy',
				lastName: TelegramWebApp.initDataUnsafe?.user?.last_name || 'Vynnyk'
			};

			setLoading(true);
			try {
				const response = await fetch('http://localhost:8080/api/auth/telegram', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userData),
				});

				if (response.ok) {
					const data = await response.json();
					const token = new Token(data.accessToken, data.expiresIn, data.refreshToken, data.refreshExpiresIn);
					setToken(token);
					console.log(token);

					// Проверка, что токен полностью заполнен
					if (token && token.accessToken && token.expiresIn && token.refreshToken && token.refreshExpiresIn) {
						navigate('/'); // Редирект только если все поля заполнены
					}
				} else {
					console.error('Ошибка:', response.statusText);
				}
			} catch (error) {
				console.error('Ошибка:', error);
			} finally {
				setLoading(false);
			}
		};
	}, [setToken, navigate]);

	return (
		<div className="loader">
			{loading ? (
				<div
					className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
					<div
						className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...
					</div>
				</div>

			) : (
				<div>Your token has been received.</div>
			)}
		</div>
	);
};

export default TelegramWebApp;