import {useState} from 'react';
import ErrorSvg from '../assets/error.svg';

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
					{error && (
						<img src={ErrorSvg} className="text-red-500 h-5 w-5" alt="Error icon"/>
					)}
				</div>
			</div>
			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
		</div>
	);
};

export default EmailField;