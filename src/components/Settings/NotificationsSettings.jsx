import React, { useState } from "react";

const NotificationsSettings = ({ onBack }) => {
    const [settings, setSettings] = useState({
        botMessages: true,
        botNews: false,
        trainingAlarm: true,
        adsNotifications: false,
        trainerAddTraining: true,
        trainerCorrectTraining: false,
    });

    const toggleSetting = (key) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const renderSettings = (title, items) => (
        <div className="mb-8">
            <p className="text-secondTextColor text-xl mb-4">{title}</p>
            <section className="p-0">
            <ul className="space-y-4">
                {items.map(([key, label]) => (
                    <li key={key} className="flex items-center justify-between p-2 px-4">
                        {label}
                        <ToggleSwitch
                            isActive={settings[key]}
                            onToggle={() => toggleSetting(key)}
                        />
                    </li>
                ))}
            </ul>
            </section>
        </div>
    );

    return (
        <main className="text-left min-h-screen">
            <button className="mb-4 button-back" onClick={onBack}>
                &larr; Back
            </button>
            {renderSettings("Notifications Settings", [
                ["botMessages", "Bot Messages"],
                ["botNews", "Bot News Notifications"],
                ["trainingAlarm", "Training Alarm (Today)"],
                ["adsNotifications", "ADS Notifications (Premium)"],
            ])}
            {renderSettings("Trainer", [
                ["trainerAddTraining", "Trainer Add Training"],
                ["trainerCorrectTraining", "Trainer Correct Training"],
            ])}
        </main>
    );
};

const ToggleSwitch = ({ isActive, onToggle }) => (
    <div
        className={`flex items-center w-10 h-6 rounded-full cursor-pointer ${
            isActive ? "bg-primary" : "bg-secondTextColor"
        }`}
        onClick={onToggle}
    >
        <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                isActive ? "translate-x-4" : "translate-x-0"
            }`}
        ></div>
    </div>
);

export default NotificationsSettings;
