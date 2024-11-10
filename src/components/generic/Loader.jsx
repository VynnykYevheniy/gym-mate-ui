const Loader = () => {
	return (
		<div className="loader fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 z-50">
			<div className="flex flex-col items-center">
				<div className="relative">
					<div
						className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500 animate-ping"></div>
					<div
						className="relative w-20 h-20 rounded-full border-4 border-blue-300 border-t-transparent animate-spin"></div>
				</div>
				<div className="mt-11 text-xs font-medium text-blue-800">Loading...</div>
			</div>
		</div>
	);
};

export default Loader;