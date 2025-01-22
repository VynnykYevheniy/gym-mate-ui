import React from "react";

const MenuItem = ({ iconClass, label, onClick }) => (
    <li
        className="flex items-center justify-between p-2 px-4 hover:bg-primaryHover hover:text-white cursor-pointer"
        onClick={onClick}
    >
        <div className="flex items-center h-6 ">
            <i className={`${iconClass} mr-4 text-primary`}></i> {/* Иконка Font Awesome */}
            <span>{label}</span>
        </div>
    </li>
);

export default MenuItem;
