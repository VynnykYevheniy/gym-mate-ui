import {useEffect, useState} from 'react';
import axiosInstance from '../api/axiosConfig'; // Импортируем настроенный экземпляр Axios
import ApiUrls from "../model/ApiUrls.js";
import TrainingFormModal from "./TrainingFormModal"; // Импортируем модальное окно

const TrainingsTable = () => {
	const [trainings, setTrainings] = useState([]);
	const [searchTerm, setSearchTerm] = useState(''); // Состояние для строки поиска
	const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия модального окна
	const [selectedTrainingRecord, setSelectedTrainingRecord] = useState(null); // Данные для выбранной тренировки
	const [loading, setLoading] = useState(true); // Состояние загрузки
	const [error, setError] = useState(null); // Состояние ошибки

	useEffect(() => {
		const fetchTrainings = async () => {
			try {
				const response = await axiosInstance.get(ApiUrls.TRAINING_DAY.ALL);
				setTrainings(response.data);
			} catch (error) {
				setError('Ошибка при загрузке данных тренировок.');
				console.error('Error fetching trainings:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchTrainings();
	}, []);

	// Функция для форматирования даты в виде День недели: дата
	const formatDate = (dateString) => {
		const options = {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'};
		return new Date(dateString).toLocaleDateString('ru-RU', options); // Форматируем по-русски
	};

	const handleCardClick = (trainingRecord) => {
		setSelectedTrainingRecord(trainingRecord); // Устанавливаем выбранную тренировку
		setIsModalOpen(true); // Открываем модальное окно
	};

	const handleCloseModal = () => {
		setIsModalOpen(false); // Закрываем модальное окно
		setSelectedTrainingRecord(null); // Сбрасываем выбранную тренировку
	};

	// Фильтрация тренировок по строке поиска
	const filteredTrainings = trainings.filter(trainingRecord => {
		return trainingRecord.trainings.some(training =>
			training.exercise.muscleGroup.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Поиск по группе мышц
			training.exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) // Поиск по имени упражнения
		);
	});

	return (
		<div className="container mx-auto p-6">
			<h2 className="text-2xl mb-6 font-semibold text-center">Записи тренировок</h2>

			{/* Строка поиска */}
			<div className="mb-4">
				<input
					type="text"
					placeholder="Поиск по упражнениям или группам мышц..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)} // Обработчик изменения строки поиска
					className="w-full p-2 border border-gray-300 rounded-lg"
				/>
			</div>

			{loading ? (
				<p className="text-gray-500 text-center">Загрузка...</p>
			) : error ? (
				<p className="text-red-500 text-center">{error}</p>
			) : (
				<div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-screen overflow-y-auto"
					style={{maxHeight: '400px', overflowY: 'scroll'}} // Ограничение высоты и скроллинг
				>
					{filteredTrainings.length > 0 ? (
						filteredTrainings.map((trainingRecord) => (
							<div
								key={trainingRecord.id}
								className="bg-white border border-gray-300 rounded-lg shadow-md p-4 cursor-pointer transition-transform duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg"
								onClick={() => handleCardClick(trainingRecord)} // Обработчик клика по карточке
							>
								<h3 className="text-lg font-bold mb-1 text-green-600">
									{formatDate(trainingRecord.date)} {/* Форматированная дата */}
								</h3>
								{trainingRecord.trainings.map((training, index) => (
									<div key={`${trainingRecord.id}-${index}`} className="border-t pt-2">
										<p className="font-semibold text-black">{training.exercise.name}</p>
										<p className="text-gray-600">Группа
											мышц: {training.exercise.muscleGroup.name}</p>
									</div>
								))}
							</div>
						))
					) : (
						<p className="text-gray-500 text-center">Записи тренировок отсутствуют.</p>
					)}
				</div>
			)}

			<TrainingFormModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				initialData={selectedTrainingRecord}
			/>
		</div>
	);
};

export default TrainingsTable;