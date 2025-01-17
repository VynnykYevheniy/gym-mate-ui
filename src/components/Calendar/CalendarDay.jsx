import PropTypes from "prop-types";

const CalendarDay = ({ date, isVisited, isWeekend, onDayClick, isSelected }) => {
	return (
		<button
			onClick={() => onDayClick(date)}
			className={`border-2 rounded-md  ${
				isSelected ? "border-primary" : "border-white"
			}`}
		>
			<div
				className={`p-4 rounded-md flex items-center justify-center cursor-pointer ${
					isVisited ? "bg-primary text-white" : isWeekend ? "bg-red-200" : "bg-gray-100"
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
	isSelected: PropTypes.bool, // Новый проп
};

export default CalendarDay;