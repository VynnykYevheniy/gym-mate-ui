import {Line} from 'react-chartjs-2';
import 'chart.js/auto';
import {useEffect, useState} from 'react';
import {useSwipeable} from 'react-swipeable';
import PropTypes from "prop-types";

const WeightBMIChart = ({weightData, bmiData}) => {
	const [chartData, setChartData] = useState({});
	const [chartType, setChartType] = useState('weight'); // Track which chart to display

	const handlers = useSwipeable({
		onSwipedLeft: () => setChartType((prev) => (prev === 'weight' ? 'bmi' : 'weight')),
		onSwipedRight: () => setChartType((prev) => (prev === 'weight' ? 'bmi' : 'weight')),
	});

	useEffect(() => {
		let labels = [];
		let data = [];
		let label = '';

		if (chartType === 'weight' && weightData.length > 0) {
			labels = weightData.map((entry) => entry.date);
			data = weightData.map((entry) => entry.weight);
			label = 'Вес (кг)';
		} else if (chartType === 'bmi' && bmiData.length > 0) {
			labels = bmiData.map((entry) => entry.date);
			data = bmiData.map((entry) => entry.bmi);
			label = 'ИМТ';
		}

		if (labels.length > 0 && data.length > 0) {
			setChartData({
				labels: labels,
				datasets: [
					{
						label: label,
						data: data,
						fill: false,
						borderColor: chartType === 'weight' ? '#15803d' : '#FF6384',
						backgroundColor: chartType === 'weight' ? '#15803d' : '#FF6384',
						tension: 0.1,
					},
				],
			});
		}
	}, [chartType, weightData, bmiData]);

	return (
		<section className="w-full p-2 text-center bg-white rounded-lg mb-6">
			<div className="max-w-4xl mx-auto bg-white" {...handlers}>
				{chartData.labels ? (
					<Line
						data={chartData}
						options={{
							responsive: true,
							maintainAspectRatio: false,
							scales: {
								x: {title: {display: true, text: 'Дата'}},
								y: {
									title: {display: true, text: chartType === 'weight' ? 'Вес (кг)' : 'ИМТ'},
									beginAtZero: true
								},
							},
							plugins: {
								tooltip: {
									callbacks: {
										label: (tooltipItem) =>
											`${chartType === 'weight' ? 'Вес' : 'ИМТ'}: ${tooltipItem.raw}`,
									},
								},
							},
						}}
						height={400}
					/>
				) : (
					<p className="text-center text-gray-500">Нет данных</p>
				)}
			</div>
		</section>
	);
};
WeightBMIChart.propTypes = {
	weightData: PropTypes.array.isRequired,
	bmiData: PropTypes.array.isRequired,
}
export default WeightBMIChart;