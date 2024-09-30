// Loader.jsx
import React from 'react';

const Loader = ({ loading }) => {
	return (
		<div className="loader fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 z-50">
			{loading ? (
				<div className="flex flex-col items-center">
					<div className="relative">
						<div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500 animate-ping"></div>
						<div className="relative w-20 h-20 rounded-full border-4 border-blue-300 border-t-transparent animate-spin"></div>
					</div>
					<div className="mt-4 text-xs font-medium text-blue-800">Loading...</div>
				</div>
			) : (
				<div>Your token has been received.</div>
			)}
		</div>
	);
};

export default Loader;