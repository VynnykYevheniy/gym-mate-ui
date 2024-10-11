import {useEffect, useState} from 'react';
import axiosInstance from '../api/axiosConfig'; // Импортируем настроенный экземпляр Axios
import ApiUrls from "../model/ApiUrls.js";
import SearchBar from './SearchBar.jsx';
import TrainingForm from "./TrainingForm.jsx";
import Skeleton from "react-loading-skeleton"; // Импортируем новый компонент поиска
import {
	FaBiking,
	FaChevronUp,
	FaChild,
	FaDumbbell,
	FaHandRock,
	FaHeartbeat,
	FaRunning,
	FaSwimmer,
	FaWalking
} from 'react-icons/fa'; // Подобранные иконки

const muscleGroupIcons = {
	"Ноги": <FaRunning className="text-green-500"/>,      // Иконка для ног (бег)
	"Бицепс": <FaHandRock className="text-blue-500"/>,    // Иконка для бицепса (сжатый кулак)
	"Предплечье": <FaDumbbell className="text-purple-500"/>, // Иконка для предплечья (гантель)
	"Плечи": <FaChevronUp className="text-orange-500"/>,   // Иконка для плеч (направление вверх)
	"Трицепс": <FaBiking className="text-yellow-500"/>,    // Иконка для трицепса (движение на велосипеде — руки активно работают)
	"Икры": <FaWalking className="text-red-500"/>,        // Иконка для икр (ходьба, ноги в движении)
	"Спина": <FaSwimmer className="text-teal-500"/>,      // Иконка для спины (плавание — сильная нагрузка на спину)
	"Грудь": <FaHeartbeat className="text-pink-500"/>,    // Иконка для груди (сердце, ассоциация с грудными мышцами)
	"Пресс": <FaChild className="text-green-500"/>,       // Иконка для пресса (движение — тело)
};

const TrainingsTable = () => {
	const [trainings, setTrainings] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTrainingRecord, setSelectedTrainingRecord] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Функция для загрузки тренировок
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

	// Загружаем тренировки при монтировании компонента
	useEffect(() => {
		fetchTrainings();
	}, []);

	const formatDate = (dateString) => {
		const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
		return new Date(dateString).toLocaleDateString('ru-RU', options);
	};

	const handleCardClick = (trainingRecord) => {
		setSelectedTrainingRecord(trainingRecord);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedTrainingRecord(null);
	};

	// Фильтрация тренировок по названию упражнения или группы мышц
	const filteredTrainings = trainings.filter(trainingRecord => {
		return trainingRecord.trainings.some(training =>
			training.exercise.muscleGroup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			training.exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	});

	return (
		<div className="container mx-auto p-6">
			<div className="flex flex-col sm:flex-row justify-between items-center mb-6">
				<h2 className="text-4xl sm:text-5xl font-bold text-green-700 tracking-wide text-center sm:text-left mb-4 sm:mb-0">
					Записи тренировок
				</h2>

				<button
					onClick={() => {
						setSelectedTrainingRecord(null);
						setIsModalOpen(true);
					}}
					className="px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
				>
					+ Добавить тренировку
				</button>
			</div>

			<div className="w-full mb-4">
				<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
			</div>

			{loading ? (
				<div className="flex flex-col items-center">
					<Skeleton count={3} height={100} className="mb-4 w-full"/>
					<Skeleton count={1} height={40} width={200}/>
				</div>
			) : error ? (
				<div className="text-red-500 text-center">{error}</div>
			) : (
				<div className="overflow-auto h-60 sm:h-80 lg:h-96">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
						{filteredTrainings.length > 0 ? (
							filteredTrainings.map((trainingRecord) => (
								<div
									key={trainingRecord.id}
									className="bg-white border-2 border-transparent rounded-xl shadow-lg p-4 cursor-pointer transition-transform duration-300 transform hover:scale-105 active:scale-95 hover:shadow-2xl hover:border-green-500"
									onClick={() => handleCardClick(trainingRecord)}
								>
									<h3 className="text-xl font-semibold text-green-700 mb-2 border-b-2 border-green-500 pb-1">
										{formatDate(trainingRecord.date)}
									</h3>
									<div className="flex flex-col mt-4">
										{trainingRecord.trainings.map((training, index) => (
											<div key={`${trainingRecord.id}-${index}`}
												 className="flex items-center mb-4">
												{muscleGroupIcons[training.exercise.muscleGroup.name] || <span
													className="text-gray-500">{training.exercise.muscleGroup.name}</span>}
												<p className="font-semibold text-lg text-gray-800 ml-3">{training.exercise.name}</p>
											</div>
										))}
									</div>
								</div>
							))
						) : (
							<div className="text-gray-500 text-center">Записи тренировок отсутствуют.</div>
						)}
					</div>
				</div>
			)
			}

			{/* Передаем функцию fetchTrainings в TrainingForm для обновления данных после сохранения */
			}
			<TrainingForm
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				trainingData={selectedTrainingRecord}
				onTrainingAdded={fetchTrainings} // Добавлен коллбэк для обновления тренировок после добавления
			/>
		</div>
	)
		;
};

export default TrainingsTable;