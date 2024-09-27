"use client";
import { useEffect, useState } from 'react';
import { useToken } from '../context/TokenContext.jsx';
import User from "../model/User.js";

const Home = () => {
		const token = useToken();
		const [user, setUser] = useState(null);

		useEffect(() => {
			const fetchUserData = async () => {
				try {
					const response = await fetch('https://gym-manager-co9r.onrender.com/api/user/current', {
						method: 'POST',
						headers: {
							'Authorization': `Bearer ${token.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(userData),
					});

					if (response.ok) {
						const data = await response.json();
						// Создаем объект User и сохраняем его в состоянии
						const user = new User(data.id, data.name, data.refreshToken, data.refreshExpiresIn);
						setUser(user);
					} else {
						console.error('Ошибка:', response.statusText);
					}
				} catch (error) {
					console.error('Ошибка:', error);
				}
			};

			fetchUserData();
		}, [token])

return (
	<>
		<div
			className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
			<div className="rounded-t-lg h-32 overflow-hidden">
				<img className="object-cover object-top w-full"
					 src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
					 alt='Mountain'/>
			</div>
			<div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
				<img className="object-cover object-center h-32"
					 src='https://www.seekpng.com/png/detail/202-2024774_my-profile-comments-my-profile-icon-png.png'
					 alt='Woman looking front'/>
			</div>
			<div className="text-center mt-2">
				<h2 className="font-semibold">{user.name}</h2>
				<p className="text-gray-500">Telegram: {user.login}</p>
			</div>
			<ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
				<li className="flex flex-col items-center justify-around">
					<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000">
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path fill="#000000"
								  d="M211.832 39.06c-15.022 15.31-15.894 22.83-23.473 43.903 2.69 9.14 5.154 16.927 9.148 25.117 5.158.283 10.765.47 15.342.43-6.11-10.208-8.276-19.32-4.733-35.274 4.3 19.05 12.847 29.993 21.203 34.332 3.032-.334 5.957-.714 8.776-1.146-6.255-10.337-8.494-19.47-4.914-35.588 3.897 17.27 11.287 27.876 18.86 32.94 4.658-1.043 9.283-2.243 13.927-3.534-5.517-9.69-7.36-18.692-3.97-33.957 3.357 14.876 9.307 24.81 15.732 30.516 5.095-1.57 9.296-2.898 13.852-4.347-.685-5.782-.416-12.187 1.064-19.115l1.883-8.8 17.603 3.76-1.88 8.804c-3.636 17.008 1.324 24.42 7.306 28.666 5.98 4.244 14.69 3.46 16.03 2.6l7.576-4.86 9.72 15.15c-3.857 2.34-7.9 5.44-11.822 7.06 18.65 27.678 32.183 61.465 24.756 93.55-2.365 9.474-6.03 18.243-11.715 24.986 12.725 12.13 21.215 22.026 31.032 34.5-3.713-2.387-7.586-4.844-11.692-7.37-11.397-7.01-23.832-14.214-34.98-19.802-16.012-7.8-31.367-18.205-47.73-20.523-22.552-2.967-46.27 4.797-73.32 21.06 7.872 8.72 13.282 15.474 20.312 24.288-6.98-4.338-14.652-9.07-23.16-14.23-32.554-17.48-65.39-48.227-100.438-49.99-30.56-1.092-59.952 14.955-89.677 38.568L18 254.293V494h31.963c45.184-17.437 80.287-57.654 97.03-94.52l.25-.564.325-.52c9.463-15.252 11.148-29.688 16.79-44.732 5.645-15.044 16.907-29.718 41.884-38.756 4.353-2.16 5.07-1.415 8.633 1.395 30.468 24.01 57.29 32.02 83.24 32.35 32.61-1.557 58.442-9.882 85.682-19.38-3.966 3.528-8.77 7.21-13.986 10.762-15.323 10.436-34.217 19.928-46.304 24.8-14.716 2.006-28.36 2.416-41.967.616-9.96 12.09-25.574 20.358-37.35 26.673 63.92 14.023 115.88.91 167.386-22.896-9.522-1.817-19.008-3.692-27.994-5.42 31.634-4.422 64.984-3.766 94.705-3.53 4.084-.02 7.213-.453 8.7-.886 14.167-51.072-4.095-97.893-34.294-145.216-30.263-47.425-72.18-94.107-101.896-143.04-21.1-17.257-48.6-31.455-77.522-46.175-20.386 4.25-41.026 9.336-61.443 14.1zm85.385 70.49c-11.678 3.6-23.71 7.425-33.852 10.012 2.527 4.93 3.735 10.664 3.395 16.202 11.028.877 21.082-2.018 28.965-6.356 4.845-2.666 8.74-6.048 11.414-8.96-3.854-2.735-7.26-6.41-9.923-10.9zm-54.213 14.698c-11.76 1.143-24.59 2.362-35.06 2.236 2.39 4.772 3.78 12.067 8.51 14.84 11.18 1.164 20.6 1.997 29.91-1.746 5.435-3.214 1.818-15.058-3.36-15.33zm-34.98 209.332c-17.593 7.233-22.586 15.14-26.813 26.406-3.998 10.66-6.227 25.076-14.48 41.014 32.29-6.38 69.625-21.23 93.852-40.088-17.017-5.098-34.553-13.852-52.557-27.332zm9.318 71.385c-18.723 7.237-40.836 16.144-59.696 14.062C143.774 446.68 124.012 474.03 91.762 494h84.68c21.564-29.798 38.067-56.575 40.9-89.035z"></path>
						</g>
					</svg>


					<div>131</div>
				</li>
				<li className="flex flex-col items-center justify-between">
					<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path fillRule="evenodd" clipRule="evenodd"
								  d="M11.7839 40L36.216 40C37.2775 40 38.1541 39.1708 38.213 38.1109L39.7685 10.1109C39.8322 8.96454 38.9198 8 37.7716 8L10.2284 8C9.08021 8 8.16778 8.96454 8.23146 10.1109L9.78702 38.1109C9.8459 39.1708 10.7225 40 11.7839 40ZM36.216 42C38.339 42 40.0921 40.3415 40.2099 38.2219L41.7654 10.2219C41.8928 7.92908 40.0679 6 37.7716 6L10.2284 6C7.93204 6 6.10717 7.92907 6.23455 10.2219L7.7901 38.2219C7.90786 40.3415 9.661 42 11.7839 42L36.216 42Z"
								  fill="#333333"></path>
							<path fillRule="evenodd" clipRule="evenodd"
								  d="M34.1955 17.4057C33.1476 16.2921 31.9212 15.3544 30.5625 14.6334C28.611 13.5977 26.442 13.0387 24.2329 13.0019C22.0239 12.9652 19.8375 13.4518 17.8526 14.4219C16.4707 15.0973 15.2137 15.9937 14.1293 17.0718L18.7665 20.5603C18.7816 20.5652 18.8205 20.5727 18.8976 20.5657C19.0544 20.5516 19.2744 20.4796 19.4875 20.3354C19.799 20.1244 20.1259 19.935 20.4658 19.7688C21.607 19.2111 22.8639 18.9314 24.1339 18.9525C25.4039 18.9736 26.6509 19.295 27.7728 19.8904C28.1071 20.0678 28.4274 20.268 28.7318 20.4892C28.9399 20.6405 29.1574 20.7198 29.3137 20.739C29.3905 20.7485 29.4297 20.7423 29.4448 20.7379L34.1955 17.4057ZM29.4525 20.7347C29.4527 20.7349 29.4506 20.7362 29.4455 20.7377C29.4498 20.7352 29.4523 20.7344 29.4525 20.7347ZM18.759 20.5567C18.7592 20.5565 18.7617 20.5574 18.766 20.5601C18.7609 20.5583 18.7587 20.557 18.759 20.5567ZM35.8512 16.2506C36.5933 17.0688 36.3659 18.3263 35.4616 18.9606L30.5893 22.3781C29.685 23.0124 28.4495 22.7564 27.556 22.1071C27.3273 21.9408 27.0865 21.7904 26.8353 21.6571C25.9921 21.2096 25.055 20.9681 24.1006 20.9522C23.1462 20.9363 22.2016 21.1466 21.344 21.5657C21.0885 21.6906 20.8429 21.8329 20.6088 21.9915C19.6942 22.6108 18.4508 22.8255 17.5682 22.1615L12.8123 18.5837C11.9296 17.9197 11.7441 16.6553 12.513 15.8623C13.7981 14.5369 15.3066 13.4401 16.9744 12.625C19.2429 11.5163 21.7416 10.9602 24.2662 11.0022C26.7908 11.0442 29.2697 11.6831 31.5 12.8667C33.1397 13.7368 34.6109 14.8832 35.8512 16.2506Z"
								  fill="#333333"></path>
							<path
								d="M27.1821 15.5719C27.5446 15.1552 28.1762 15.1112 28.5929 15.4736C29.0097 15.8361 29.0537 16.4677 28.6912 16.8844L25.9448 20.0423C25.5824 20.459 24.9507 20.503 24.534 20.1406C24.1173 19.7781 24.0733 19.1465 24.4357 18.7298L27.1821 15.5719Z"
								fill="#333333"></path>
						</g>
					</svg>
					<div>81 kg</div>
				</li>
				<li className="flex flex-col items-center justify-around">
					<svg fill="#000000" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1"
						 xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path
								d="M24,12a1,1,0,0,1-2,0A10.011,10.011,0,0,0,12,2a1,1,0,0,1,0-2A12.013,12.013,0,0,1,24,12Zm-8,1a1,1,0,0,0,0-2H13.723A2,2,0,0,0,13,10.277V7a1,1,0,0,0-2,0v3.277A1.994,1.994,0,1,0,13.723,13ZM1.827,6.784a1,1,0,1,0,1,1A1,1,0,0,0,1.827,6.784ZM2,12a1,1,0,1,0-1,1A1,1,0,0,0,2,12ZM12,22a1,1,0,1,0,1,1A1,1,0,0,0,12,22ZM4.221,3.207a1,1,0,1,0,1,1A1,1,0,0,0,4.221,3.207ZM7.779.841a1,1,0,1,0,1,1A1,1,0,0,0,7.779.841ZM1.827,15.216a1,1,0,1,0,1,1A1,1,0,0,0,1.827,15.216Zm2.394,3.577a1,1,0,1,0,1,1A1,1,0,0,0,4.221,18.793Zm3.558,2.366a1,1,0,1,0,1,1A1,1,0,0,0,7.779,21.159Zm14.394-5.943a1,1,0,1,0,1,1A1,1,0,0,0,22.173,15.216Zm-2.394,3.577a1,1,0,1,0,1,1A1,1,0,0,0,19.779,18.793Zm-3.558,2.366a1,1,0,1,0,1,1A1,1,0,0,0,16.221,21.159Z"></path>
						</g>
					</svg>
					<div>15 y.o</div>
				</li>
			</ul>
			<div className="p-4 border-t mx-8 mt-2">
			</div>
		</div>

		<div
			className=" m-1 max-w-2xl mx-4 sm:max-w-sm md:max-wd-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
			<svg className="m-0 mx-auto" width="100px" height="100px" viewBox="0 0 21.00 21.00" version="1.1"
				 xmlns="http://www.w3.org/2000/svg"
				 xmlnsXlink="http://www.w3.org/1999/xlink" fill="#057A55">
				<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
				<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC"
				   strokeWidth="0.33599999999999997"></g>
				<g id="SVGRepo_iconCarrier"><title>plus_circle []</title>
					<desc>Created with Sketch.</desc>
					<defs></defs>
					<g id="Page-1" strokeWidth="0.00021000000000000004" fill="none" fillRule="evenodd">
						<g id="Dribbble-Light-Preview" transform="translate(-419.000000, -520.000000)"
						   fill="#057A55">
							<g id="icons" transform="translate(56.000000, 160.000000)">
								<path
									d="M374.55,369 L377.7,369 L377.7,371 L374.55,371 L374.55,374 L372.45,374 L372.45,371 L369.3,371 L369.3,369 L372.45,369 L372.45,366 L374.55,366 L374.55,369 Z M373.5,378 C368.86845,378 365.1,374.411 365.1,370 C365.1,365.589 368.86845,362 373.5,362 C378.13155,362 381.9,365.589 381.9,370 C381.9,374.411 378.13155,378 373.5,378 L373.5,378 Z M373.5,360 C367.70085,360 363,364.477 363,370 C363,375.523 367.70085,380 373.5,380 C379.29915,380 384,375.523 384,370 C384,364.477 379.29915,360 373.5,360 L373.5,360 Z"
									id="plus_circle-[]"></path>
							</g>
						</g>
					</g>
				</g>
			</svg>
		</div>

	</>
)

}
;

export default Home;