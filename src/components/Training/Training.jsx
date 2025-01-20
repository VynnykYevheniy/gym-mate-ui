import {useEffect, useState} from 'react';
import axiosInstance from '../../api/AxiosConfig.jsx';
import ApiUrls from "../../model/ApiUrls.js";
import SearchBar from '../SearchBar.jsx';
import TrainingDayForm from "./TrainingDayForm/TrainingDayForm.jsx";
import Loader from "../generic/Loader.jsx";
import TrainingsList from "./TrainingsList.jsx";
import useTrainingModal from "./useTrainingModal.jsx";
import AddTrainingButton from "./AddTrainingButton.jsx";

const Training = () => {
	const [trainings, setTrainings] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const {
		isModalOpen,
		selectedTrainingRecord,
		setIsModalOpen,
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
		<main className="container mx-auto p-6">
			<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}
					   phText="Поиск по упражнениям или группам мышц..."/>
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

			<TrainingDayForm
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				trainingData={selectedTrainingRecord}
				onRefresh={fetchTrainings}/>
			<AddTrainingButton onClick={() => setIsModalOpen(true)}/>
		</main>
	);
};

export default Training;