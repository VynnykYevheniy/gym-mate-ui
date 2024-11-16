import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const profileLink = localStorage.getItem("profileLink");
	const navigate = useNavigate();
	const location = useLocation(); // Получаем текущий путь

	useEffect(() => {
		const savedToken = localStorage.getItem("token");
		const isAuthPage = ["/signin", "/signup"].includes(location.pathname); // Проверяем, находится ли пользователь на странице аутентификации

		if (!savedToken && !isAuthPage) {
			// Если токен отсутствует и пользователь не на странице аутентификации, перенаправляем на /signin
			navigate("/signin");
		} else if (savedToken && isAuthPage) {
			// Если токен есть и пользователь на странице аутентификации, перенаправляем на профиль
			navigate(profileLink || "/profile");
		}
	}, [navigate, location.pathname, profileLink]);

	const login = (newToken) => {
		localStorage.setItem("token", JSON.stringify(newToken));
		setToken(newToken);
	};

	const logout = () => {
		localStorage.clear();
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;