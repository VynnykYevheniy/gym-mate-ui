import {useNavigate} from "react-router-dom";

import {useState} from 'react';
import ApiUrls from "../model/ApiUrls.js";
import Loader from '../components/Loader'; // Предполагаем, что компонент Loader уже существует
import WelcomeBackSvg from '../assets/welcome_back.svg'
import LoginSvg from '../assets/login.svg'
import PasswordSvg from '../assets/password.svg'
import ErrorSvg from '../assets/error.svg'

export default function Login() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false); // Состояние для лоадера
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true); // Включаем лоадер при отправке запроса

		const requestBody = {
			login: login,
			password: password,
		};

		try {
			const response = await fetch(ApiUrls.AUTH.SIGN_IN, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}
			const token = await response.json();
			// Редирект если токен корректно получен
			if (token && token.accessToken && token.expiresIn && token.refreshToken && token.refreshExpiresIn) {
				// Сохраняем токены в localStorage
				localStorage.setItem('token', JSON.stringify(token));
				navigate('/');
			}
		} catch (error) {
			setError('Invalid credentials, please try again.');
			console.log(error);
		} finally {
			setLoading(false); // Отключаем лоадер после завершения запроса
		}
	};

	return (
		<>
			{
				loading ?
					(<Loader/>)
					: (
						<main className="flex flex-col justify-center p-6 pb-12">
							<div className="mx-auto max-w-md">
								<img src={WelcomeBackSvg} alt="Icon" className="mx-auto h-12 text-green-600"/>
								<h2 className="mt-2 text-2xl font-bold text-gray-900 sm:mt-6 sm:text-3xl">Welcome back!</h2>
							</div>
							<div
								className="mx-auto mt-6 w-full max-w-md rounded-xl bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:mt-10 sm:p-10">
								{error && (
									<div className="flex gap-3 rounded-md border border-red-500 bg-red-50 p-4">
										<img src={ErrorSvg} alt="Icon" className="h-5 w-5 text-red-400"/>
										<h3 className="text-sm font-medium text-red-800">{error}</h3>
									</div>
								)}
								<form onSubmit={handleSubmit} autoComplete="off" className="mt-6 space-y-6">
									<div>
										<label htmlFor="login" className="block text-md font-medium text-gray-700">
											Login
										</label>
										<div className="relative mt-1 rounded-md shadow-sm">
											<div className="absolute inset-y-0 left-0 flex items-center pl-3">
												<img src={LoginSvg} className="h-5 w-5 text-gray-400"/>
											</div>
											<input
												type="text"
												id="login"
												name="login"
												className="w-full rounded-md border-gray-200 pl-10 text-md focus:border-green-500 focus:ring-green-500"
												placeholder="Login"
												value={login}
												onChange={(e) => setLogin(e.target.value)}
											/>
										</div>
									</div>

									<div>
										<label htmlFor="password" className="block text-md font-medium text-gray-700">
											Password
										</label>
										<div className="relative mt-1 rounded-md shadow-sm">
											<div className="absolute inset-y-0 left-0 flex items-center pl-3">
												<img src={PasswordSvg} className="h-5 w-5 text-gray-400"/>
											</div>
											<input
												type="password"
												id="password"
												name="password"
												className="w-full rounded-md border-gray-200 pl-10 text-md focus:border-green-500 focus:ring-green-500"
												placeholder="Password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
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
											<label htmlFor="remember" className="text-sm text-gray-900">
												Remember me
											</label>
										</div>
										<a href="forgot-password.html"
										   className="text-sm font-medium text-green-500 hover:text-green-600 underline">
											Forgot your password?
										</a>
									</div>

									<div>
										<button
											type="submit"
											className="w-full rounded-md border border-transparent bg-green-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
										>
											Sign in
										</button>
									</div>
								</form>
							</div>
						</main>
					)
			}
		</>
	);
}