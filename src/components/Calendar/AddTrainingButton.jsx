import PropTypes from 'prop-types';

const AddTrainingButton = ({onClick}) => {
	return (
		<button
			onClick={onClick}
			className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primaryHover focus:outline-none focus:ring-4 focus:ring-primaryHover transition"
		>
			Add Training
		</button>
	);
};

AddTrainingButton.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default AddTrainingButton;
