import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext(null);

export const TokenProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	return (
		<TokenContext.Provider value={{ token, setToken }}>
			{children}
		</TokenContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToken = () => useContext(TokenContext);