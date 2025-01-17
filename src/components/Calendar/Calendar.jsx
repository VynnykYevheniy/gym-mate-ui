import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import * as TrainingService from "../../service/TrainingService.jsx";
import CalendarGrid from "./CalendarGrid.jsx";
import CalendarNavigation from "./CalendarNavigation.jsx";
import TrainingForm from "../Training/TrainingForm.jsx";
import TrainingsList from "../Training/TrainingsList.jsx";
import useTrainingModal from "../Training/useTrainingModal.jsx";
import AddTrainingButton from "./AddTrainingButton.jsx";
import Loader from "../generic/Loader.jsx";

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(moment());
	const [selectedDate, setSelectedDate] = useState(null);
	const [trainings, setTrainings] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

	const {
		isModalOpen,
		selectedTrainingRecord,
		setIsModalOpen,
		setSelectedTrainingRecord,
		handleCloseModal,
	} = useTrainingModal();

	const loadTrainingsForMonth = useCallback(async (month, year) => {
		setIsLoading(true); // Включаем индикатор загрузки
		try {
			const data = await TrainingService.fetchTrainingsByMonth(month, year);
			setTrainings(data);
		} catch (error) {
			console.error('Failed to load Training data:', error);
		} finally {
			setIsLoading(false); // Отключаем индикатор загрузки
		}
	}, []);

	useEffect(() => {
		loadTrainingsForMonth(currentDate.month() + 1, currentDate.year());
	}, [currentDate, loadTrainingsForMonth]);

	const changeMonth = (increment) => {
		setCurrentDate(currentDate.clone().add(increment, 'month'));
	};

	const handleDayClick = useCallback((date) => {
		const trainingRecord = trainings.find((t) => moment(t.date).isSame(date, 'day')) || { date: date.format('YYYY-MM-DDTHH:mm') };
		setSelectedTrainingRecord(trainingRecord);
		setSelectedDate(date);
	}, [setSelectedTrainingRecord, trainings]);

	const filteredTrainings = selectedDate
		? trainings.filter((t) => moment(t.date).isSame(selectedDate, 'day'))
		: [];

	return (
		<main className="flex flex-col items-center justify-center pb-16">
			{isLoading ? ( // Показываем Loader, пока данные загружаются
				<Loader />
			) : (
				<>
					<CalendarNavigation
						currentDate={currentDate}
						changeMonth={changeMonth}
					/>
					<CalendarGrid
						currentDate={currentDate}
						trainings={trainings}
						onDayClick={handleDayClick}
						selectedDate={selectedDate}
					/>
					{selectedDate && filteredTrainings.length > 0 ? (
						<TrainingsList
							trainings={filteredTrainings}
							onRefresh={() => loadTrainingsForMonth(currentDate.month() + 1, currentDate.year())}
						/>
					) : (
						<AddTrainingButton onClick={() => setIsModalOpen(true)} />
					)}
					<TrainingForm
						isOpen={isModalOpen}
						onClose={handleCloseModal}
						trainingData={selectedTrainingRecord}
						onRefresh={() => loadTrainingsForMonth(currentDate.month() + 1, currentDate.year())}
					/>
				</>
			)}
		</main>
	);
};

export default Calendar;