import {useState} from 'react';
import {Line} from 'react-chartjs-2';
import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const Statistics = () => {
	const [selectedExercise, setSelectedExercise] = useState('Bench Press');
	const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('Chest');
	const [timeframe, setTimeframe] = useState('Month'); // Default timeframe
	const [showStatistics, setShowStatistics] = useState(false); // State to toggle statistics visibility

	// Map muscle groups to exercises
	const exercisesByMuscleGroup = {
		Chest: ['Bench Press', 'Incline Bench Press', 'Chest Fly'],
		Back: ['Deadlift', 'Pull-up', 'Bent-over Row'],
		Legs: ['Squat', 'Leg Press', 'Lunges'],
		Shoulders: ['Overhead Press', 'Lateral Raise', 'Arnold Press'],
		Biceps: ['Barbell Curl', 'Hammer Curl', 'Preacher Curl'],
		Triceps: ['Tricep Dips', 'Tricep Pushdown', 'Skull Crushers'],
	};

	const labelsByTimeframe = {
		Week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		Month: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
		Year: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	};

	const exerciseData = {
		Week: [70, 72, 75, 73, 76, 78, 80],
		Month: [60, 65, 70, 75],
		Year: [55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110],
	};

	const muscleGroupData = {
		Week: [500, 520, 540, 560, 580, 600, 620],
		Month: [2000, 2500, 3000, 3500],
		Year: [24000, 26000, 28000, 30000, 32000, 34000, 36000, 38000, 40000, 42000, 44000, 46000],
	};

	const labels = labelsByTimeframe[timeframe];

	const exerciseProgress = {
		labels,
		datasets: [
			{
				label: `${selectedExercise} (kg)`,
				data: exerciseData[timeframe],
				borderColor: 'rgba(75, 192, 192, 1)',
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				tension: 0.3,
			},
		],
	};

	const muscleGroupProgress = {
		labels,
		datasets: [
			{
				label: `${selectedMuscleGroup} Volume (kg)`,
				data: muscleGroupData[timeframe],
				borderColor: 'rgba(255, 99, 132, 1)',
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				tension: 0.3,
			},
		],
	};

	const handleTimeframeChange = (newTimeframe) => {
		setTimeframe(newTimeframe);
	};

	const handleMuscleGroupChange = (e) => {
		const newMuscleGroup = e.target.value;
		setSelectedMuscleGroup(newMuscleGroup);
		setSelectedExercise(exercisesByMuscleGroup[newMuscleGroup][0]); // Set first exercise for the new muscle group
	};

	return (
		<main className="w-full mx-auto p-4 mb-16">
			<div className="space-y-8 overflow-y-auto max-h-screen">
				{/* Timeframe Filter and Muscle Group / Exercise Selection */}
				<div className="bg-white shadow rounded-lg p-4">
					<div className="flex space-x-4 justify-center">
						<button
							className={`px-4 py-2 rounded ${timeframe === 'Week' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
							onClick={() => handleTimeframeChange('Week')}
						>
							Week
						</button>
						<button
							className={`px-4 py-2 rounded ${timeframe === 'Month' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
							onClick={() => handleTimeframeChange('Month')}
						>
							Month
						</button>
						<button
							className={`px-4 py-2 rounded ${timeframe === 'Year' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
							onClick={() => handleTimeframeChange('Year')}
						>
							Year
						</button>
					</div>

					{/* Muscle Group and Exercise Selection */}
					<div className="flex space-x-4 justify-center mt-4">
						<select
							className="border p-2 rounded"
							value={selectedMuscleGroup}
							onChange={handleMuscleGroupChange}
						>
							{Object.keys(exercisesByMuscleGroup).map((muscleGroup) => (
								<option key={muscleGroup} value={muscleGroup}>
									{muscleGroup}
								</option>
							))}
						</select>
						<select
							className="border p-2 rounded"
							value={selectedExercise}
							onChange={(e) => setSelectedExercise(e.target.value)}
						>
							{exercisesByMuscleGroup[selectedMuscleGroup].map((exercise) => (
								<option key={exercise} value={exercise}>
									{exercise}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Statistics Section: Only displayed when showStatistics is true */}
				<div className="bg-white shadow rounded-lg p-4">
					<h2 className="text-lg font-bold mb-4">Exercise Statistics</h2>
					<div
						className="space-y-4 bg-gray-50 p-2 shadow-inner shadow-[inset_0px_6px_10px_rgba(0,0,0,0.1)]"
					>
						{/* Max Weight */}
						<div className="flex justify-between items-center">
							<span className="text-gray-600">Max Weight Lifted</span>
							<span className="font-semibold text-lg">
                  {selectedExercise === 'Bench Press' ? '100 kg' : '150 kg'}
                </span>
						</div>

						{/* Total Volume */}
						<div className="flex justify-between items-center">
							<span className="text-gray-600">Total Volume (kg)</span>
							<span className="font-semibold text-lg">
                  {selectedExercise === 'Bench Press' ? '5000 kg' : '7500 kg'}
                </span>
						</div>

						{/* Record Reps */}
						<div className="flex justify-between items-center">
							<span className="text-gray-600">Max Reps (per set)</span>
							<span className="font-semibold text-lg">
                  {selectedExercise === 'Bench Press' ? '15 reps' : '12 reps'}
                </span>
						</div>

						{/* Total Sessions */}
						<div className="flex justify-between items-center">
							<span className="text-gray-600">Total Sessions</span>
							<span className="font-semibold text-lg">
                  {selectedMuscleGroup === 'Chest' ? '32 sessions' : '45 sessions'}
                </span>
						</div>

						{/* Average Weekly Progress */}
						<div className="flex justify-between items-center">
							<span className="text-gray-600">Average Weekly Progress</span>
							<span className="font-semibold text-lg">
                  {selectedMuscleGroup === 'Chest' ? '1.2 kg/week' : '1.5 kg/week'}
                </span>
						</div>
					</div>
					{/* Chart Section: Exercise Progress */}
					<div className="bg-white shadow rounded-lg my-6">
						<h2 className="text-lg font-bold">Exercise Progress</h2>
						<Line data={exerciseProgress}/>
					</div>

					{/* Chart Section: Muscle Group Progress */}
					<div className="bg-white shadow rounded-lg my-6">
						<h2 className="text-lg font-bold">Muscle Group Progress</h2>
						<Line data={muscleGroupProgress}/>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Statistics;