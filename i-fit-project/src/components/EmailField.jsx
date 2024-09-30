import React, { useState } from 'react';

const EmailField = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (e.target.value && !emailRegex.test(e.target.value)) {
			setError('Please enter a valid email address.');
		} else {
			setError('');
		}
	};

	return (
		<div>
			<label htmlFor="email" className="block text-sm font-medium text-gray-700">
				Email (optional)
			</label>
			<div className="relative mt-1 rounded-md shadow-sm">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3">
					<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
						 viewBox="0 0 24 24" strokeWidth={"1.5"} stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round"
							  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
					</svg>
				</div>
				<input
					type="email"
					id="email"
					name="email"
					value={email}
					onChange={handleEmailChange}
					className={`w-full rounded-md pl-10 pr-10 text-sm ${error ? 'border-red-300 text-red-900 placeholder-red-300' : 'border-gray-300 text-gray-900 placeholder-gray-300'} focus:ring-500`}
					placeholder="arnold@schwarzenegger.com (optional)"
				/>
				<div className="absolute inset-y-0 right-0 flex items-center pr-3">
					<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
						 viewBox="0 0 24 24" fill="currentColor">
						<path fillRule="evenodd"
							  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
							  clipRule="evenodd"
							  className={error ? "text-red-500" : "text-gray-400"} // Меняем цвет в зависимости от ошибки
						/>
					</svg>
				</div>
			</div>
			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
		</div>
	);
};

export default EmailField;