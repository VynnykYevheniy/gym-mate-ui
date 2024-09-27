import React, {useEffect, useState} from 'react';

const TelegramWebAppComponent = () => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = "https://telegram.org/js/telegram-web-app.js";
		script.async = true;
		document.body.appendChild(script);

		script.onload = async () => {
			const TelegramWebApp = window.Telegram.WebApp;

			// Получение данных о пользователе
			const userData = {
				id: TelegramWebApp.initDataUnsafe.user.id,
				username: TelegramWebApp.initDataUnsafe.user.username,
				firstName: TelegramWebApp.initDataUnsafe.user.first_name,
				lastName: TelegramWebApp.initDataUnsafe.user.last_name,
				photoUrl: TelegramWebApp.initDataUnsafe.user.photo_url || '', // Если есть
			};
			setUser(userData); // Обработка полученных данных
			// Отправка данных на сервер
			setLoading(true);
			// try {
			// 	const response = await fetch('https://gym-manager-co9r.onrender.com/api/auth/telegram', {
			// 		method: 'POST',
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 		},
			// 		body: JSON.stringify(userData),
			// 	});
			//
			// 	if (response.ok) {
			// 		// const data = await response.json();
			//
			// 	} else {
			// 		console.error('Ошибка:', response.statusText);
			// 	}
			// } catch (error) {
			// 	console.error('Ошибка:', error);
			// } finally {
			// 	setLoading(false);
			// }
		};

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return (
		<div>
			{loading ? (
				<div className="loader">
					<p>Загрузка...</p>
				</div>
			) : (
				<div>
					{user && <p>Добро пожаловать, {user.username}!</p>}
				</div>
			)}
		</div>
	);
};

export default TelegramWebAppComponent;