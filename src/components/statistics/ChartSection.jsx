// Chart Component
import {Line} from "react-chartjs-2";
import PropTypes from "prop-types";

const ChartSection = ({title, data}) => (
	<div className="bg-white shadow rounded-lg my-6">
		<h2 className="text-lg font-bold">{title}</h2>
		<Line data={data}/>
	</div>
);
ChartSection.propTypes = {
	title: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.object)
}
export default ChartSection;