import React from 'react';
import PropTypes from 'prop-types';

const ActionButtons = ({onSave, onCancel}) => (
	<div className="flex space-x-6 mt-6 justify-center">
		<button
			onClick={onSave}
			className="bg-green-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
		>
			Save
		</button>
		<button
			onClick={onCancel}
			className="bg-red-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 transition"
		>
			Cancel
		</button>
	</div>
);

ActionButtons.propTypes = {
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default ActionButtons;