import PropTypes from 'prop-types';
import {FaPlus} from 'react-icons/fa';

const ActionButtons = ({onAdd, onSave, onCancel}) => (
	<div className="flex justify-between items-center">
		<button
			onClick={onAdd}
			className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-primaryHover focus:outline-none focus:ring-4 focus:ring-primaryHover transition"
		>
			<FaPlus className="text-2xl font-bold"/>
		</button>

		<div className="flex space-x-4">
			<button
				onClick={onSave}
				className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primaryHover focus:outline-none focus:ring-4 focus:ring-primaryHover transition"
			>
				Save
			</button>
			<button
				onClick={onCancel}
				className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400 transition"
			>
				Cancel
			</button>
		</div>
	</div>
);

ActionButtons.propTypes = {
	onAdd: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default ActionButtons;
