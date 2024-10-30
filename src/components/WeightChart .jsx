import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import PropTypes from 'prop-types';

const WeightBMIChart = ({ weightData = [], bmiData = [] }) => {
	const [chartData, setChartData] = useState({});
	const [chartType, setChartType] = useState('weight'); // Track which chart to display

	// Swipe handlers to toggle charts
	const handlers = useSwipeable({
		onSwipedLeft: () => setChartType(prev => (prev === 'weight' ? 'bmi' : 'weight')),
		onSwipedRight: () => setChartType(prev => (prev === 'weight' ? 'bmi' : 'weight')),
	});

	// Keyboard event handler
	const handleKeyPress = (event) => {
		if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			setChartType(prev => (prev === 'weight' ? 'bmi' : 'weight'));
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress); // Add key press listener
		return () => document.removeEventListener('keydown', handleKeyPress); // Clean up
	}, []);

	useEffect(() => {
		// Prepare data based on selected chart type
		let labels = [];
		let data = [];
		let label = '';

		if (chartType === 'weight' && weightData.length > 0) {
			labels = weightData.map(entry => entry.date);
			data = weightData.map(entry => entry.weight);
			label = 'Вес (кг)';
		} else if (chartType === 'bmi' && bmiData.length > 0) {
			labels = bmiData.map(entry => entry.date);
			data = bmiData.map(entry => entry.bmi);
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
						borderColor: chartType === 'weight' ? '#4CAF50' : '#FF6384',
						backgroundColor: chartType === 'weight' ? '#4CAF50' : '#FF6384',
						tension: 0.1,
					},
				],
			});
		}
	}, [chartType, weightData, bmiData]);

	return (
		<div className="max-w-4xl mx-auto bg-white" {...handlers}>
			<h2 className="text-xl font-semibold text-center mb-4">
				{chartType === 'weight' ? 'Weight' : 'BMI'}
			</h2>
			{chartData.labels ? (
				<div>
					<Line
						data={chartData}
						options={{
							responsive: true,
							maintainAspectRatio: false,
							scales: {
								x: {
									title: {
										display: true,
										text: 'Дата',
									},
								},
								y: {
									title: {
										display: true,
										text: chartType === 'weight' ? 'Вес (кг)' : 'ИМТ',
									},
									beginAtZero: true,
								},
							},
							// Tooltip customization
							plugins: {
								tooltip: {
									callbacks: {
										label: (tooltipItem) => {
											const value = tooltipItem.raw;
											return `${chartType === 'weight' ? 'Вес' : 'ИМТ'}: ${value}`;
										},
									},
								},
							}
						}}
						height={400}
					/>
				</div>
			) : (
				<p className="text-center text-gray-500">No data available</p>
			)}
			<p className="text-center text-gray-400 mt-2">
				{chartType === 'weight' ? 'Swipe left or press right arrow to see BMI chart' : 'Swipe right or press left arrow to see Weight chart'}
			</p>
		</div>
	);
};

// Define PropTypes for the component
WeightBMIChart.propTypes = {
	weightData: PropTypes.arrayOf(
		PropTypes.shape({
			date: PropTypes.string.isRequired,
			weight: PropTypes.number.isRequired,
		})
	),
	bmiData: PropTypes.arrayOf(
		PropTypes.shape({
			date: PropTypes.string.isRequired,
			bmi: PropTypes.number.isRequired,
		})
	),
};

export default WeightBMIChart;