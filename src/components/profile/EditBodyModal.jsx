import * as PropTypes from "prop-types";
import {useEffect, useState} from "react";
import * as AnalyticsBodyService from "../../service/AnalyticsBodyService.jsx";

function EditBodyModal({
						   isOpen,
						   onClose,
					   }) {
	// States for new weight, height, and date
	const [newWeight, setNewWeight] = useState(0);
	const [newHeight, setNewHeight] = useState(0);
	const [newDate, setNewDate] = useState(() => new Date().toISOString().split('T')[0]);

	// Fetch current data when the modal is opened
	useEffect(() => {
		const fetchCurrentData = async () => {
			try {
				const currentData = await AnalyticsBodyService.getCurrent();
				if (currentData) {
					setNewWeight(currentData.weight || 0); // Ensure fallback to 0
					setNewHeight(currentData.height || 0); // Ensure fallback to 0
					setNewDate(currentData.date || new Date().toISOString().split('T')[0]);
				}
			} catch (error) {
				console.error('Error fetching current data:', error);
			}
		};

		if (isOpen) {
			fetchCurrentData();
		}
	}, [isOpen]);

	// Перед сохранением данных, преобразуем значение в число
	const handleSave = () => {
		const parsedWeight = parseFloat(newWeight) || 0;  // Ensure it's a number or fallback to 0
		const parsedHeight = parseFloat(newHeight) || 0;  // Ensure it's a number or fallback to 0

		// Create object for saving
		const data = {
			date: newDate,
			weight: parsedWeight,  // Ensure number format
			height: parsedHeight,  // Ensure number format
		};

		// Save the data through the service
		AnalyticsBodyService.save(data);
		onClose();
	};
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 mb-16">
			<div
				className="bg-white rounded-lg p-6 w-11/12 sm:w-1/2 max-h-[90vh] shadow-lg transform transition-all duration-300">
				<h2 className="text-2xl font-semibold text-gray-600 mb-4">Add Data</h2>

				{/* Date Input */}
				<div className="mb-4">
					<label className="block text-gray-500 mb-2" htmlFor="date">Date</label>
					<input
						id="date"
						type="date"
						value={newDate}
						onChange={(e) => setNewDate(e.target.value)}
						className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
					/>
				</div>

				{/* Weight Input */}
				<div className="mb-4">
					<label className="block text-gray-500 mb-2" htmlFor="weight">Weight (kg)</label>
					<input
						id="weight"
						type="number"
						value={newWeight}
						onChange={(e) => setNewWeight(e.target.value)}
						placeholder="Enter the new weight (kg)"
						className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
					/>
				</div>

				{/* Height Input */}
				<div className="mb-4">
					<label className="block text-gray-500 mb-2" htmlFor="height">Height (cm)</label>
					<input
						id="height"
						type="number"
						value={newHeight}
						onChange={(e) => setNewHeight(e.target.value)}
						placeholder="Enter the height (cm)"
						className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
					/>
				</div>

				{/* Save/Cancel Buttons */}
				<div className="flex space-x-6 mt-6 justify-center">
					<button
						onClick={handleSave}
						className="bg-green-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
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
			</div>
		</div>
	);
}

EditBodyModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,        // Pass isOpen as a boolean
	onClose: PropTypes.func.isRequired,       // Function to handle closing the modal
};

export default EditBodyModal;