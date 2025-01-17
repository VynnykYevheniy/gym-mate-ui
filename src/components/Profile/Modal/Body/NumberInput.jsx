import PropTypes from 'prop-types';

const NumberInput = ({ id, value, onChange, placeholder }) => (
	<div className="mb-4">
		<label className="block text-gray-500 mb-2" htmlFor={id}>{placeholder}</label>
		<input
			id={id}
			type="number"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
		/>
	</div>
);

NumberInput.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
};

export default NumberInput;