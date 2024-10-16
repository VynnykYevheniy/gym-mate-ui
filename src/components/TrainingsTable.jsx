import {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../api/axiosConfig'; // Импортируем настроенный экземпляр Axios
import ApiUrls from "../model/ApiUrls.js";
import SearchBar from './SearchBar.jsx';
import TrainingForm from "./TrainingForm.jsx";
import {
	FaBiking,
	FaChevronUp,
	FaChild,
	FaDumbbell,
	FaHandRock,
	FaHeartbeat,
	FaPlus,
	FaRunning,
	FaSwimmer,
	FaWalking,
	FaTimes // Импортируем иконку крестика
} from 'react-icons/fa';
import Loader from "./Loader.jsx"; // Подобранные иконки

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

	const handleDeleteTraining = async (id) => {
		const result = await Swal.fire({
			title: 'Вы уверены?',
			text: 'Вы хотите удалить эту тренировку? Это действие нельзя отменить.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Да, удалить!',
			cancelButtonText: 'Отмена',
			customClass: {
				title: 'font-bold text-lg text-gray-800',
				text: 'text-gray-700',
				confirmButton: 'bg-red-500 hover:bg-red-600 text-white',
				cancelButton: 'bg-blue-500 hover:bg-blue-600 text-white'
			},
			backdrop: true,
		});

		if (result.isConfirmed) {
			try {
				await axiosInstance.delete(`${ApiUrls.TRAINING_DAY.DELETE(id)}`); // Путь к API для удаления
				await fetchTrainings(); // Обновляем список тренировок
				Swal.fire('Удалено!', 'Тренировка была удалена.', 'success');
			} catch (error) {
				Swal.fire('Ошибка!', 'Не удалось удалить тренировку.', 'error');
				console.error('Error deleting training:', error);
			}
		}
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
			<div className="w-full mb-4">
				<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
			</div>

			{loading ? (
				<Loader/>
			) : error ? (
				<div className="text-red-500 text-center">{error}</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
					{filteredTrainings.length > 0 ? (
						filteredTrainings.map((trainingRecord) => (
							<div
								key={trainingRecord.id}
								className="bg-white border-2 border-transparent rounded-xl shadow-lg p-4 cursor-pointer transition-transform duration-300 transform hover:scale-105 active:scale-95 hover:shadow-2xl hover:border-green-500"
								onClick={() => handleCardClick(trainingRecord)} // Удалить вызов для кнопки удаления
							>
								<button
									onClick={(event) => {
										event.stopPropagation(); // Остановить всплытие события
										handleDeleteTraining(trainingRecord.id); // Обработчик удаления
									}}
									className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors" // Позиционирование и стиль для крестика
								>
									<FaTimes className="h-6 w-6"/>
								</button>
								<h3 className="text-xl font-semibold text-green-700 mb-2 border-b-2 border-green-500 pb-1">
									{formatDate(trainingRecord.date)}
								</h3>
								<div className="flex flex-col mt-4">
									{trainingRecord.trainings.map((training, index) => (
										<div key={`${trainingRecord.id}-${index}`} className="flex items-center mb-4 border-b-2">
											{muscleGroupIcons[training.exercise.muscleGroup.name] || <span className="text-gray-500">{training.exercise.muscleGroup.name}</span>}
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
			)}

			<TrainingForm
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				trainingData={selectedTrainingRecord}
				onTrainingAdded={fetchTrainings} // Добавлен коллбэк для обновления тренировок после добавления
			/>
			<button
				onClick={() => {
					setSelectedTrainingRecord(null);
					setIsModalOpen(true);
				}}
				className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-transform transform hover:scale-105"
				aria-label="Добавить тренировку"
			>
				<FaPlus className="text-2xl"/>
			</button>
		</div>
	);
};

export default TrainingsTable;