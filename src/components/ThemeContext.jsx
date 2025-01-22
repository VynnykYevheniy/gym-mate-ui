import React, { createContext, useState, useContext } from "react";

// Создаем контекст
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [primaryColor, setPrimaryColor] = useState("#22C55E"); // Цвет по умолчанию
    const [primaryHoverColor, setPrimaryHoverColor] = useState("#16A34A"); // Hover цвет по умолчанию

    // Обновление CSS переменных
    const updateThemeColors = (color, hoverColor) => {
        document.documentElement.style.setProperty("--primary-color", color);
        document.documentElement.style.setProperty("--primary-hover-color", hoverColor);
    };

    const setColors = (color, hoverColor) => {
        setPrimaryColor(color);
        setPrimaryHoverColor(hoverColor);
        updateThemeColors(color, hoverColor);
    };

    return (
        <ThemeContext.Provider value={{ primaryColor, primaryHoverColor, setColors }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Кастомный хук для использования контекста
export const useTheme = () => useContext(ThemeContext);
