import TrainingCard from './TrainingCard'; // Импортируем компонент карточки тренировки
import useTrainingModal from './useTrainingModal';
import TrainingForm from "./TrainingForm.jsx";
import PropTypes from "prop-types"; // Импортируем кастомный хук

const TrainingsList = ({trainings, onRefresh, searchTerm}) => {
	const {
		isModalOpen,
		selectedTrainingRecord,
		handleCardClick,
		handleCloseModal,
		handleTrainingDeleted,
	} = useTrainingModal(); // Используем хук внутри TrainingsList

	const filteredTrainings = searchTerm
		? trainings.filter(trainingRecord =>
			trainingRecord.trainings.some(training =>
				training.exercise.muscleGroup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				training.exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		)
		: trainings;

	return (
		<div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
			{filteredTrainings.length > 0 ? (
				filteredTrainings.map((trainingRecord) => (
					<TrainingCard
						key={trainingRecord.id}
						trainingRecord={trainingRecord}
						onCardClick={handleCardClick}
						onDelete={() => handleTrainingDeleted(() => onRefresh())} // Вызываем onRefresh после удаления
					/>
				))
			) : (
				<p>Тренировки не найдены.</p>
			)}

			{/* Модальное окно для тренировки */}
			<TrainingForm
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				trainingData={selectedTrainingRecord}
				onTrainingAdded={onRefresh}  // Перезагружаем список тренировок
			/>
		</div>
	);
};
TrainingsList.propTypes = {
	trainings: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			date: PropTypes.string.isRequired,
			trainings: PropTypes.arrayOf(
				PropTypes.shape({
					exercise: PropTypes.shape({
						muscleGroup: PropTypes.shape({
							name: PropTypes.string.isRequired
						}).isRequired,
						name: PropTypes.string.isRequired
					}).isRequired
				}).isRequired
			).isRequired
		}).isRequired
	).isRequired,
	onRefresh: PropTypes.func.isRequired,
	searchTerm: PropTypes.string
};
export default TrainingsList;