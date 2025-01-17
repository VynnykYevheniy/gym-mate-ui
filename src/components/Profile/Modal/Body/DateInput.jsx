import PropTypes from 'prop-types';

const DateInput = ({ value, onChange }) => (
	<div className="mb-4">
		<label className="block text-gray-500 mb-2" htmlFor="date">Date</label>
		<input
			id="date"
			type="date"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
		/>
	</div>
);

DateInput.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default DateInput;