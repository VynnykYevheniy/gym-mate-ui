const SearchBar = ({ searchTerm, onSearchChange , phText}) => {
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

export default SearchBar;