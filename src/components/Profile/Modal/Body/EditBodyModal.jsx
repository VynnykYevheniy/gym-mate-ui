import PropTypes from 'prop-types';
import DateInput from './DateInput';
import NumberInput from './NumberInput';
import ActionButtons from './ActionButtons';
import {useEffect, useState} from "react";
import * as AnalyticsBodyService from "../../../../service/AnalyticsBodyService.jsx";

function EditBodyModal({isOpen, onClose}) {
	const [newWeight, setNewWeight] = useState(0);
	const [newHeight, setNewHeight] = useState(0);
	const [newDate, setNewDate] = useState(() => new Date().toISOString().split('T')[0]);

	useEffect(() => {
		const fetchCurrentData = async () => {
			try {
				const currentData = await AnalyticsBodyService.getCurrent();
				if (currentData) {
					setNewWeight(currentData.weight || 0);
					setNewHeight(currentData.height || 0);
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

	const handleSave = () => {
		const parsedWeight = parseFloat(newWeight) || 0;
		const parsedHeight = parseFloat(newHeight) || 0;

		const data = {
			date: newDate,
			weight: parsedWeight,
			height: parsedHeight,
		};

		AnalyticsBodyService.save(data);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 mb-16">
			<div
				className="bg-white rounded-lg p-6 w-11/12 sm:w-1/2 max-h-[90vh] shadow-lg transform transition-all duration-300">
				<h2 className="text-2xl font-semibold text-gray-600 mb-4">Add Data</h2>

				<DateInput value={newDate} onChange={setNewDate}/>
				<NumberInput
					id="weight"
					value={newWeight}
					onChange={setNewWeight}
					placeholder="Enter the new weight (kg)"
				/>
				<NumberInput
					id="height"
					value={newHeight}
					onChange={setNewHeight}
					placeholder="Enter the height (cm)"
				/>

				<ActionButtons onSave={handleSave} onCancel={onClose}/>
			</div>
		</div>
	);
}

EditBodyModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default EditBodyModal;