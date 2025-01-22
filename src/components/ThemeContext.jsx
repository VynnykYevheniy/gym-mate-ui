import React, { createContext, useState, useContext } from "react";

// Создаем контекст
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [primaryColor, setPrimaryColor] = useState("#22C55E"); // Цвет по умолчанию

    return (
        <ThemeContext.Provider value={{ primaryColor, setPrimaryColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Кастомный хук для использования контекста
export const useTheme = () => useContext(ThemeContext);
