import {useCallback} from "react";
import moment from "moment";
import PropTypes from "prop-types";
import WeekDaysHeader from "./WeekDaysHeader";
import CalendarDays from "./CalendarDays";

const CalendarGrid = ({currentDate, trainings, onDayClick}) => {
	const daysInMonth = currentDate.daysInMonth();
	const firstDayOfMonth = currentDate.clone().startOf("month").day();
	const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
	const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);

	const isGymVisited = useCallback(
		(date) => trainings.some((t) => moment(t.date).isSame(date, "day")),
		[trainings]
	);
	const isWeekend = (date) => date.day() === 0 || date.day() === 6;

	return (
		<div className="border-gray-400 p-2 w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-sm">
			<WeekDaysHeader/>
			<CalendarDays
				daysArray={daysArray}
				offset={offset}
				currentDate={currentDate}
				isGymVisited={isGymVisited}
				isWeekend={isWeekend}
				onDayClick={onDayClick}
			/>
		</div>
	);
};

CalendarGrid.propTypes = {
	currentDate: PropTypes.instanceOf(moment).isRequired,
	trainings: PropTypes.arrayOf(PropTypes.shape({})),
	onDayClick: PropTypes.func,
};

export default CalendarGrid;
