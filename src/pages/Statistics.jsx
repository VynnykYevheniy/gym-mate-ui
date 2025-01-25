import {useEffect, useState} from "react";
import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import {fetchMuscleGroups} from "../service/TrainingService.jsx";
import axiosInstance from "../api/AxiosConfig.jsx";
import ApiUrls from "../model/ApiUrls.js";
import TimeframeFilter from "../components/Statistics/TimeframeFilter";
import TabsSection from "../components/Statistics/TabsSection";

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
	const [selectedExercise, setSelectedExercise] = useState(null);
	const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
	const [timeframe, setTimeframe] = useState("MONTH");
	const [activeTab, setActiveTab] = useState("GENERAL");
	const [muscleGroups, setMuscleGroups] = useState([]);
	const [exercises, setExercises] = useState([]);
	const [exerciseData, setExerciseData] = useState([]);
	const [muscleGroupData, setMuscleGroupData] = useState([]);
	const [exercisesDataChart, setExercisesDataChart] = useState([]);
	const [muscleGroupDataChart, setMuscleGroupDataChart] = useState([]);

	useEffect(() => {
		const loadMuscleGroups = async () => {
			try {
				const data = await fetchMuscleGroups();
				setMuscleGroups(data);
			} catch (err) {
				console.error("Failed to fetch muscle groups:", err);
			}
		};
		loadMuscleGroups();
	}, []);

	const fetchExercisesByMuscleGroup = async (muscleGroupId) => {
		try {
			const response = await axiosInstance.get(ApiUrls.EXERCISE.MUSCLE_GROUPS(muscleGroupId));
			setExercises(response.data);
		} catch (error) {
			console.error("Error fetching exercises:", error);
		}
	};

	const fetchStatisticsData = async () => {
		try {
			if (selectedMuscleGroup) {
				// Load Muscle Group data and progress if only Muscle Group is selected
				const muscleGroupDataResponse = await axiosInstance.get(ApiUrls.STATISTICS.MUSCLE_GROUPS_DATA(selectedMuscleGroup));
				setMuscleGroupData(muscleGroupDataResponse.data);

				const muscleGroupProgressResponse = await axiosInstance.get(ApiUrls.STATISTICS.MUSCLE_GROUPS_DATA_CHART(selectedMuscleGroup, timeframe));
				setMuscleGroupDataChart(muscleGroupProgressResponse.data);

				// If Exercise is also selected, load Exercise data and progress
				if (selectedExercise) {
					const exerciseDataResponse = await axiosInstance.get(ApiUrls.STATISTICS.EXERCISE_DATA(selectedExercise));
					setExerciseData(exerciseDataResponse.data);

					const exercisesProgressResponse = await axiosInstance.get(ApiUrls.STATISTICS.EXERCISE_DATA_CHART(selectedExercise, timeframe));
					setExercisesDataChart(exercisesProgressResponse.data);
				}
			}
		} catch (error) {
			console.error("Error fetching statistics data:", error);
		}
	};

	return (
		<main>
			<TimeframeFilter timeframe={timeframe} setTimeframe={setTimeframe}/>
			<TabsSection
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				muscleGroups={muscleGroups}
				selectedMuscleGroup={selectedMuscleGroup}
				exercises={exercises}
				selectedExercise={selectedExercise}
				muscleGroupData={muscleGroupData}
				exercisesData={exerciseData}
				muscleGroupStat={muscleGroupDataChart}
				exerciseStat={exercisesDataChart}
				handleMuscleGroupChange={async (e) => {
					const muscleGroupId = e.target.value;
					setSelectedMuscleGroup(muscleGroupId);
					setSelectedExercise(null);
					await fetchExercisesByMuscleGroup(muscleGroupId);
				}}
				handleExerciseChange={(e) => setSelectedExercise(e.target.value)}
				fetchStatisticsData={fetchStatisticsData}
			/>
		</main>
	);
};

export default Statistics;