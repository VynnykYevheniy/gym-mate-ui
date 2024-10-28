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
        { id: 4, name: 'Имя Фамилия 3', logo: UserSvg },
        { id: 5, name: 'Имя Фамилия 3', logo: UserSvg },
        { id: 6, name: 'Имя Фамилия 3', logo: UserSvg },
    ];

    return (
        <div className="z-10">
            {/* Сайдбар с логотипами */}
            <div className="absolute top-16 left-0 h-full bg-gray-800 w-16 flex flex-col justify-start">
                <ul className="flex flex-col ">
                    {users.map((user) => (
                        <li key={user.id} onClick={handleToggleSidebar} className="cursor-pointer h-16 flex items-center justify-center">
                            <img src={user.logo} alt={`Logo ${user.id}`} className="w-10 h-10" />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Развернутая информация, если сайдбар открыт */}
            <div
                className={`absolute top-16 left-16 h-full bg-gray-700 transition-all z-10 duration-300 ${
                    isOpen ? 'w-1/2' : 'w-0'
                } overflow-hidden`}
            >
                {isOpen && (
                    <div className="">
                        <ul className="">
                            {users.map((user) => (
                                <li key={user.id} className="flex items-center h-16">
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