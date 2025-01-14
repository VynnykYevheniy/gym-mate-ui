// Components/Calendar/Calendar.js
import {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import {fetchTrainingsByMonth} from "../../service/TrainingService.jsx";
import CalendarGrid from "./CalendarGrid.jsx";
import CalendarNavigation from "./CalendarNavigation.jsx";
import TrainingForm from "../training/TrainingForm.jsx";
import TrainingsList from "../training/TrainingsList.jsx";
import useTrainingModal from "../training/useTrainingModal.jsx";

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(moment());
	const [selectedDate, setSelectedDate] = useState(null);
	const [trainings, setTrainings] = useState([]);

	const {
		isModalOpen,
		selectedTrainingRecord,
		setIsModalOpen,
		setSelectedTrainingRecord,
		handleCloseModal,
	} = useTrainingModal();

	const loadTrainingsForMonth = async (month, year) => {
		try {
			const data = await fetchTrainingsByMonth(month, year);
			setTrainings(data);
		} catch (error) {
			console.error('Failed to load training data:', error);
		}
	};

	useEffect(() => {
		loadTrainingsForMonth(currentDate.month() + 1, currentDate.year());
	}, [currentDate]);

	const changeMonth = (increment) => {
		setCurrentDate(currentDate.clone().add(increment, 'month'));
	};

	const handleDayClick = useCallback((date) => {
		const trainingRecord = trainings.find((t) => moment(t.date).isSame(date, 'day')) || {date: date.format('YYYY-MM-DDTHH:mm')};
		setSelectedTrainingRecord(trainingRecord);
		setSelectedDate(date);
	}, [setSelectedTrainingRecord, trainings]);

	const filteredTrainings = selectedDate
		? trainings.filter((t) => moment(t.date).isSame(selectedDate, 'day'))
		: [];

	return (
		<div className="flex flex-col items-center justify-center pb-16">
			<CalendarNavigation
				currentDate={currentDate}
				changeMonth={changeMonth}
			/>
			<CalendarGrid
				currentDate={currentDate}
				trainings={trainings}
				onDayClick={handleDayClick}
			/>
			{selectedDate && filteredTrainings.length > 0 ? (
				<TrainingsList
					trainings={filteredTrainings}
					onRefresh={() => loadTrainingsForMonth(currentDate.month() + 1, currentDate.year())}
				/>
			) : (
				<button
					onClick={() => setIsModalOpen(true)}
					className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primaryHover focus:outline-none focus:ring-4 focus:ring-primaryHover transition"
				>
					Add Training
				</button>
			)
			}
			<TrainingForm
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				trainingData={selectedTrainingRecord}
				onRefresh={() => loadTrainingsForMonth(currentDate.month() + 1, currentDate.year())}
			/>
		</div>
	);
};

export default Calendar;