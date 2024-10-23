import {useEffect, useState} from 'react';
import moment from 'moment';
import {
	FaBiking,
	FaChevronUp,
	FaChild,
	FaDumbbell,
	FaHandRock,
	FaHeartbeat,
	FaRunning,
	FaSwimmer,
	FaWalking
} from "react-icons/fa";
import {fetchTrainingsByMonth} from "../service/TrainingService.jsx";

const muscleGroupIcons = {
	"Ноги": <FaRunning className="text-green-500"/>,
	"Бицепс": <FaHandRock className="text-blue-500"/>,
	"Предплечье": <FaDumbbell className="text-purple-500"/>,
	"Плечи": <FaChevronUp className="text-orange-500"/>,
	"Трицепс": <FaBiking className="text-yellow-500"/>,
	"Икры": <FaWalking className="text-red-500"/>,
	"Спина": <FaSwimmer className="text-teal-500"/>,
	"Грудь": <FaHeartbeat className="text-pink-500"/>,
	"Пресс": <FaChild className="text-green-500"/>,
};
const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(moment());
	const [selectedDate, setSelectedDate] = useState(null);
	const [trainingData, setTrainingData] = useState([]);

	const loadTrainingsForMonth = async (month, year) => {
		try {
			const data = await fetchTrainingsByMonth(month, year);
			setTrainingData(data);
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

	const handleDayClick = (date) => {
		if (isGymVisited(date)) {
			setSelectedDate(date);
		} else {
			setSelectedDate(null); // Set to null if no training was recorded for the day
		}
	};

	const daysInMonth = currentDate.daysInMonth();
	const firstDayOfMonth = currentDate.clone().startOf('month').day();
	const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
	const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);
	const weekDaysShort = [...moment.weekdaysShort().slice(1), moment.weekdaysShort()[0]];

	const isGymVisited = (date) => trainingData.some((t) => moment(t.date).isSame(date, 'day'));
	const isWeekend = (date) => date.day() === 0 || date.day() === 6;

	const filteredTrainings = selectedDate
		? trainingData.filter((t) => moment(t.date).isSame(selectedDate, 'day'))
		: [];

	const renderCalendarDays = () => (
		<div className="grid grid-cols-7 gap-2 mt-1">
			{Array.from({length: offset}).map((_, index) => (
				<div key={`empty-${index}`}/>
			))}
			{daysArray.map((day) => {
				const date = currentDate.clone().date(day);
				const isVisited = isGymVisited(date);
				const weekend = isWeekend(date);

				return (
					<div
						key={day}
						className={`p-4 rounded-md flex items-center justify-center cursor-pointer ${isVisited ? 'bg-green-200 text-green-800' : weekend ? 'bg-red-200' : 'bg-gray-100'}`}
						onClick={() => handleDayClick(date)} // Use handleDayClick here
					>
						{day}
					</div>
				);
			})}
		</div>
	);

	const renderTrainingRecords = () => (
		<div className="h-60 sm:h-80 lg:h-96 mt-6 w-full max-w-md">
			{filteredTrainings.map((trainingRecord) => (
				<div
					key={trainingRecord.id}
					className="bg-white border-2 border-transparent rounded-xl shadow-lg p-4 cursor-pointer transition-transform duration-300 transform hover:scale-105 active:scale-95 hover:shadow-2xl hover:border-green-500"
				>
					<h3 className="text-xl font-semibold text-green-700 mb-2 border-b-2 border-green-500 pb-1">
						{moment(trainingRecord.date).format('MMMM Do YYYY')}
					</h3>
					<div className="flex flex-col mt-4">
						{trainingRecord.trainings.map((training, index) => (
							<div key={`${trainingRecord.id}-${index}`} className="flex items-center mb-4 border-b-2">
								{muscleGroupIcons[training.exercise.muscleGroup.name] || (
									<span className="text-gray-500">{training.exercise.muscleGroup.name}</span>
								)}
								<p className="font-semibold text-lg text-gray-800 ml-3">{training.exercise.name}</p>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);

	return (
		<div className="flex flex-col items-center justify-center p-4">
			{/* Month navigation */}
			<div className="flex justify-between items-center mb-4 w-full max-w-md">
				<button onClick={() => changeMonth(-1)}
						className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
					Prev
				</button>
				<h2 className="text-xl font-bold">{currentDate.format('MMMM YYYY')}</h2>
				<button onClick={() => changeMonth(1)}
						className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
					Next
				</button>
			</div>

			<div className="border-gray-400 p-4 w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-lg">
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

			{/* Displaying training records */}
			{selectedDate && filteredTrainings.length > 0 ? renderTrainingRecords() : null}
		</div>
	);
};

export default Calendar;