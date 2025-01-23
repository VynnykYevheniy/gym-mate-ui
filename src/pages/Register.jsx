import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmailField from "../components/EmailField.jsx";
import { registerRequest } from "../service/AuthService.jsx";
import { useTranslation } from 'react-i18next';
import AuthContext from "../context/AuthProvider.jsx";
import {currentUser} from "../service/UserService.jsx";

export default function Register() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { login: setAuthToken } = useContext(AuthContext);

	const [formData, setFormData] = useState({
		login: '',
		email: '',
		password: '',
		passwordConfirmation: '',
		role: 'CLIENT',
	});
	const [error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		if (formData.password !== formData.passwordConfirmation) {
			setError(t('register.passwordMismatch'));
			return;
		}

		try {
			const response = await registerRequest(
				formData.login,
				formData.email,
				formData.password,
				formData.role
			);
			localStorage.setItem("newUser", "true");
			setAuthToken(response);
			const user = await currentUser();
			localStorage.setItem("user", JSON.stringify(user));
			navigate('/welcome');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<main className="flex flex-col justify-center p-6 pb-12">
			<div className="mx-auto max-w-md">
				<svg className="mx-auto h-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				<h2 className="mt-2 text-2xl font-bold text-secondTextColor sm:mt-6 sm:text-3xl">{t('register.createAccount')}</h2>
			</div>
			<div className="mx-auto mt-6 w-full max-w-md rounded-xl bg-white p-6 shadow-xl backdrop-blur-xl sm:mt-10 sm:p-10">
				<form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
					{[
						{
							id: 'login',
							label: t('register.login'),
							type: 'text',
							value: formData.login,
						},
						{
							id: 'password',
							label: t('register.password'),
							type: 'password',
							value: formData.password,
						},
						{
							id: 'passwordConfirmation',
							label: t('register.confirmPassword'),
							type: 'password',
							value: formData.passwordConfirmation,
						},
					].map(({ id, label, type, value }) => (
						<div key={id}>
							<label htmlFor={id} className="block text-sm font-medium text-secondTextColor">{label}</label>
							<div className="relative mt-1 rounded-md shadow-sm">
								<input
									id={id}
									name={id}
									type={type}
									required
									value={value}
									onChange={handleChange}
									className="w-full rounded-md border-gray-300 pl-10 text-sm focus:border-primaryHover focus:ring-primaryHover"
								/>
							</div>
						</div>
					))}

					<EmailField value={formData.email} onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))} />

					<div>
						<label className="block text-sm font-medium text-secondTextColor">{t('register.role.role')}</label>
						<div className="mt-2 space-x-4">
							{[
								{ value: 'TRAINER', label: t('register.role.trainer') },
								{ value: 'CLIENT', label: t('register.role.client') },
							].map(({ value, label }) => (
								<label key={value} className="inline-flex items-center">
									<input
										type="radio"
										className="form-radio"
										name="role"
										value={value}
										checked={formData.role === value}
										onChange={handleChange}
									/>
									<span className="ml-2">{label}</span>
								</label>
							))}
						</div>
					</div>

					{error && <p className="text-red-500 text-sm">{error}</p>}

					<div>
						<button
							type="submit"
							className="w-full rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primaryHover focus:ring-offset-2"
						>
							{t('register.signUp')}
						</button>
					</div>
				</form>
				<p className="mt-6 text-center text-sm text-secondTextColor">
					{t('register.alreadyHaveAccount')}{' '}
					<Link to="/signin" className="font-medium text-primary hover:text-primaryHover">
						{t('register.signIn')}
					</Link>
				</p>
			</div>
		</main>
	);
}
