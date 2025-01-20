import PropTypes from 'prop-types';
import DeleteButton from "./DeleteButton.jsx";
import MuscleGroupSelection from "./Selection/MuscleGroupSelection.jsx";
import ExerciseSelection from "./Selection/ExerciseSelection.jsx";
import CountSetsInput from "./Selection/CountSetsInput.jsx";
import SetsSelection from "./Selection/SetsSelection.jsx";

const TrainingForm = ({
						  index,
						  training,
						  muscleGroups,
						  handleMuscleGroupChange,
						  handleExerciseChange,
						  handleSetsChange,
						  handleTrainingDetailChange,
						  handleRemoveTraining,
					  }) => (
	<div className="mb-2 border-l-2 border-gray-300 rounded-lg p-2  bg-white relative">
		{/* Крестик для удаления тренировки */}
		<DeleteButton handleRemove={handleRemoveTraining}/>

		<h3 className="p-4 text-sm mb-4 text-gray-700 text-left">Ex. {index + 1}</h3> {/* Сместить текст влево */}

		{/* Muscle Group Selection */}
		<MuscleGroupSelection index={index}
							  training={training}
							  muscleGroups={muscleGroups}
							  handleMuscleGroupChange={handleMuscleGroupChange}/>

		{/* Exercise Selection */}
		<ExerciseSelection index={index}
						   training={training}
						   handleExerciseChange={handleExerciseChange}/>

		{/* Sets Input */}
		<CountSetsInput index={index}
						training={training}
						handleSetsChange={handleSetsChange}/>

		{/* Training Details */}
		<SetsSelection index={index}
					   trainingDetails={training.trainingDetails}
					   handleTrainingDetailChange={handleTrainingDetailChange}/>
	</div>
);

TrainingForm.propTypes = {
	index: PropTypes.number.isRequired,
	training: PropTypes.object.isRequired,
	muscleGroups: PropTypes.array.isRequired,
	handleMuscleGroupChange: PropTypes.func.isRequired,
	handleExerciseChange: PropTypes.func.isRequired,
	handleSetsChange: PropTypes.func.isRequired,
	handleTrainingDetailChange: PropTypes.func.isRequired,
	handleRemoveTraining: PropTypes.func.isRequired, // Новый пропс
};

export default TrainingForm;