import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import Loader from '../components/Loader';
import WelcomeBackSvg from '../assets/welcome_back.svg';
import LoginSvg from '../assets/login.svg';
import PasswordSvg from '../assets/password.svg';
import ErrorSvg from '../assets/error.svg';
import {loginRequest} from "../service/AuthService.jsx";
import {useTranslation} from 'react-i18next'; // Импортируйте хук useTranslation

export default function Login() {
	const {t} = useTranslation(); // Используйте хук для получения функции перевода
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleInputChange = (setter) => (e) => setter(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const token = await loginRequest(login, password, navigate);
			if (!token) {
				setError(t('invalid_credentials')); // Используйте перевод для ошибки
			}
		} catch (error) {
			setError(t('invalid_credentials')); // Используйте перевод для ошибки
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const renderError = () => (
		error && (
			<div className="flex gap-3 rounded-md border border-red-500 bg-red-50 p-4">
				<img src={ErrorSvg} alt="Error Icon" className="h-5 w-5 text-red-400"/>
				<h3 className="text-sm font-medium text-red-800">{error}</h3>
			</div>
		)
	);

	return (
		<>
			{loading ? (
				<Loader/>
			) : (
				<main className="flex flex-col justify-center p-6 pb-12">
					<div className="mx-auto max-w-md">
						<img src={WelcomeBackSvg} alt="Welcome Back" className="mx-auto h-12 text-green-600"/>
						<h2 className="mt-2 text-2xl font-bold text-gray-900 sm:mt-6 sm:text-3xl">{t('auth.welcomeBack')}</h2>
					</div>
					<div
						className="mx-auto mt-6 w-full max-w-md rounded-xl bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:mt-10 sm:p-10">
						{renderError()}
						<form onSubmit={handleSubmit} autoComplete="off" className="mt-6 space-y-6">
							<div>
								<label htmlFor="login"
									   className="block text-md font-medium text-gray-700">{t('auth.login')}</label>
								<div className="relative mt-1 rounded-md shadow-sm">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3">
										<img src={LoginSvg} alt="Login Icon" className="h-5 w-5 text-gray-400"/>
									</div>
									<input
										type="text"
										id="login"
										name="login"
										className="w-full rounded-md border-gray-200 pl-10 text-md focus:border-green-500 focus:ring-green-500"
										placeholder={t('auth.login')}
										value={login}
										onChange={handleInputChange(setLogin)}
									/>
								</div>
							</div>

							<div>
								<label htmlFor="password"
									   className="block text-md font-medium text-gray-700">{t('auth.password')}</label>
								<div className="relative mt-1 rounded-md shadow-sm">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3">
										<img src={PasswordSvg} alt="Password Icon" className="h-5 w-5 text-gray-400"/>
									</div>
									<input
										type="password"
										id="password"
										name="password"
										className="w-full rounded-md border-gray-200 pl-10 text-md focus:border-green-500 focus:ring-green-500"
										placeholder={t('auth.password')}
										value={password}
										onChange={handleInputChange(setPassword)}
									/>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<input
										type="checkbox"
										id="remember"
										name="remember"
										className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
									/>
									<label htmlFor="remember"
										   className="text-sm text-gray-900">{t('auth.rememberMe')}</label>
								</div>
								<a href="forgot-password.html"
								   className="text-sm font-medium text-green-500 hover:text-green-600 underline">
									{t('auth.forgotPassword')}
								</a>
							</div>

							<div>
								<button
									type="submit"
									className="w-full rounded-md border border-transparent bg-green-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
								>
									{t('auth.signIn')}
								</button>
							</div>
						</form>
					</div>
				</main>
			)}
		</>
	);
}