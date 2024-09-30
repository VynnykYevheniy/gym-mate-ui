import {Link} from 'react-router-dom'
import EmailField from "../components/EmailField.jsx";

export default function Register() {
	return (
		<>
			<main className="flex flex-col justify-center p-6 pb-12">
				<div className="mx-auto max-w-md">
					<svg className="mx-auto h-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none"
						 viewBox="0 0 24 24" strokeWidth={"1.5"} stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round"
							  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
					</svg>
					<h2 className="mt-2 text-2xl font-bold text-gray-900 sm:mt-6 sm:text-3xl">Create your account</h2>
				</div>
				<div
					className="mx-auto mt-6 w-full max-w-md rounded-xl bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:mt-10 sm:p-10">
					<form action="#" autoComplete="off" className="space-y-6">
						<div>
							<label htmlFor="login" className="block text-sm font-medium text-gray-700">Login</label>
							<div className="relative mt-1 rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
										 fill="none" viewBox="0 0 24 24" strokeWidth={"1.5"} stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round"
											  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
									</svg>
								</div>
								<input type="text" id="login" name="login" required
									   className="w-full rounded-md border-gray-300 pl-10 text-sm focus:border-green-500 focus:ring-green-500"
									   placeholder="Login"/>
							</div>
						</div>

						<EmailField/>
						<div>
							<label htmlFor="password"
								   className="block text-sm font-medium text-gray-700">Password</label>
							<div className="relative mt-1 rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
										 fill="none" viewBox="0 0 24 24" strokeWidth={"1.5"} stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round"
											  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
									</svg>
								</div>
								<input type="password" id="password" name="password" minLength="8"
									   className="w-full rounded-md border-gray-300 pl-10 text-sm focus:border-green-500 focus:ring-green-500"
									   placeholder="Minimum 8 characters"/>
							</div>
						</div>

						<div>
							<label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm
								Password</label>
							<div className="relative mt-1 rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3">
									<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
										 fill="none" viewBox="0 0 24 24" strokeWidth={"1.5"} stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round"
											  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
									</svg>
								</div>
								<input type="password" id="password_confirmation" name="password_confirmation"
									   className="w-full rounded-md border-gray-300 pl-10 text-sm focus:border-green-500 focus:ring-green-500"
									   placeholder="Minimum 8 characters"/>
							</div>
						</div>
						<div>
							<a href="verify-email.html"
							   className="flex items-center justify-center rounded-md bg-green-600 py-2 px-4 font-semibold text-white shadow-lg transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Sign
								Up</a>
						</div>
					</form>

					<div className="mt-6 flex items-center justify-center">

						<Link to={"/signin"}
							  className="text-sm font-medium text-green-600 hover:text-green-500"> Already
							have an account?</Link>
					</div>
				</div>
			</main>
		</>
	)
}