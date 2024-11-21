    import { useState } from "react";

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
            logo: "",
        });

        const totalSlides = 5; // Общее количество слайдов

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

        const handleLogoSelect = (logo) => {
            setFormData((prev) => ({ ...prev, logo }));
        };

        const handleCustomLogoUpload = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setFormData((prevState) => ({
                        ...prevState,
                        logo: reader.result, // Сохраняем Base64 в logo
                    }));
                };
                reader.readAsDataURL(file);
            }
        };
        const isNextDisabled = () => {
            switch (currentSlide) {
                case 0:
                    // Slide 1: проверяем поля "name" и "surname"
                    return !formData.name || !formData.surname;
                case 1:
                    // Slide 2: проверяем роль
                    return !formData.role;
                case 2:
                    // Slide 3: проверяем рост, вес и дату рождения
                    return !formData.height || !formData.weight || !formData.birthDate;
                case 3:
                    // Slide 4: проверяем, выбрал ли пользователь цель
                    return !formData.goal;
                case 4:
                    // Slide 5: проверяем, выбран ли логотип
                    return !formData.logo;
                default:
                    return false; // На последнем слайде кнопка "Далее" активна
            }
        };


        return (
            <main
                style={{ minHeight: "calc(100vh - 8rem)" }} // 16px * 4 = 64px
                className="flex items-center justify-center flex-col p-4 bg-[url('../src/assets/BgWave.svg')] bg-no-repeat bg-bottom bg-fixed">
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
                            </div>

                            {/* Slide 5: Выбор логотипа */}
                            <div
                                className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6 bg-white">
                                <h1 className="text-2xl text-green-500 mb-4">Выберите логотип:</h1>

                                {/* Круглые логотипы на выбор */}
                                <div className="grid grid-cols-5 gap-4 mb-6">
                                    {["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan", "gray", "teal"].map((color, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleLogoSelect(color)} // Передаем название цвета
                                            className={`w-16 h-16 rounded-full cursor-pointer border-4 ${
                                                formData.logo === color ? "border-green-500" : "border-transparent"
                                            }`}
                                            style={{backgroundColor: color}} // Используем цвет напрямую
                                        />
                                    ))}
                                </div>

                                {/* Загрузка собственного логотипа */}
                                <label className="block mb-4">
                                    <span className="text-gray-600">Или загрузите свой логотип:</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCustomLogoUpload}
                                        className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                    />
                                </label>

                                {/* Блок предпросмотра */}
                                <div
                                    className="w-32 h-32 mb-6 flex items-center justify-center border border-gray-300 rounded-lg">
                                    {formData.logo ? (
                                        formData.logo.startsWith("data:image") ? ( // Проверяем, если логотип загружен пользователем
                                            <img
                                                src={formData.logo}
                                                alt="Предпросмотр логотипа"
                                                className="w-28 h-28 object-cover rounded-full"
                                            />
                                        ) : (
                                            <div
                                                className="w-28 h-28 rounded-full"
                                                style={{backgroundColor: formData.logo}} // Инлайн-стили для цвета
                                            />
                                        )
                                    ) : (
                                        <span className="text-gray-400">Предпросмотр</span>
                                    )}
                                </div>
                                <button
                                    disabled={currentSlide === 0}
                                    onClick={handlePrevSlide}
                                    className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                                >
                                    Назад
                                </button>
                                <button
                                    disabled={!formData.logo}
                                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
                                >
                                    Завершить
                                </button>
                            </div>


                        </div>

                        {/* Фиксированные кнопки */}
                        <div className="flex justify-between items-center px-4 py-2">
                            <button
                                disabled={currentSlide === 0}
                                onClick={handlePrevSlide}
                                className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                            >
                                Назад
                            </button>
                            {/* Проверка на каждом слайде */}
                            <button
                                disabled={isNextDisabled()}
                                onClick={handleNextSlide}
                                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
                            >
                                Далее
                            </button>
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
