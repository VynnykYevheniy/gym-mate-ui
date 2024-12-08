import {useEffect, useState} from 'react';
import axiosInstance from '../../api/axiosConfig.jsx';
import ApiUrls from "../../model/ApiUrls.js";
import SearchBar from '../SearchBar.jsx';
import TrainingForm from "./TrainingForm.jsx";
import {FaPlus} from 'react-icons/fa';
import Loader from "../generic/Loader.jsx";
import TrainingsList from "./TrainingsList.jsx";
import useTrainingModal from "./useTrainingModal.jsx";

const TrainingsTable = () => {
	const [trainings, setTrainings] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const {
		isModalOpen,
		selectedTrainingRecord,
		setIsModalOpen,
		setSelectedTrainingRecord,
		handleCloseModal,
	} = useTrainingModal();

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

	return (
		<div className="container mx-auto p-6">
			<div className="w-full mb-4">
				<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}
						   phText="Поиск по упражнениям или группам мышц..."/>
			</div>

			{loading ? (
				<Loader/>
			) : error ? (
				<div className="text-red-500 text-center">{error}</div>
			) : (
				<TrainingsList
					trainings={trainings}
					onRefresh={fetchTrainings}  // Передаем функцию для обновления списка тренировок
					searchTerm={searchTerm}
				/>
			)}

			<TrainingForm
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				trainingData={selectedTrainingRecord}
				onRefresh={fetchTrainings}/>
			<button
				onClick={() => {
					setSelectedTrainingRecord(null);
					setIsModalOpen(true);
				}}
				className="fixed bottom-6 mb-12 right-6 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-transform transform hover:scale-105"
				aria-label="Добавить тренировку"
			>
				<FaPlus className="text-2xl"/>
			</button>
		</div>
	);
};

export default TrainingsTable;