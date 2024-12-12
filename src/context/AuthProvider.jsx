import {createContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {currentUser} from "../service/UserService.jsx";
import PropTypes from "prop-types"; // Импорт сервиса для получения текущего пользователя

const AuthContext = createContext();

export function AuthProvider({children}) {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const profileLink = localStorage.getItem("profileLink");
	const navigate = useNavigate();
	const location = useLocation(); // Получаем текущий путь

	useEffect(() => {
		const checkAuth = async () => {
			const savedToken = localStorage.getItem("token");
			const isAuthPage = ["/", "/signin", "/signup"].includes(location.pathname); // Проверяем, находится ли пользователь на странице аутентификации
			const isNewUser = localStorage.getItem("newUser") === "true"; // Проверяем, новый ли это пользователь

			if (isNewUser) {
				// Если пользователь только что зарегистрировался, перенаправляем на /welcome
				localStorage.removeItem("newUser"); // Удаляем флаг, чтобы перенаправление происходило только один раз
				navigate("/welcome");
				return;
			}

			if (!savedToken && !isAuthPage) {
				// Если токен отсутствует и пользователь не на странице аутентификации, перенаправляем на /signin
				navigate("/signin");
			} else if (savedToken) {
				if (!profileLink) {
					try {
						const user = await currentUser(); // Выполняем запрос для получения текущего пользователя

						// Устанавливаем ссылку профиля в зависимости от роли
						const link = (user.role || "client").toLowerCase();
						localStorage.setItem("profileLink", link);
						navigate(link);
					} catch (error) {
						console.error("Ошибка при получении профиля пользователя:", error);
						navigate("/signin");
					}
				} else if (isAuthPage) {
					// Если токен есть и пользователь на странице аутентификации, перенаправляем на профиль
					navigate(profileLink);
				}
			}
		};

		checkAuth();
	}, [navigate, location.pathname, profileLink]);

	const login = (newToken) => {
		localStorage.setItem('token', JSON.stringify(newToken));
		setToken(newToken);
	};

	const logout = () => {
		localStorage.clear();
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{token, login, logout}}>
			{children}
		</AuthContext.Provider>
	);
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

export default AuthContext;