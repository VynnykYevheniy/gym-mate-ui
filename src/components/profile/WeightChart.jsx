import {Line} from 'react-chartjs-2';
import 'chart.js/auto';
import {useEffect, useState} from 'react';
import {useSwipeable} from 'react-swipeable';
import * as AnalyticsBodyService from "../../service/AnalyticsBodyService.jsx";

const WeightBMIChart = () => {
	const [chartData, setChartData] = useState({});
	const [chartType, setChartType] = useState('weight'); // Track which chart to display
	const [weightData, setWeightData] = useState([]);
	const [bmiData, setBmiData] = useState([]);
	const [loading, setLoading] = useState(true);

	const handlers = useSwipeable({
		onSwipedLeft: () => setChartType((prev) => (prev === 'weight' ? 'bmi' : 'weight')),
		onSwipedRight: () => setChartType((prev) => (prev === 'weight' ? 'bmi' : 'weight')),
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const analytics = await AnalyticsBodyService.getAll();
				console.log(analytics);
				const weights = analytics.map(({date, weight}) => ({date, weight}));
				const bmiValues = analytics.map(({date, bmi}) => ({date, bmi}));

				setWeightData(weights);
				setBmiData(bmiValues);
			} catch (error) {
				console.error("Failed to fetch analytics data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

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
						borderColor: chartType === 'weight' ? '#4CAF50' : '#FF6384',
						backgroundColor: chartType === 'weight' ? '#4CAF50' : '#FF6384',
						tension: 0.1,
					},
				],
			});
		}
	}, [chartType, weightData, bmiData]);

	if (loading) {
		return <p className="text-center text-gray-500">Загрузка данных...</p>;
	}

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
								y: {title: {display: true, text: chartType === 'weight' ? 'Вес (кг)' : 'ИМТ'}, beginAtZero: true},
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

export default WeightBMIChart;