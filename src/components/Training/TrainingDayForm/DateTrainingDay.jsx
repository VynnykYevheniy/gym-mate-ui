import PropTypes from "prop-types";

const DateTrainingDay = ({date, onDateChange}) => {
	return (
		<div className="m-4 flex items-center">
			<label htmlFor="date" className="block w-1/4 text-sm font-medium text-gray-500 mb-2">Date</label>
			<input
				type="datetime-local"
				id="date"
				value={date}
				onChange={(e) => onDateChange(e.target.value)}
				className="w-3/4 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
			/>
		</div>
	);
}

DateTrainingDay.propTypes = {
	date: PropTypes.string.isRequired,
	onDateChange: PropTypes.func.isRequired,
};
export default DateTrainingDay;