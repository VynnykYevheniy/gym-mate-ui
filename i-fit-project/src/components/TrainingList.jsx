
export default function TrainingList() {
	return (
		<>
			<div className="container mx-auto">
				<h1 className="text-3xl font-bold text-center text-white primary-bg py-4 mb-6">Workout List</h1>

				{//}<!-- Workout Card -->
				}
				<div
					className=" m-1 max-w-2xl mx-4 sm:max-w-sm md:max-wd-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
					{//<!-- Single Workout Card -->
					}
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
					<div className="bg-white shadow-md rounded-lg overflow-hidden">
						<div className="p-4 primary-bg text-white">
							<h2 className="text-xl font-semibold">Upper Body Strength</h2>
						</div>
						<div className="p-4">
							<ul>
								{//}<!-- Single Exercise -->
								}
								<li className="mb-4 items-center bg-gray-50 flex flex-row">
									<img className="w-16 h-16 rounded-md object-cover m-4 "
										 src="https://via.placeholder.com/100" alt="Exercise Image"/>
									<div className="basis-1/2">
										<h3 className="text-lg font-semibold">Chest</h3>
										<p className="text-sm">Bench Press</p>
										<p className="text-sm">Sets: 3 | Reps: 10 | Weight: 70kg</p>
										<p className="text-sm">Rest: 1 min</p>
									</div>
									<div className="basis-1/4 ">

										<svg className="size-5 float-right" fill="#6B7280" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
											 xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 494.936 494.936"
											 xml:space="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
											<g id="SVGRepo_tracerCarrier" strokeLinecap="round"
											   strokeLinejoin="round"></g>
											<g id="SVGRepo_iconCarrier"> <g> <g> <path
												d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157 c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21 s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741 c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"></path>
												<path
													d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069 c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963 c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692 C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107 l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005 c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"></path> </g> </g> </g></svg>
									</div>

								</li>
								<li className="mb-4 flex items-center bg-gray-50">
									<img className="w-16 h-16 rounded-md object-cover mr-4"
										 src="https://via.placeholder.com/100" alt="Exercise Image"/>
									<div>
										<h3 className="text-lg font-semibold">Back</h3>
										<p className="text-sm">Pull-Ups</p>
										<p className="text-sm">Sets: 4 | Reps: 8 | Bodyweight</p>
										<p className="text-sm">Rest: 1 min 30 sec</p>
									</div>
									<img className="w-6 h-6 cursor-pointer"
										 src="https://via.placeholder.com/24/057A55/FFFFFF?text=✏" alt="Edit Icon"/>
								</li>
								<li className="mb-4 flex items-center bg-gray-50">
									<img className="w-16 h-16 rounded-md object-cover mr-4"
										 src="https://via.placeholder.com/100" alt="Exercise Image"/>
									<div>
										<h3 className="text-lg font-semibold">Shoulders</h3>
										<p className="text-sm">Overhead Press</p>
										<p className="text-sm">Sets: 3 | Reps: 12 | Weight: 40kg</p>
										<p className="text-sm">Rest: 1 min</p>
									</div>
									<img className="w-6 h-6 cursor-pointer"
										 src="https://via.placeholder.com/24/057A55/FFFFFF?text=✏" alt="Edit Icon"/>
								</li>
								<li className="mb-4 flex items-center bg-gray-50">
									<img className="w-16 h-16 rounded-md object-cover mr-4"
										 src="https://via.placeholder.com/100" alt="Exercise Image"/>
									<div>
										<h3 className="text-lg font-semibold">Arms</h3>
										<p className="text-sm">Bicep Curls</p>
										<p className="text-sm">Sets: 4 | Reps: 12 | Weight: 15kg</p>
										<p className="text-sm">Rest: 45 sec</p>
									</div>
									<img className="w-6 h-6 cursor-pointer"
										 src="https://via.placeholder.com/24/057A55/FFFFFF?text=✏" alt="Edit Icon"/>
								</li>
							</ul>
						</div>
					</div>
					{//}<!-- Repeat this block for other workout cards -->
					}
				</div>
			</div>
		</>
	)
}