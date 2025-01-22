// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider.jsx";
import SettingsMain from "../components/Settings/SettingsMain";
import LanguageSettings from "../components/Settings/LanguageSettings.jsx";
import NotificationsSettings from "../components/Settings/NotificationsSettings.jsx";

const Settings = () => {
    const [activeComponent, setActiveComponent] = useState("main");
    const [transitionDirection, setTransitionDirection] = useState("");
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const menuSections = {
        Account: [
            { iconSrc: "/path-to-profile-icon.svg", label: "Profile", component: null },
            { iconSrc: "/path-to-account-icon.svg", label: "Account", component: null },
            { iconSrc: "/path-to-notifications-icon.svg", label: "Notifications", component: "notifications" },
        ],
        Preferences: [
            { iconSrc: "/path-to-theme-icon.svg", label: "Theme", component: null },
            { iconSrc: "/path-to-units-svg", label: "Units", component: null },
            { iconSrc: "/path-to-language-icon.svg", label: "Language", component: "language" },
            { iconSrc: "/path-to-workouts-icon.svg", label: "Workouts", component: null },
            { iconSrc: "/path-to-integrations-icon.svg", label: "Integrations", component: null },
            { iconSrc: "/path-to-export-import-icon.svg", label: "Export Import Data", component: null },
        ],
        Guides: [
            { iconSrc: "/path-to-start-icon.svg", label: "Getting Started", component: null },
            { iconSrc: "/path-to-docs-icon.svg", label: "Documentation", component: null },
        ],
        Help: [
            { iconSrc: "/path-to-faq-icon.svg", label: "FAQ", component: null },
            { iconSrc: "/path-to-support-icon.svg", label: "Support", component: null },
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

        </div>
    );
};

export default Settings;
