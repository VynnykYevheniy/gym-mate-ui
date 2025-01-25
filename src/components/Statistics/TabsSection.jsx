import WorkoutStatistics from "../Statistics/WorkoutStatistics.jsx";
import ExerciseStatistics from "../Statistics/ExerciseStatistics.jsx";
import PropTypes from "prop-types";
import TabNav from "./TabNav.jsx";
import MuscleGroupSelection from "./MuscleGroupSelection.jsx";
import MuscleGroupAndExerciseSelection from "./MuscleGroupAndExerciseSelection.jsx";

const TabsSection = ({
						 activeTab,
						 setActiveTab,
						 muscleGroupData,
						 exercisesData,
						 muscleGroupStat,
						 exerciseStat,
						 muscleGroups,
						 exercises,
						 selectedMuscleGroup,
						 selectedExercise,
						 handleMuscleGroupChange,
						 handleExerciseChange,
						 fetchStatisticsData,
					 }) => {
	return (
		<>
			<TabNav activeTab={activeTab} setActiveTab={setActiveTab}/>
			{activeTab === 'MUSCLE' && (
				<>
					<MuscleGroupSelection muscleGroups={muscleGroups}
										  selectedMuscleGroup={selectedMuscleGroup}
										  handleMuscleGroupChange={handleMuscleGroupChange}
										  fetchStatisticsData={fetchStatisticsData}/>
					<WorkoutStatistics muscleGroupData={muscleGroupData}/>
					{/*<ChartSection title={"Muscle Group Progress"} data={muscleGroupData}/>*/}
				</>
			)}
				{activeTab === 'EXERCISE' && (
					<>
						<MuscleGroupAndExerciseSelection muscleGroups={muscleGroups}
														 selectedMuscleGroup={selectedMuscleGroup}
														 handleMuscleGroupChange={handleMuscleGroupChange}
														 exercises={exercises}
														 selectedExercise={selectedExercise}
														 handleExerciseChange={handleExerciseChange}
														 fetchStatisticsData={fetchStatisticsData}/>
						<ExerciseStatistics exerciseStats={exercisesData}/>
						{/*<ChartSection title={"Exercise Progress"} data={exercisesData}/>*/}
					</>
				)}
		</>
	);
};

TabsSection.propTypes = {
	activeTab: PropTypes.string,
	setActiveTab: PropTypes.func.isRequired,
	muscleGroupData: PropTypes.object.isRequired,
	exercisesData: PropTypes.object.isRequired,
	muscleGroupStat: PropTypes.array.isRequired,
	exerciseStat: PropTypes.array.isRequired,
	muscleGroups: PropTypes.array.isRequired,
	exercises: PropTypes.array.isRequired,
	selectedMuscleGroup: PropTypes.any,
	selectedExercise: PropTypes.any,
	handleMuscleGroupChange: PropTypes.func.isRequired,
	handleExerciseChange: PropTypes.func.isRequired,
	fetchStatisticsData: PropTypes.func.isRequired,
};

export default TabsSection;