import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import PropTypes from 'prop-types';

const WeightBMIChart = ({ weightData = [], bmiData = [] }) => {
	const [chartData, setChartData] = useState({});
	const [chartType, setChartType] = useState('weight'); // Track which chart to display
	const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
	const [newWeight, setNewWeight] = useState(''); // Input value for new weight
	const [localWeightData, setLocalWeightData] = useState(weightData); // Local state for weight data

	// Swipe handlers to toggle charts
	const handlers = useSwipeable({
		onSwipedLeft: () => setChartType((prev) => (prev === 'weight' ? 'bmi' : 'weight')),
		onSwipedRight: () => setChartType((prev) => (prev === 'weight' ? 'bmi' : 'weight')),
	});

	// Keyboard event handler
	const handleKeyPress = (event) => {
		if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			setChartType((prev) => (prev === 'weight' ? 'bmi' : 'weight'));
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

		if (chartType === 'weight' && localWeightData.length > 0) {
			labels = localWeightData.map((entry) => entry.date);
			data = localWeightData.map((entry) => entry.weight);
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
	}, [chartType, localWeightData, bmiData]);

	// Add new weight entry
	const handleAddWeight = () => {
		const newEntry = {
			date: new Date().toLocaleDateString('ru-RU'), // Add today's date
			weight: parseFloat(newWeight),
		};
		setLocalWeightData((prev) => [...prev, newEntry]); // Update local weight data
		setNewWeight(''); // Clear input
		setIsModalOpen(false); // Close modal
	};

	return (
		<div className="max-w-4xl mx-auto bg-white" {...handlers}>
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
										text: 'Date',
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
							plugins: {
								tooltip: {
									callbacks: {
										label: (tooltipItem) => {
											const value = tooltipItem.raw;
											return `${chartType === 'weight' ? 'Вес' : 'ИМТ'}: ${value}`;
										},
									},
								},
							},
						}}
						height={400}
					/>
				</div>
			) : (
				<p className="text-center text-gray-500">No data available</p>
			)}

			{/* Button to open modal */}
			<div className="text-center mt-4">
				<button
					onClick={() => setIsModalOpen(true)}
					className="bg-green-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
				>
					Добавить вес
				</button>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 mb-16">
					<div className="bg-zinc-50 rounded-lg p-4 w-11/12 sm:w-1/2 max-h-[90vh] shadow-2xl transform transition-all duration-300">
						<h2 className="text-xl text-gray-500 mb-2">Add Weight</h2>
						<input
							type="number"
							value={newWeight}
							onChange={(e) => setNewWeight(e.target.value)}
							placeholder="Enter the new weight (kg)"
							className="w-3/4 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
						/>
						<div className="flex justify-center items-center m-4">
							<button
								onClick={() => setIsModalOpen(false)}
								className="absolute top-4 right-4 rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
								aria-label="Remove Training">
								<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 352 512"
									 height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
								</svg>
							</button>


							<button
								onClick={handleAddWeight}
								className="bg-green-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
								disabled={!newWeight || isNaN(newWeight)}
							>
								Сохранить
							</button>
						</div>
					</div>
				</div>
			)}
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
