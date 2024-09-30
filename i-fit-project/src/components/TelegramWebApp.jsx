import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useToken} from '../context/TokenContext.jsx';
import Token from "../model/Token";
import ApiUrls from "../model/ApiUrls.js";
import Loader from "./Loader.jsx";

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
				id: TelegramWebApp.initDataUnsafe?.user?.id || null,
				username: TelegramWebApp.initDataUnsafe?.user?.username || '',
				firstName: TelegramWebApp.initDataUnsafe?.user?.first_name || '',
				lastName: TelegramWebApp.initDataUnsafe?.user?.last_name || ''
			};

			setLoading(true);
			try {
				const response = await fetch(ApiUrls.AUTH.TELEGRAM, {
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
		<Loader loading={loading}/>
	);
};

export default TelegramWebApp;