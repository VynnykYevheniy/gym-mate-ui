import {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({children}) {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const navigate = useNavigate(); // Hook to programmatically navigate
	useEffect(() => {
		const savedToken = localStorage.getItem('token');
		if (savedToken) {
			setToken(savedToken);
		} else {
			navigate('/signin');
		}
	}, []);

	const login = (newToken) => {
		localStorage.setItem('token', JSON.stringify(newToken));
		setToken(newToken);
	};

	const logout = () => {
		localStorage.clear()
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{token, login, logout}}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;