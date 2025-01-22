// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider.jsx";
import SettingsMain from "../components/Settings/SettingsMain";
import LanguageSettings from "../components/Settings/LanguageSettings.jsx";
import NotificationsSettings from "../components/Settings/NotificationsSettings.jsx";
import ThemeSettings from "../components/Settings/ThemeSettings.jsx";

const Settings = () => {
    const [activeComponent, setActiveComponent] = useState("main");
    const [transitionDirection, setTransitionDirection] = useState("");
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const menuSections = {
        Account: [
            {iconClass: "fa-regular fa-user", label: "Profile", component: null},
            {iconClass: "fa-solid fa-file-invoice", label: "Account", component: null},
            {iconClass: "fa-solid fa-check", label: "Notifications", component: "notifications"},
        ],
        Preferences: [
            {iconClass: "fa-solid fa-droplet", label: "Theme", component: "theme"},
            {iconClass: "fa-solid fa-ruler", label: "Units", component: null},
            {iconClass: "fa-solid fa-language", label: "Language", component: "language"},

            {iconClass: "fa-solid fa-dumbbell", label: "Workouts", component: null},
            {iconClass: "fa-regular fa-handshake", label: "Integrations", component: null},
            {iconClass: "fa-solid fa-file-export", label: "Export Import Data", component: null},
        ],
        Guides: [
            {iconClass: "fa-solid fa-bars", label: "Getting Started", component: null },
            { iconClass: "fa-regular fa-file", label: "Documentation", component: null },
        ],
        Help: [
            { iconClass: "fa-soolid fa-question", label: "FAQ", component: null },
            { iconClass: "fa-solid fa-phone", label: "Support", component: null },
        ],
    };

    const handleMenuClick = (component) => {
        if (component) {
            setTransitionDirection("left");
            setTimeout(() => setActiveComponent(component), 300);
        }
    };

    const handleBackClick = () => {
        setTransitionDirection("right");
        setTimeout(() => setActiveComponent("main"), 300);
    };

    const handleLogoutClick = () => {
        logout();
        navigate("/signin");
    };

    return (
        <div className="relative w-full h-screen">
            {/* Main Settings */}
            {activeComponent === "main" && (
                <main
                    className={`inset-0 transition-transform duration-300 ease-in-out ${
                        transitionDirection === "left" ? "transform -translate-x-full" : ""
                    }`}
                >
                    <SettingsMain
                        menuSections={menuSections}
                        onMenuClick={handleMenuClick}
                        onLogout={handleLogoutClick}
                    />
                </main>
            )}

            {/* Language Settings */}
            {activeComponent === "language" && (
                <div
                    className={`inset-0 transition-transform duration-300 ease-in-out ${
                        transitionDirection === "left" ? "transform translate-x-0" : ""
                    } ${transitionDirection === "right" ? "transform translate-x-full" : ""}`}
                >
                    <LanguageSettings onBack={handleBackClick} />
                </div>
            )}

            {/* Notifications Settings */}
            {activeComponent === "notifications" && (
                <div
                    className={`inset-0 transition-transform duration-300 ease-in-out ${
                        transitionDirection === "left" ? "transform translate-x-0" : ""
                    } ${transitionDirection === "right" ? "transform translate-x-full" : ""}`}
                >
                    <NotificationsSettings onBack={handleBackClick} />
                </div>
            )}
            {/* Theme Settings */}
            {activeComponent === "theme" && (
                <div
                    className={`inset-0 transition-transform duration-300 ease-in-out ${
                        transitionDirection === "left" ? "transform translate-x-0" : ""
                    } ${transitionDirection === "right" ? "transform translate-x-full" : ""}`}
                >
                    <ThemeSettings onBack={handleBackClick} />
                </div>
            )}

        </div>
    );
};

export default Settings;
