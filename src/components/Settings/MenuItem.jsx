import React from "react";

const MenuItem = ({ iconSrc, label, onClick }) => (
    <li
        className="flex items-center p-2 px-4 hover:bg-primaryHover hover:text-white cursor-pointer"
        onClick={onClick}
    >
        <img src={iconSrc} alt={`${label} Icon`} className="w-6 h-6 mr-4" />
        <span>{label}</span>
    </li>
);

export default MenuItem;
