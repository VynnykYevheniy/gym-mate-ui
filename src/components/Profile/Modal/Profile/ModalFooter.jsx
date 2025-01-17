import PropTypes from "prop-types";

function ModalFooter({ onSave, onClose, isSaving }) {
	return (
		<div className="flex space-x-6 mt-6 justify-center">
			<button
				onClick={onSave}
				className={`bg-green-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 transition ${
					isSaving ? "opacity-50 cursor-not-allowed" : ""
				}`}
				disabled={isSaving}
			>
				Save
			</button>
			<button
				onClick={onClose}
				className="bg-red-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 transition"
			>
				Cancel
			</button>
		</div>
	);
}

ModalFooter.propTypes = {
	onSave: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	isSaving: PropTypes.bool.isRequired,
};

export default ModalFooter;