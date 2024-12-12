import {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {fetchTrainingsByMonth} from "../service/TrainingService.jsx";
import TrainingForm from "./training/TrainingForm.jsx";
import TrainingsList from "./training/TrainingsList.jsx";
import useTrainingModal from "./training/useTrainingModal.jsx";

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
		if (isGymVisited(date)) {
			const trainingRecord = trainings.find((t) => moment(t.date).isSame(date, 'day'));
			setSelectedTrainingRecord(trainingRecord || {date: date.format('YYYY-MM-DDTHH:mm')});
			setSelectedDate(date);
		} else {
			setSelectedTrainingRecord({date: date.format('YYYY-MM-DDTHH:mm')});
			setSelectedDate(date);
		}
		console.log(selectedTrainingRecord);
	}, [selectedTrainingRecord, trainings]);


	const daysInMonth = currentDate.daysInMonth();
	const firstDayOfMonth = currentDate.clone().startOf('month').day();
	const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
	const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);
	const weekDaysShort = [...moment.weekdaysShort().slice(1), moment.weekdaysShort()[0]];

	const isGymVisited = useCallback(
		(date) => trainings.some((t) => moment(t.date).isSame(date, 'day')),
		[trainings]
	);
	const isWeekend = (date) => date.day() === 0 || date.day() === 6;

	const filteredTrainings = selectedDate
		? trainings.filter((t) => moment(t.date).isSame(selectedDate, 'day'))
		: [];

	const renderCalendarDays = useCallback(() => (
		<div className="grid grid-cols-7 gap-2 mt-1">
			{Array.from({length: offset}).map((_, index) => (
				<div key={`empty-${index}`}/>
			))}
			{daysArray.map((day) => {
				const date = currentDate.clone().date(day);
				const isVisited = isGymVisited(date);
				const weekend = isWeekend(date);

				return (
					<button key={day}
							className="box-border border-2 border-white rounded-md focus:outline-none focus:border-2 focus:border-green-500">
						<div
							className={`p-4 rounded-md flex items-center justify-center cursor-pointer ${isVisited ? 'bg-green-200 text-green-800' : weekend ? 'bg-red-200' : 'bg-gray-100'}`}
							onClick={() => handleDayClick(date)}
						>
							{day}
						</div>
					</button>
				);
			})}
		</div>
	), [currentDate, daysArray, handleDayClick, isGymVisited, offset]);

	const renderTrainingRecords = () => (
		<TrainingsList
			trainings={filteredTrainings}
			onRefresh={() => loadTrainingsForMonth(currentDate.month() + 1, currentDate.year())}  // Передаем функцию для обновления списка тренировок
		/>
	);

	const renderAddTrainingButton = () => {
		return (
			<>
				<button
					onClick={() => setIsModalOpen(true)} // Open the modal on button click
					className="mt-4 px-4 py-2 bg-green-400 text-white rounded hover:bg-green-300 focus:outline-none focus:ring-4 focus:ring-green-500 transition	"
				>
					Add Training
				</button>
			</>


		);
	};

	return (

		<div className="flex flex-col items-center justify-center pb-16">
			{/* Month navigation */}
			<div className="flex justify-between items-center mb-2 w-full max-w-md">
				<button onClick={() => changeMonth(-1)}
						className="p-4 bg-green-500 text-white rounded hover:bg-green-600">
					<FaArrowLeft/>
				</button>
				<h2 className="text-xl font-bold">{currentDate.format('MMMM YYYY')}</h2>
				<button onClick={() => changeMonth(1)}
						className="p-4 bg-green-500 text-white rounded hover:bg-green-600">
					<FaArrowRight/>
				</button>
			</div>

			<div className="border-gray-400 p-2 w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-sm">
				<div className="grid grid-cols-7 gap-1 mb-4">
					{weekDaysShort.map((day) => (
						<div key={day}
							 className="flex items-center justify-center text-center font-bold text-black p-2">
							{day}
						</div>
					))}
					<div className="col-span-7 border-b-2 border-gray-600 mt-1"/>
				</div>

				{/* Calendar grid */}
				{renderCalendarDays()}
			</div>

			{/* Displaying training records or button for record training */}
			{selectedDate && filteredTrainings.length > 0 ? renderTrainingRecords() : renderAddTrainingButton()}

			<TrainingForm
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				trainingData={selectedTrainingRecord}
				onRefresh={() => loadTrainingsForMonth(currentDate.month() + 1, currentDate.year())}  // Передаем функцию для обновления списка тренировок
			/>
		</div>
	);
};

export default Calendar;
