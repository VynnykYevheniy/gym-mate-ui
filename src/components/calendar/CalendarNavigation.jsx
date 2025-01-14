import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import PropTypes from "prop-types";

const CalendarNavigation = ({currentDate, changeMonth}) => (
	<div className="flex justify-between items-center mb-2 w-full max-w-md">
		<button onClick={() => changeMonth(-1)} className="p-4 bg-primary text-white rounded hover:bg-primaryHover">
			<FaArrowLeft/>
		</button>
		<h2 className="text-xl text-secondTextColor">{currentDate.format('MMMM YYYY')}</h2>
		<button onClick={() => changeMonth(1)} className="p-4 bg-primary text-white rounded hover:bg-primaryHover">
			<FaArrowRight/>
		</button>
	</div>
);
CalendarNavigation.propTypes = {
	currentDate: PropTypes.instanceOf(Date).isRequired,
	changeMonth: PropTypes.func.isRequired,
}
export default CalendarNavigation;