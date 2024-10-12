import {useState} from 'react';
import moment from 'moment';

// Пример данных тренировок
const trainingData = [
	{
		date: '2024-10-10',
		gymVisited: true,
		id: 1,
		trainings: [{exercise: {name: 'Squat', muscleGroup: {name: 'Legs'}}}]
	},
	{
		date: '2024-10-12',
		gymVisited: true,
		id: 2,
		trainings: [{exercise: {name: 'Bench Press', muscleGroup: {name: 'Chest'}}}]
	},
	{
		date: '2024-11-03',
		gymVisited: true,
		id: 3,
		trainings: [{exercise: {name: 'Deadlift', muscleGroup: {name: 'Back'}}}]
	},
	{date: '2024-11-05', gymVisited: false, id: 4, trainings: []},
];

// Устанавливаем начало недели на понедельник
moment.updateLocale('en', {
	week: {
		dow: 1, // Устанавливаем понедельник как первый день недели (1 = Понедельник)
	},
});

const Calendar = () => {
	// Состояние для текущего месяца и года
	const [currentDate, setCurrentDate] = useState(moment());
	const [selectedDate, setSelectedDate] = useState(null); // Состояние для выбранной даты

	// Функция для переключения месяца вперед
	const nextMonth = () => {
		setCurrentDate(currentDate.clone().add(1, 'month'));
	};

	// Функция для переключения месяца назад
	const prevMonth = () => {
		setCurrentDate(currentDate.clone().subtract(1, 'month'));
	};

	// Получение количества дней в текущем месяце
	const daysInMonth = currentDate.daysInMonth();

	// Определение, какой день недели является первым днем месяца
	const firstDayOfMonth = currentDate.clone().startOf('month').day();

	// Сдвигаем первый день месяца, чтобы начинался с понедельника
	const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

	const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);

	// Список сокращенных названий дней недели, начиная с понедельника
	const weekDaysShort = [...moment.weekdaysShort().slice(1), moment.weekdaysShort()[0]];

	// Проверяем, посещался ли спортзал в конкретный день
	const isGymVisited = (date) => {
		return trainingData.some((t) => moment(t.date).isSame(date, 'day') && t.gymVisited);
	};

	// Проверка на выходные дни (суббота и воскресенье)
	const isWeekend = (date) => {
		const dayOfWeek = date.day();
		return dayOfWeek === 6 || dayOfWeek === 0;
	};

	// Функция для фильтрации тренировок по выбранной дате
	const filteredTrainings = selectedDate ? trainingData.filter((t) =>
		moment(t.date).isSame(selectedDate, 'day')
	) : [];

	// ... остальные части кода

	return (
		<div className="flex flex-col items-center justify-center p-4">
			{/* Переключатель месяцев */}
			<div className="flex justify-between items-center mb-4 w-full max-w-md">
				<button onClick={prevMonth} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
					Prev
				</button>
				<h2 className="text-xl font-bold">{currentDate.format('MMMM YYYY')}</h2>
				<button onClick={nextMonth} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
					Next
				</button>
			</div>

			{/* Добавляем рамку для всего календаря */}
			<div className="border-2 border-gray-400 p-4 w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-lg">
				{/* Заголовки дней недели */}
				<div className="grid grid-cols-7 gap-1 mb-4">
					{weekDaysShort.map((day) => (
						<div key={day}
							 className="flex items-center justify-center text-center font-bold text-black p-2">
							{day}
						</div>
					))}
					<div className="col-span-7 border-b-2 border-gray-600 mt-1"/>
				</div>

				{/* Сетка календаря */}
				<div className="grid grid-cols-7 gap-2 mt-1">
					{/* Пустые ячейки для сдвига первого дня месяца */}
					{Array.from({length: offset}).map((_, index) => (
						<div key={`empty-${index}`}/>
					))}

					{/* Дни месяца */}
					{daysArray.map((day) => {
						const date = currentDate.clone().date(day);
						const isVisited = isGymVisited(date);
						const weekend = isWeekend(date);

						return (
							<div
								key={day}
								className={`border-b-2 border-black p-4 rounded-md flex items-center justify-center cursor-pointer ${
									isVisited
										? 'bg-green-200 text-green-800'
										: weekend
											? 'bg-red-200'
											: 'bg-gray-100' // Блокируем клик на дни без тренировок
								}`}
								onClick={() => {
									if (isVisited) {
										setSelectedDate(date); // Устанавливаем выбранную дату только если спортзал посещался
									}
								}}
							>
								{day}
							</div>
						);
					})}
				</div>
			</div>

			{/* Отображение записей тренировок для выбранного дня */}
			{selectedDate && (
				<div className="overflow-auto h-60 sm:h-80 lg:h-96 mt-6 w-full max-w-md">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
						{filteredTrainings.length > 0 ? (
							filteredTrainings.map((trainingRecord) => (
								<div
									key={trainingRecord.id}
									className="bg-white border-2 border-gray-400 rounded-xl shadow-lg p-4 cursor-pointer duration-300"
								>
									<h3 className="text-xl font-semibold text-green-700 mb-2 border-b-2 border-green-500 pb-1">
										{moment(trainingRecord.date).format('MMMM Do YYYY')}
									</h3>
									<div className="flex flex-col mt-4">
										{trainingRecord.trainings.map((training, index) => (
											<div key={`${trainingRecord.id}-${index}`}
												 className="flex items-center mb-4">
												<span
													className="text-gray-500">{training.exercise.muscleGroup.name}</span>
												<p className="font-semibold text-lg text-gray-800 ml-3">{training.exercise.name}</p>
											</div>
										))}
									</div>
								</div>
							))
						) : (
							<div className="text-gray-500 text-center">Записи тренировок отсутствуют.</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Calendar;