import PropTypes from "prop-types";

const TitleForm = (id) => {
	return (
		<div className="sticky top-0 mb-2">
			<h2 className="text-2xl text-gray-500 mb-2">{id ? 'Correct Training' : 'Add Training'}</h2>
		</div>
	);
}
TitleForm.propTypes = {
	id: PropTypes.number.isRequired,
};
export default TitleForm;