import React from "react";
import MenuSection from "./MenuSection";

const SettingsMain = ({ menuSections, onMenuClick, onLogout }) => (
    <div>
        {Object.entries(menuSections).map(([sectionName, items]) => (
            <MenuSection
                key={sectionName}
                sectionName={sectionName}
                items={items}
                onMenuClick={onMenuClick}
            />
        ))}
        <section
            onClick={onLogout}
            className="p-3 text-red-600 hover:bg-primaryHover hover:text-white"
        >
            <button className="font-semibold text-center">Logout</button>
        </section>
    </div>
);

export default SettingsMain;
