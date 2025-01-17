import PropTypes from "prop-types";
import CalendarDay from "./CalendarDay";
import EmptyDays from "./EmptyDays";

const CalendarDays = ({daysArray, offset, currentDate, isGymVisited, isWeekend, onDayClick}) => {
	return (
		<div className="grid grid-cols-7 gap-2 mt-1">
			<EmptyDays count={offset} />
			{daysArray.map((day) => {
				const date = currentDate.clone().date(day);
				const isVisited = isGymVisited(date);
				const weekend = isWeekend(date);

				return (
					<CalendarDay
						key={day}
						date={date}
						isVisited={isVisited}
						isWeekend={weekend}
						onDayClick={onDayClick}
					/>
				);
			})}
		</div>
	);
};

CalendarDays.propTypes = {
	daysArray: PropTypes.arrayOf(PropTypes.number).isRequired,
	offset: PropTypes.number.isRequired,
	currentDate: PropTypes.object.isRequired,
	isGymVisited: PropTypes.func.isRequired,
	isWeekend: PropTypes.func.isRequired,
	onDayClick: PropTypes.func.isRequired,
};

export default CalendarDays;