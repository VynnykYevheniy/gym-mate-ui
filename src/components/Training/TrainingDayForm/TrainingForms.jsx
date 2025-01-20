import TrainingForm from "./TrainingForm/TrainingForm.jsx";
import PropTypes from "prop-types";

const TrainingForms = ({
					   trainings,
					   muscleGroups,
					   handleMuscleGroupChange,
					   handleExerciseChange,
					   handleSetsChange,
					   handleTrainingDetailChange,
					   handleRemoveTraining
				   }) => {
	return (
		<div
			className="flex flex-col mb-4 max-h-[50vh] sm:max-h-[50vh] md:max-h-[50vh] lg:max-h-[50vh] overflow-y-scroll">
			{trainings.map((training, index) => (
				<TrainingForm
					key={index}
					index={index}
					training={training}
					muscleGroups={muscleGroups}
					handleMuscleGroupChange={handleMuscleGroupChange}
					handleExerciseChange={handleExerciseChange}
					handleSetsChange={handleSetsChange}
					handleTrainingDetailChange={handleTrainingDetailChange}
					handleRemoveTraining={handleRemoveTraining}
				/>
			))}
		</div>
	);
};

TrainingForms.propTypes = {
	trainings: PropTypes.arrayOf(PropTypes.object).isRequired,
	muscleGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
	handleMuscleGroupChange: PropTypes.func.isRequired,
	handleExerciseChange: PropTypes.func.isRequired,
	handleSetsChange: PropTypes.func.isRequired,
	handleTrainingDetailChange: PropTypes.func.isRequired,
	handleRemoveTraining: PropTypes.func.isRequired,
};

export default TrainingForms;