import { useState } from 'react';

const useTrainingModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTrainingRecord, setSelectedTrainingRecord] = useState(null);

	const handleCardClick = (trainingRecord) => {
		setSelectedTrainingRecord(trainingRecord);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedTrainingRecord(null);
	};

	const handleTrainingDeleted = (fetchTrainings) => {
		fetchTrainings(); // Перезагружаем список тренировок после удаления
	};

	return {
		isModalOpen,
		selectedTrainingRecord,
		setIsModalOpen, // Возвращаем setIsModalOpen
		setSelectedTrainingRecord, // Возвращаем setSelectedTrainingRecord
		handleCardClick,
		handleCloseModal,
		handleTrainingDeleted,
	};
};

export default useTrainingModal;