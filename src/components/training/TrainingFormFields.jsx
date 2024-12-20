import PropTypes from 'prop-types';
import { FaRedo, FaWeightHanging, FaTimes } from 'react-icons/fa'; // Импортируем иконки для веса, повторений и крестика

const TrainingFormFields = ({
								index,
								training,
								muscleGroups,
								handleMuscleGroupChange,
								handleExerciseChange,
								handleSetsChange,
								handleTrainingDetailChange,
								handleRemoveTraining, // Добавленный пропс
							}) => (
	<div className="mb-2 border-l-2 border-gray-300 rounded-lg p-2  bg-white relative">
		{/* Крестик для удаления тренировки */}
		<button
			onClick={() => handleRemoveTraining(index)}
			className="absolute top-4 right-4 rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" // Увеличиваем размер крестика
			aria-label="Remove Training"
		>
			<FaTimes />
		</button>

		<h3 className="p-4 text-sm mb-4 text-gray-700 text-left">Ex. {index + 1}</h3> {/* Сместить текст влево */}

		{/* Muscle Group Selection */}
		<div className="mb-4 flex items-center">
			<label htmlFor={`muscleGroup-${index}`} className="block w-1/4 mb-2 text-sm text-gray-500">Muscle Group</label>
			<select
				id={`muscleGroup-${index}`}
				value={training.muscleGroup?.id || training.exercise?.muscleGroup?.id || ''}
				onChange={(e) => handleMuscleGroupChange(index, e.target.value)}
				className="w-3/4 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
			>
				<option value="" disabled selected>Select a muscle group</option>
				{muscleGroups.map((group) => (
					<option key={group.id} value={group.id}>
						{group.name}
					</option>
				))}
			</select>
		</div>

		{/* Exercise Selection */}
		<div className="mb-4 flex items-center">
			<label htmlFor={`exercise-${index}`} className="block w-1/4 mb-2 text-sm text-gray-500">Exercise</label>
			<select
				id={`exercise-${index}`}
				value={training.exercises ? (training.exercise?.id || '') : (training.exercise?.id || '')}
				onChange={(e) => handleExerciseChange(index, e.target.value)}
				className="w-3/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
			>
				<option value="" disabled selected>Select an exercise</option>
				{training.exercises?.map((exercise) => (
					<option key={exercise.id} value={exercise.id}>
						{exercise.name}
					</option>
				))}
				{!training.exercises && training.exercise && (
					<option key={training.exercise.id} value={training.exercise.id}>
						{training.exercise.name}
					</option>
				)}
			</select>
		</div>

		{/* Sets Input */}
		<div className="mb-4 flex items-center">
			<label htmlFor={`sets-${index}`} className="block w-1/4 mb-2 text-sm font-medium text-gray-500">Sets</label>
			<input
				type="number"
				id={`sets-${index}`}
				min="1"
				max="4"
				placeholder="Number of sets (e.g., 4)"
				value={training.trainingDetails.length ? training.trainingDetails.length : ''}
				onChange={(e) => handleSetsChange(index, e.target.value)}
				className="w-3/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
			/>
		</div>

		{/* Training Details */}
		{training.trainingDetails.map((setDetail, setIndex) => (
			<div key={setIndex} className="mb-4 flex items-center space-x-4">
				<span className="text-gray-400 w-1/8 p-3 ">{setIndex + 1}</span>

				{/* Weight Input */}
				<div className="relative w-1/2">
					<label className="sr-only" htmlFor={`weight-${index}-${setIndex}`}>Weight</label>
					<FaWeightHanging className="absolute left-3 top-4 text-gray-500" />
					<input
						type="number"
						id={`weight-${index}-${setIndex}`}
						className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
						placeholder="kg"
						value={setDetail.weight || ''}
						onChange={(e) => handleTrainingDetailChange(index, setIndex, 'weight', e.target.value)}
					/>
				</div>

				{/* Repetitions Input */}
				<div className="relative w-1/2">
					<label className="sr-only" htmlFor={`reps-${index}-${setIndex}`}>Reps</label>
					<FaRedo className="absolute left-3 top-4 text-gray-500" />
					<input
						type="number"
						id={`reps-${index}-${setIndex}`}
						className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
						placeholder="reps"
						value={setDetail.repetition || ''}
						onChange={(e) => handleTrainingDetailChange(index, setIndex, 'repetition', e.target.value)}
					/>
				</div>
			</div>
		))}
	</div>
);

TrainingFormFields.propTypes = {
	index: PropTypes.number.isRequired,
	training: PropTypes.object.isRequired,
	muscleGroups: PropTypes.array.isRequired,
	handleMuscleGroupChange: PropTypes.func.isRequired,
	handleExerciseChange: PropTypes.func.isRequired,
	handleSetsChange: PropTypes.func.isRequired,
	handleTrainingDetailChange: PropTypes.func.isRequired,
	handleRemoveTraining: PropTypes.func.isRequired, // Новый пропс
};

export default TrainingFormFields;