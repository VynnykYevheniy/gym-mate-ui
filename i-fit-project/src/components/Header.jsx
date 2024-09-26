import {Link} from 'react-router-dom'

export default function Header() {
	return (
		<>
			<header className="flex items-center justify-between p-6">
				<Link to={"/"}><a className="flex items-center gap-2">
					<svg className="h-10 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
						 fill="currentColor">
						<path fillRule="evenodd"
							  d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
							  clipRule="evenodd"/>
					</svg>
					<span className="text-xl font-black">Security</span>
				</a>
				</Link>
				<div>
					<ul className="list-none hover:list-none inline">
						<li className='inline m-1'>
							<Link
								className="nav-link scrollto rounded-md bg-green-600 py-2 px-4 font-semibold text-white shadow-lg transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
								to={"/login"}>Sign In</Link>
						</li>
						<li className='inline'>
							<Link
								className="nav-link scrollto rounded-md bg-green-600 py-2 px-4 font-semibold text-white shadow-lg transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
								to={"/register"}>Sign Up</Link>
						</li>
					</ul>
				</div>
			</header>
		</>
	)
}