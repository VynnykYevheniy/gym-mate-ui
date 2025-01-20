import PropTypes from "prop-types";
import {FaPlus} from 'react-icons/fa';

const AddTrainingButton = ({onClick}) => {
	return (
		<button
			onClick={onClick}
			className="fixed bottom-6 mb-12 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primaryHover transition-transform transform hover:scale-105"
			aria-label="Добавить тренировку"
		>
			<FaPlus className="text-2xl"/>
		</button>
	);
};

AddTrainingButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default AddTrainingButton;