import React, { useState } from "react";
import BgWaveSvg from "../assets/BgWave.svg"

const WelcomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        role: "",
        height: "",
        weight: "",
        birthDate: { year: "", month: "", day: "" },
        goal: "",
    });

    const totalSlides = 4; // Общее количество слайдов

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => Math.min(prevSlide + 1, totalSlides - 1));
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <main
            className="flex items-center justify-center flex-col min-h-screen p-4 pb-12 bg-[url('../src/assets/BgWave.svg')] bg-no-repeat bg-fixed bg-bottom sm:bg-[height:50vh] md:bg-[height:50vh] lg:bg-[height:50vh]">
            <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-md">
                <section className="relative h-full">
                    <div
                        className="flex transition-transform duration-500"
                        style={{transform: `translateX(-${currentSlide * 100}%)`}}
                    >
                        {/* Slide 1: Имя и Фамилия */}
                        <div className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6">
                            <h1 className="text-2xl text-green-500 mb-4">Введите Ваше имя и фамилию:</h1>
                            <input
                                type="text"
                                name="name"
                                placeholder="Имя"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mb-3 p-3 border border-gray-300 rounded-lg w-full"
                            />
                            <input
                                type="text"
                                name="surname"
                                placeholder="Фамилия"
                                value={formData.surname}
                                onChange={handleInputChange}
                                className="mb-3 p-3 border border-gray-300 rounded-lg w-full"
                            />


                            <button
                                onClick={handleNextSlide}
                                disabled={!formData.name || !formData.surname}
                                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
                            >
                                Далее
                            </button>
                        </div>

                        {/* Slide 2: Роль */}
                        <div
                            className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6 bg-neutral-500">
                            <h1 className="text-2xl text-white mb-4">Кто Вы?</h1>
                            <label className="flex items-center mb-2 text-white">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Клиент"
                                    checked={formData.role === "Клиент"}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Клиент
                            </label>
                            <label className="flex items-center mb-4 text-white">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Тренер"
                                    checked={formData.role === "Тренер"}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Тренер
                            </label>
                            <div className="flex w-full justify-between mt-4">
                                <button
                                    disabled={currentSlide === 0}
                                    onClick={handlePrevSlide}
                                    className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                                >
                                    Назад
                                </button>
                                <button
                                    onClick={handleNextSlide}
                                    disabled={!formData.role}
                                    className="bg-white text-green-500 px-6 py-2 rounded-lg hover:bg-green-100 disabled:opacity-50"
                                >
                                    Далее
                                </button>
                            </div>
                        </div>

                        {/* Slide 3: Рост, Вес, Дата рождения */}
                        <div
                            className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6 bg-green-500">
                            <h1 className="text-2xl text-white mb-4">Введите рост, вес, дату рождения:</h1>
                            <input
                                type="number"
                                name="height"
                                placeholder="Рост (см)"
                                value={formData.height}
                                onChange={handleInputChange}
                                className="mb-3 p-3 border border-gray-300 rounded-lg w-full"
                            />
                            <input
                                type="number"
                                name="weight"
                                placeholder="Вес (кг)"
                                value={formData.weight}
                                onChange={handleInputChange}
                                className="mb-3 p-3 border border-gray-300 rounded-lg w-full"
                            />
                            <div className="flex space-x-2 mb-3 w-full">
                                <label className="text-white text-left w-full mb-2">Дата рождения:</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleInputChange}
                                    className="mb-3 p-3 border border-gray-300 rounded-lg w-full"
                                />
                            </div>
                            <div className="flex w-full justify-between mt-4">
                                <button
                                    disabled={currentSlide === 0}
                                    onClick={handlePrevSlide}
                                    className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                                >
                                    Назад
                                </button>
                                <button
                                    onClick={handleNextSlide}
                                    disabled={!formData.height || !formData.weight || !formData.birthDate}
                                    className="bg-white text-green-500 px-6 py-2 rounded-lg hover:bg-green-100 disabled:opacity-50"
                                >
                                    Далее
                                </button>
                            </div>
                        </div>

                        {/* Slide 4: Цель */}
                        <div className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6 bg-white">
                            <h1 className="text-2xl text-green-500 mb-4">Выберите цель:</h1>
                            <select
                                name="goal"
                                value={formData.goal}
                                onChange={handleSelectChange}
                                className="mb-3 p-3 border border-gray-300 rounded-lg w-full"
                            >
                                <option value="" disabled>
                                    Выберите...
                                </option>
                                <option value="Набрать вес">Набрать вес</option>
                                <option value="Похудеть">Похудеть</option>
                            </select>
                            <div className="flex w-full justify-between mt-4">
                                <button
                                    disabled={currentSlide === 0}
                                    onClick={handlePrevSlide}
                                    className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                                >
                                    Назад
                                </button>
                                <button
                                    disabled={!formData.goal}
                                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
                                >
                                    Завершить
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Статус-бар */}
                    <div className="w-full bg-white h-2">
                        <div
                            className="bg-green-500 h-full transition-all duration-500"
                            style={{width: `${((currentSlide + 1) / totalSlides) * 100}%`}}
                        ></div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default WelcomePage;
