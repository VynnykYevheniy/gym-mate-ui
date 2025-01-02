import PropTypes from "prop-types";

const SearchBar = ({searchTerm, onSearchChange, phText}) => {
	return (
		<div className="mb-4">
			<input
				type="text"
				placeholder={phText}
				value={searchTerm}
				onChange={(e) => onSearchChange(e.target.value)} // Обработчик изменения строки поиска
				className="w-full p-2 border border-gray-300 rounded-lg"
			/>
		</div>
	);
};

SearchBar.propsTypes = {
	searchTerm: PropTypes.string.isRequired,
	onSearchChange: PropTypes.func.isRequired,
	phText: PropTypes.string.isRequired
}

export default SearchBar;