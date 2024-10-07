import { useState } from 'react';
import TrainingFormModal from '../components/TrainingFormModal';
import TrainingsTable from '../components/TrainingsTable'; // Импорт таблицы

const Training = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="p-6">
			<div className="text-center mb-6">
				<h1 className="text-3xl mb-4">Welcome to Your Training Diary</h1>
				<button
					onClick={handleOpenModal}
					className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
				>
					Record a Training
				</button>
			</div>

			{/* Модальное окно для записи тренировки */}
			<TrainingFormModal isOpen={isModalOpen} onClose={handleCloseModal} />

			{/* Таблица тренировок */}
			<TrainingsTable />
		</div>
	);
};

export default Training;
