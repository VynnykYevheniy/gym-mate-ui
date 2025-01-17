import PropTypes from "prop-types";

const CalendarDay = ({date, isVisited, isWeekend, onDayClick}) => {
	return (
		<button
			onClick={() => onDayClick(date)}
			className="box-border border-2 border-white rounded-md"
		>
			<div
				className={`p-4 rounded-md flex items-center justify-center cursor-pointer ${
					isVisited ? "bg-primary text-primaryHover" : isWeekend ? "bg-red-200" : "bg-gray-100"
				}`}
			>
				{date.date()}
			</div>
		</button>
	);
};

CalendarDay.propTypes = {
	date: PropTypes.object.isRequired,
	isVisited: PropTypes.bool.isRequired,
	isWeekend: PropTypes.bool.isRequired,
	onDayClick: PropTypes.func.isRequired,
};

export default CalendarDay;