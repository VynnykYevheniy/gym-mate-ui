import {FaTimes} from "react-icons/fa";
import PropTypes from "prop-types";

const DeleteButton = ({handleRemove}) => {
	return (
		<button
			onClick={handleRemove}
			className="absolute top-4 right-4 rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" // Увеличиваем размер крестика
			aria-label="Remove Training"
		>
			<FaTimes/>
		</button>
	);
}
DeleteButton.propTypes = {
	handleRemove: PropTypes.func.isRequired,
}
export default DeleteButton;