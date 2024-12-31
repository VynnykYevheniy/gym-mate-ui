// Statistics Details Component
import PropTypes from "prop-types";

const StatisticsDetails = ({details}) => (
	<div className="space-y-4 bg-gray-50 p-2 shadow-inner shadow-[inset_0px_6px_10px_rgba(0,0,0,0.1)]">
		{details.map(({label, value}) => (
			<div key={label} className="flex justify-between items-center">
				<span className="text-gray-600">{label}</span>
				<span className="font-semibold text-lg">{value}</span>
			</div>
		))}
	</div>
);
StatisticsDetails.propTypes = {
	details: PropTypes.array.isRequired,
}
export default StatisticsDetails;