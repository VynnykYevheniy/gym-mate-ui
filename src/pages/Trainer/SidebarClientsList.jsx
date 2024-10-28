import React, { useState } from 'react';
import UserSvg from "../../assets/image/UserSvg.svg"

const SidebarClientsList = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const users = [
        { id: 1, name: 'Имя Фамилия 1', logo: UserSvg },
        { id: 2, name: 'Имя Фамилия 2', logo: UserSvg },
        { id: 3, name: 'Имя Фамилия 3', logo: UserSvg },
    ];

    return (
        <div className="mt-16 h-full">
            {/* Сайдбар с логотипами */}
            <div className="absolute top-16 left-0 h-full bg-gray-800 w-16 flex flex-col items-start justify-start space-y-6">
                <ul className="flex flex-col items-start space-y-6">
                    {users.map((user) => (
                        <li key={user.id} onClick={handleToggleSidebar} className="cursor-pointer">
                            <img src={user.logo} alt={`Logo ${user.id}`} className="w-10 h-10" />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Развернутая информация, если сайдбар открыт */}
            <div
                className={`absolute top-16 left-16 h-full bg-gray-700 transition-all duration-300 ${
                    isOpen ? 'w-1/2' : 'w-0'
                } overflow-hidden`}
            >
                {isOpen && (
                    <div className="">
                        <ul className="space-y-6">
                            {users.map((user) => (
                                <li key={user.id} className="flex items-center">
                                    {/* Логотип остаётся слева, имя выводится справа */}
                                    <span className="ml-4 text-white">{user.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidebarClientsList;
