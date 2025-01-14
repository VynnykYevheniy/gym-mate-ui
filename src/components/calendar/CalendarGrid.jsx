import {useCallback} from "react";
import moment from "moment";
import PropTypes from "prop-types";

const CalendarGrid = ({currentDate, trainings, onDayClick}) => {
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

	return (
		<div className="border-gray-400 p-2 w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-sm">
			<div className="grid grid-cols-7 gap-1 mb-4">
				{weekDaysShort.map((day) => (
					<div key={day} className="flex items-center justify-center text-center font-bold text-secondTextColor p-2">
						{day}
					</div>
				))}
				<div className="col-span-7 border-b-2 border-secondTextColor mt-1"/>
			</div>

			<div className="grid grid-cols-7 gap-2 mt-1">
				{Array.from({length: offset}).map((_, index) => (
					<div key={`empty-${index}`}/>
				))}
				{daysArray.map((day) => {
					const date = currentDate.clone().date(day);
					const isVisited = isGymVisited(date);
					const weekend = isWeekend(date);

					return (
						<button key={day} onClick={() => onDayClick(date)}
								className="box-border border-2 border-white rounded-md">
							<div
								className={`p-4 rounded-md flex items-center justify-center cursor-pointer ${
									isVisited ? 'bg-primary text-primaryHover' : weekend ? 'bg-red-200' : 'bg-gray-100'
								}`}
							>
								{day}
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
};
CalendarGrid.propTypes = {
	currentDate: PropTypes.instanceOf(Date).isRequired,
	trainings: PropTypes.arrayOf(PropTypes.shape({})),
	onDayClick: PropTypes.func,
}
export default CalendarGrid;