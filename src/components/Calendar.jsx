import {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import {
	FaArrowLeft,
	FaArrowRight,
	FaBiking,
	FaChevronUp,
	FaChild,
	FaDumbbell,
	FaHandRock,
	FaHeartbeat,
	FaRunning,
	FaSwimmer,
	FaTimes,
	FaWalking
} from "react-icons/fa";
import {fetchTrainingsByMonth} from "../service/TrainingService.jsx";
import TrainingForm from "./training/TrainingForm.jsx";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosConfig.jsx";
import ApiUrls from "../model/ApiUrls.js";

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

	const loadTrainingsForMonth = async (month, year) => {
		try {
			const data = await fetchTrainingsByMonth(month, year);
			setTrainingData(data);
		} catch (error) {
			console.error('Failed to load training data:', error);
		}
	};

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
				await loadTrainingsForMonth();
				Swal.fire('Удалено!', 'Тренировка была удалена.', 'success');
			} catch (error) {
				Swal.fire('Ошибка!', 'Не удалось удалить тренировку.', 'error');
				console.error('Error deleting training:', error);
			}
		}
	};
	const formatDate = (dateString) => {
		const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
		return new Date(dateString).toLocaleDateString('ru-RU', options);
	};

	useEffect(() => {
		loadTrainingsForMonth(currentDate.month() + 1, currentDate.year());
	}, [currentDate]);

	const changeMonth = (increment) => {
		setCurrentDate(currentDate.clone().add(increment, 'month'));
	};

	const handleDayClick = useCallback((date) => {
		if (isGymVisited(date)) {
			const trainingRecord = trainingData.find((t) => moment(t.date).isSame(date, 'day'));
			setSelectedTrainingRecord(trainingRecord || {date: date.format('YYYY-MM-DDTHH:mm')});
			setSelectedDate(date);
		} else {
			setSelectedTrainingRecord({date: date.format('YYYY-MM-DDTHH:mm')});
			setSelectedDate(date);
		}
		console.log(selectedTrainingRecord);
	}, [selectedTrainingRecord, trainingData]);


	const daysInMonth = currentDate.daysInMonth();
	const firstDayOfMonth = currentDate.clone().startOf('month').day();
	const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
	const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);
	const weekDaysShort = [...moment.weekdaysShort().slice(1), moment.weekdaysShort()[0]];

	const isGymVisited = useCallback(
		(date) => trainingData.some((t) => moment(t.date).isSame(date, 'day')),
		[trainingData]
	);
	const isWeekend = (date) => date.day() === 0 || date.day() === 6;

	const filteredTrainings = selectedDate
		? trainingData.filter((t) => moment(t.date).isSame(selectedDate, 'day'))
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
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
			{filteredTrainings.length > 0 ? (
				filteredTrainings.map((trainingRecord) => (
					<div
						key={trainingRecord.id}
						className="bg-white  border-transparent rounded-xl p-4 cursor-pointer transition-transform duration-200 transform hover:scale-102 hover:border-1 active:scale-98 hover:shadow-lg hover:border-gray-300"
						onClick={() => handleCardClick(trainingRecord)}
					>
						<button
							onClick={(event) => {
								event.stopPropagation();
								handleDeleteTraining(trainingRecord.id);
							}}
							className="absolute top-2 right-2 rounded-md border border-slate-100 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-500 hover:text-white hover:bg-slate-400 hover:border-slate-400 focus:text-white focus:bg-slate-500 focus:border-slate-500 active:border-slate-600 active:text-white active:bg-slate-600 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						>
							<FaTimes className="h-6 w-6"/>
						</button>
						<h3 className="text-sm text-gray-400 mb-2 pb-1 text-left">
							{formatDate(trainingRecord.date)}
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
				))
			) : (
				<div className="text-gray-400 text-center">Записи тренировок отсутствуют.</div>
			)}
		</div>
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
			<div className="flex justify-between items-center mb-4 w-full max-w-md">
				<button onClick={() => changeMonth(-1)}
						className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
					<FaArrowLeft />
				</button>
				<h2 className="text-xl font-bold">{currentDate.format('MMMM YYYY')}</h2>
				<button onClick={() => changeMonth(1)}
						className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
					<FaArrowRight />
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

			{/* Displaying training records or button for record training */}
			{selectedDate && filteredTrainings.length > 0 ? renderTrainingRecords() : renderAddTrainingButton()}

			<TrainingForm
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				trainingData={selectedTrainingRecord}
				onTrainingAdded={() => loadTrainingsForMonth(currentDate.month() + 1, currentDate.year())} // Corrected the function to call
			/>
		</div>
	);
};

export default Calendar;
