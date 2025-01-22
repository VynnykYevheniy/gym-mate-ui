import React from "react";
import { useTheme } from "../../components/ThemeContext";

const ThemeSettings = ({ onBack }) => {
    const { setColors } = useTheme();

    const handleColorChange = (primaryColor, primaryHoverColor) => {
        setPrimaryColor(primaryColor);
        setPrimaryHoverColor(primaryHoverColor);
    };

    return (
        <main className="text-left">
            <div className="min-h-screen">
                <button className="mb-4 button-back" onClick={onBack}>
                    &larr; Back
                </button>
                <div>
                    <p className="text-secondTextColor text-xl mb-4">Theme Settings</p>
                    <section className="mb-8 p-0">
                        <ul className="space-y-4">
                            <li
                                className="flex items-center p-2 px-4 hover:text-black cursor-pointer"
                                onClick={() => setColors("#22C55E", "#16A34A")}
                            >
                                Green (Default)
                            </li>
                            <li
                                className="flex items-center p-2 px-4 hover:text-black cursor-pointer"
                                onClick={() => setColors("#3B82F6", "#2563EB")}
                            >
                                Blue
                            </li>
                            <li
                                className="flex items-center p-2 px-4 hover:text-black cursor-pointer"
                                onClick={() => setColors("#EF4444", "#B91C1C")}

                            >
                                Red
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default ThemeSettings;
