import {useEffect, useState} from 'react';
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
import TimeframeSelector from "../components/statistics/TimeframeSelector.jsx";
import MuscleGroupSelector from "../components/statistics/MuscleGroupSelector.jsx";
import ChartSection from "../components/statistics/ChartSection.jsx";
import StatisticsDetails from "../components/statistics/StatisticsDetails.jsx";
import {fetchExercisesByMuscleGroup, fetchMuscleGroups} from "../service/TrainingService.jsx";

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
	const [selectedExercise, setSelectedExercise] = useState('');
	const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
	const [timeframeMuscle, setTimeframeMuscle] = useState('Month');
	const [timeframeExercise, setTimeframeExercise] = useState('Month');
	const [activeTab, setActiveTab] = useState('muscle');

	const [exercisesByMuscleGroup, setExercisesByMuscleGroup] = useState({
		name: []
	});

	useEffect(() => {
		const loadMuscleGroups = async () => {
			try {
				const muscleGroups = await fetchMuscleGroups();
				setSelectedMuscleGroup(muscleGroups[1].name)
				const updatedExercisesByMuscleGroup = {};  // создаем новый объект для обновлений

				for (const muscleGroup of muscleGroups) {
					const exercises = await fetchExercisesByMuscleGroup(muscleGroup.id);
					updatedExercisesByMuscleGroup[muscleGroup.name] = exercises.map(exercise => exercise.name);
				}

				setExercisesByMuscleGroup(updatedExercisesByMuscleGroup);  // обновляем состояние один раз
			} catch (err) {
				console.error(err);
			}
		};

		loadMuscleGroups();
	}, []);


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

	const labelsMuscle = labelsByTimeframe[timeframeMuscle];
	const labelsExercise = labelsByTimeframe[timeframeExercise];

	const exerciseProgress = {
		labels: labelsExercise,
		datasets: [
			{
				label: `${selectedExercise} (kg)`,
				data: exerciseData[timeframeExercise],
				borderColor: 'rgba(75, 192, 192, 1)',
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				tension: 0.3,
			},
		],
	};

	const muscleGroupProgress = {
		labels: labelsMuscle,
		datasets: [
			{
				label: `${selectedMuscleGroup} Volume (kg)`,
				data: muscleGroupData[timeframeMuscle],
				borderColor: 'rgba(255, 99, 132, 1)',
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				tension: 0.3,
			},
		],
	};

	const handleTimeframeChangeMuscle = (newTimeframe) => {
		setTimeframeMuscle(newTimeframe);
	};

	const handleTimeframeChangeExercise = (newTimeframe) => {
		setTimeframeExercise(newTimeframe);
	};

	const handleMuscleGroupChange = (newMuscleGroup) => {
		setSelectedMuscleGroup(newMuscleGroup);
		setSelectedExercise(exercisesByMuscleGroup[newMuscleGroup][0]);
	};

	return (
		<main className="w-full mx-auto p-4 mb-16">
			<div className="space-y-8 overflow-y-auto max-h-screen">
				{/* Controls Section */}
				<div className="bg-white shadow rounded-lg p-4 space-y-4">
					{/* Muscle Group Selector */}
					<MuscleGroupSelector
						muscleGroups={exercisesByMuscleGroup}
						selectedMuscleGroup={selectedMuscleGroup}
						selectedExercise={selectedExercise}
						onMuscleGroupChange={handleMuscleGroupChange}
						onExerciseChange={setSelectedExercise}
					/>
				</div>

				{/* Tabs Section */}
				<div className="bg-white shadow rounded-lg">
					<div className="flex border-b border-gray-300">
						<button
							className={`flex-1 p-2 text-center ${activeTab === 'muscle' ? 'bg-green-400 text-white font-semibold rounded-t-lg' : 'bg-gray-100 text-gray-600'}`}
							onClick={() => setActiveTab('muscle')}
						>
							Muscle Group
						</button>
						<button
							className={`flex-1 p-2 text-center ${activeTab === 'exercise' ? 'bg-green-400 text-white font-semibold rounded-t-lg' : 'bg-gray-100 text-gray-600'}`}
							onClick={() => setActiveTab('exercise')}
						>
							Exercise
						</button>
					</div>
					<div className="p-4">
					</div>
					{activeTab === 'muscle' ? (
						<>
							<TimeframeSelector
								timeframe={timeframeMuscle}
								onTimeframeChange={handleTimeframeChangeMuscle}
							/>
							<ChartSection title="Muscle Group Progress" data={muscleGroupProgress}/>
						</>
					) : (
						<>
							<TimeframeSelector
								timeframe={timeframeExercise}
								onTimeframeChange={handleTimeframeChangeExercise}
							/>
							<ChartSection title="Exercise Progress" data={exerciseProgress}/>
						</>
					)}
				</div>
			</div>

			{/* Details Section */
			}
			<div className="bg-white shadow rounded-lg p-4">
				<h2 className="text-lg font-bold mb-4">Details</h2>
				<StatisticsDetails
					details={[
						{label: 'Max Weight Lifted', value: '100 kg'},
						{label: 'Total Volume', value: '5000 kg'},
						{label: 'Sessions', value: '30'},
					]}
				/>
			</div>
		</main>
	);
};

export default Statistics;