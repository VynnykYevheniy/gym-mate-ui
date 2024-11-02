import {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../api/axiosConfig';
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
	FaTimes
} from 'react-icons/fa';
import Loader from "./Loader.jsx";

const muscleGroupIcons = {
	"Ноги": <FaRunning className="text-green-500"/>,
	"Бицепс": <FaHandRock className="text-blue-500"/>,
	"Предплечье": <FaDumbbell className="text-purple-500"/>,
	"Плечи": <FaChevronUp className="text-orange-500"/>,
	"Трицепс": <FaBiking className="text-yellow-500"/>,
	"Икры": <FaWalking className="text-red-500"/>,
	"Спина": <FaSwimmer className="text-teal-500"/>,
	"Грудь": <FaHeartbeat className="text-pink-500"/>,
	"Пресс": <FaChild className="text-green-500"/>,
};

const TrainingsTable = () => {
	const [trainings, setTrainings] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTrainingRecord, setSelectedTrainingRecord] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchTrainings = async () => {
		try {
			const response = await axiosInstance.get(ApiUrls.TRAINING_DAY.ALL);
			setTrainings(response.data);
			console.log('Loaded trainings:', response.data);  // Лог для проверки загруженных данных
		} catch (error) {
			setError('Ошибка при загрузке данных тренировок.');
			console.error('Error fetching trainings:', error);
		} finally {
			setLoading(false);
		}
	};

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
		});

		if (result.isConfirmed) {
			try {
				await axiosInstance.delete(`${ApiUrls.TRAINING_DAY.DELETE(id)}`);
				await fetchTrainings();
				Swal.fire('Удалено!', 'Тренировка была удалена.', 'success');
			} catch (error) {
				Swal.fire('Ошибка!', 'Не удалось удалить тренировку.', 'error');
				console.error('Error deleting training:', error);
			}
		}
	};

	const filteredTrainings = searchTerm
		? trainings.filter(trainingRecord =>
			trainingRecord.trainings.some(training =>
				training.exercise.muscleGroup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				training.exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		)
		: trainings;

	return (
		<div className="container mx-auto p-6">
			<div className="w-full mb-4">
				<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} phText="Поиск по упражнениям или группам мышц..."/>
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
								onClick={() => handleCardClick(trainingRecord)}
							>
								<button
									onClick={(event) => {
										event.stopPropagation();
										handleDeleteTraining(trainingRecord.id);
									}}
									className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
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
				onTrainingAdded={fetchTrainings}
			/>
			<button
				onClick={() => {
					setSelectedTrainingRecord(null);
					setIsModalOpen(true);
				}}
				className="fixed bottom-6 mb-20 right-6 w-16 h-16 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-transform transform hover:scale-105"
				aria-label="Добавить тренировку"
			>
				<FaPlus className="text-2xl"/>
			</button>
		</div>
	);
};

export default TrainingsTable;