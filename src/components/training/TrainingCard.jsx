import {FaTimes} from 'react-icons/fa';
import Swal from 'sweetalert2';
import axiosInstance from '../../api/axiosConfig.jsx';
import ApiUrls from "../../model/ApiUrls.js";
import {muscleGroupIcons} from "../../util/muscleGroupIcons.jsx";
import PropTypes from "prop-types";

const TrainingCard = ({trainingRecord, onCardClick, onDelete}) => {

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
				onDelete();  // Передаем функцию обновления списка тренировок
				Swal.fire('Удалено!', 'Тренировка была удалена.', 'success');
			} catch (error) {
				Swal.fire('Ошибка!', 'Не удалось удалить тренировку.', 'error');
				console.error('Error deleting training:', error);
			}
		}
	};

	return (
		<div
			className=" shadow-sm bg-white border-transparent rounded-xl p-4 cursor-pointer transition-transform duration-200 transform hover:scale-102 hover:border-1 active:scale-98 hover:shadow-lg hover:border-gray-300"
			onClick={() => onCardClick(trainingRecord)}
		>
			<button
				onClick={(event) => {
					event.stopPropagation();
					handleDeleteTraining(trainingRecord.id);
				}}
				className="absolute top-2 right-2 rounded-md border border-slate-200 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-red-500 hover:text-white hover:bg-slate-400 hover:border-slate-400 focus:text-white focus:bg-slate-500 focus:border-slate-500 active:border-slate-600 active:text-white active:bg-red-500 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
			>
				<FaTimes className="h-6 w-6"/>
			</button>
			<h3 className="text-sm text-gray-400 mb-2 pb-1 text-left">
				{new Date(trainingRecord.date).toLocaleDateString('ru-RU', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</h3>
			<div className="flex flex-col mt-4">
				{trainingRecord.trainings.map((training, index) => (
					<div key={`${trainingRecord.id}-${index}`} className="flex items-center mb-4">
						{muscleGroupIcons[training.exercise.muscleGroup.name] ||
							<span className="text-gray-500">{training.exercise.muscleGroup.name}</span>}
						<p className=" text-m text-gray-800 ml-3 text-left">{training.exercise.name}</p>
					</div>
				))}
			</div>
		</div>
	);
};
TrainingCard.propTypes = {
	trainingRecord: PropTypes.shape({
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
	}).isRequired,
	onCardClick: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
};
export default TrainingCard;