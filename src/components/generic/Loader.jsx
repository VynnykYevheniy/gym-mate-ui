import PropTypes from "prop-types";

const Loader = ({message = "Loading..."}) => {
	return (
		<div
			className="loader fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 z-50"
			aria-live="polite"
		>
			<div className="flex flex-col items-center">
				<div className="relative">
					<div
						className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-primary to-primary animate-ping"
					></div>
					<div
						className="relative w-20 h-20 rounded-full border-4 border-primary border-t-transparent animate-spin"
					></div>
				</div>
				<div className="mt-11 text-xs font-medium text-primary">{message}</div>
			</div>
		</div>
	);
};

Loader.propTypes = {
	message: PropTypes.string, // Сообщение, отображаемое пользователю
};

export default Loader;