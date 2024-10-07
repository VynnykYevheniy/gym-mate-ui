import {useEffect, useState} from 'react';
import axiosInstance from '../api/axiosConfig'; // Импортируем настроенный экземпляр Axios
import ApiUrls from "../model/ApiUrls.js";
import TrainingFormModal from "./TrainingFormModal"; // Импортируем модальное окно

const TrainingsTable = () => {
	const [trainings, setTrainings] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия модального окна
	const [selectedTrainingRecord, setSelectedTrainingRecord] = useState(null); // Данные для выбранной тренировки

	useEffect(() => {
		const fetchTrainings = async () => {
			try {
				const response = await axiosInstance.get(ApiUrls.TRAINING_DAY.ALL);
				setTrainings(response.data);
			} catch (error) {
				console.error('Error fetching trainings:', error);
			}
		};

		fetchTrainings();
	}, []);

	// Функция для форматирования даты в виде День недели: дата
	const formatDate = (dateString) => {
		const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
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

	return (
		<div className="container mx-auto p-6">
			<h2 className="text-2xl mb-4">Training Records</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{trainings.map((trainingRecord) => (
					<div
						key={trainingRecord.id}
						className="bg-white border rounded-lg shadow p-4 cursor-pointer"
						onClick={() => handleCardClick(trainingRecord)} // Обработчик клика по карточке
					>
						<h3 className="text-lg font-bold mb-2">
							{formatDate(trainingRecord.date)} {/* Форматированная дата */}
						</h3>
						{trainingRecord.trainings.map((training, index) => (
							<div key={`${trainingRecord.id}-${index}`} className="border-t pt-2">
								<p className="font-semibold">{training.exercise.name}</p>
								<p>Muscle Group: {training.exercise.muscleGroup.name}</p>
							</div>
						))}
					</div>
				))}
			</div>
			<TrainingFormModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				initialData={selectedTrainingRecord}
			/>
		</div>
	);
};

export default TrainingsTable;