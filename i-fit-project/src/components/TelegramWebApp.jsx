import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Token from "../model/Token";
import ApiUrls from "../model/ApiUrls.js";
import Loader from "./Loader";
import {useToken} from "../context/TokenContext.jsx";

const TelegramWebApp = () => {
    const {setToken} = useToken();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Проверяем, что Telegram WebApp API доступен
        if (window.Telegram && window.Telegram.WebApp) {
            const TelegramWebApp = window.Telegram.WebApp;

            const userData = {
                id: TelegramWebApp.initDataUnsafe?.user?.id || null,
                username: TelegramWebApp.initDataUnsafe?.user?.username || '',
                firstName: TelegramWebApp.initDataUnsafe?.user?.first_name || '',
                lastName: TelegramWebApp.initDataUnsafe?.user?.last_name || ''
            };

            // Проверка: если данные пользователя пустые, показываем сообщение об ошибке
            if (!userData.id || !userData.username || !userData.firstName || !userData.lastName) {
                setError("Не удалось получить данные пользователя с Telegram. Пожалуйста, попробуйте снова.");
                setLoading(false);
                return;
            }

            // Асинхронная операция для отправки данных пользователя
            const authenticateUser = async () => {
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

                        // Редирект если токен корректно получен
                        if (token && token.accessToken && token.expiresIn && token.refreshToken && token.refreshExpiresIn) {
                            navigate('/');
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

            authenticateUser();
        } else {
            // Если API Telegram не доступен
            setError("Не удалось загрузить Telegram WebApp API.");
            setLoading(false);
        }
    }, [setToken, navigate]);

    // Если есть ошибка, отображаем её
    if (error) {
        return <div>{error}</div>;
    }

    return <Loader loading={loading}/>;
};

export default TelegramWebApp;