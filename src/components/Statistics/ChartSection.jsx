import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const ChartSection = ({ title, data }) => {
	return (
		<section>
			<h2 className="text-lg text-center mb-6">{title}</h2>
			{/*<Line data={data} />*/}
		</section>
	);
};

ChartSection.propTypes = {
	title: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
};

export default ChartSection;