import {useEffect, useState} from "react";
import axiosInstance from "../api/AxiosConfig.jsx";
import ApiUrls from "../model/ApiUrls.js";
import Loader from "../components/generic/Loader.jsx";
import useTrainingModal from "../components/Training/useTrainingModal.jsx";
import SearchBar from "../components/SearchBar.jsx";
import TrainingsList from "../components/Training/TrainingsList.jsx";
import TrainingDayForm from "../components/Training/TrainingDayForm/TrainingDayForm.jsx";
import AddTrainingButton from "../components/Training/AddTrainingButton.jsx";

const Training = () => {
	const [trainings, setTrainings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
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
		} catch (error) {
			console.error('Error fetching trainings:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTrainings();
	}, []);
	return (

		loading ? (
			<Loader/>
		) : (
			<main>
				<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}
						   phText="Поиск по упражнениям или группам мышц..."
				/>

				<TrainingsList
					trainings={trainings}
					onRefresh={fetchTrainings}  // Передаем функцию для обновления списка тренировок
					searchTerm={searchTerm}
				/>

				<TrainingDayForm
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					trainingData={selectedTrainingRecord}
					onRefresh={fetchTrainings}
				/>

				<AddTrainingButton onClick={() => setIsModalOpen(true)}/>
			</main>
		)

	);
};

export default Training;