import React from "react";
import MenuItem from "./MenuItem.jsx";


const LanguageSettings = ({ onBack }) => {

    return (
        <main className="text-left">
        <div className=" min-h-screen">
            <button className="mb-4 button-back" onClick={onBack}>&larr; Back</button>
            <div>

                <p className="text-secondTextColor text-xl mb-4">Language Settings</p>
                <section className="mb-8 p-0">
                    <ul className="space-y-4">
                        <li className="flex items-center p-2 px-4 hover:text-black">UA</li>
                        <li className="flex items-center p-2 px-4 hover:text-black">ENG</li>
                        <li className="flex items-center p-2 px-4 hover:text-black">PN</li>
                    </ul>

                </section>
                <section>
                    <select

                        className="rounded-md border border-gray-300 bg-white shadow-sm focus:border-primary focus:ring focus:ring-primary">
                        <option value="en">Eng</option>
                        <option value="uk">Укр</option>
                        <option value="ru">Рус</option>
                    </select>
                </section>
            </div>

        </div>
        </main>
    );
};
export default LanguageSettings;