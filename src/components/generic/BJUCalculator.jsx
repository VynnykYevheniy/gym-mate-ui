import React, { useState } from "react";

export default function BJUCalculator() {
	const [gender, setGender] = useState("male");
	const [weight, setWeight] = useState("");
	const [height, setHeight] = useState("");
	const [age, setAge] = useState("");
	const [activity, setActivity] = useState("low");
	const [result, setResult] = useState(null);
	const [isLoading, setIsLoading] = useState(false); // State to manage loading

	const handleCalculate = (e) => {
		e.preventDefault();

		// Set loading state to true to show animation
		setIsLoading(true);

		// Simulate a delay of 3-5 seconds
		setTimeout(() => {
			const bmr =
				gender === "male"
					? 10 * weight + 6.25 * height - 5 * age + 5
					: 10 * weight + 6.25 * height - 5 * age - 161;

			const activityMultiplier = {
				low: 1.2,
				moderate: 1.55,
				high: 1.9,
			};

			const calories = bmr * activityMultiplier[activity];

			const proteins = ((calories * 0.3) / 4).toFixed(1);
			const fats = ((calories * 0.2) / 9).toFixed(1);
			const carbs = ((calories * 0.5) / 4).toFixed(1);

			// Set result after the delay
			setResult({ calories: calories.toFixed(1), proteins, fats, carbs });

			// Set loading state to false
			setIsLoading(false);
		}, Math.random() * (5000 - 3000) + 3000); // Random delay between 3-5 seconds
	};

	return (
		<section className="w-full max-w-lg mx-auto bg-defaultInfoSectionColor">
			<h2 className="text-lg text-center text-secondTextColor mb-6">BJU Calculator</h2>
			<form className="space-y-6" onSubmit={handleCalculate}>
				<div className="mb-4 flex items-center">
					<label htmlFor="gender" className="block w-1/4 mb-2 text-sm text-gray-500">Gender</label>
					<select
						id="gender"
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
						value={gender}
						onChange={(e) => setGender(e.target.value)}
					>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div>
				<div className="mb-4 flex items-center">
					<label htmlFor="weight" className="block w-1/4 mb-2 text-sm text-secondTextColor">Weight (kg)</label>
					<input
						type="number"
						id="weight"
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
						placeholder="Enter weight"
						value={weight}
						onChange={(e) => setWeight(e.target.value)}
					/>
				</div>
				<div className="mb-4 flex items-center">
					<label htmlFor="height" className="block w-1/4 mb-2 text-sm text-secondTextColor">Height (cm)</label>
					<input
						type="number"
						id="height"
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
						placeholder="Enter height"
						value={height}
						onChange={(e) => setHeight(e.target.value)}
					/>
				</div>
				<div className="mb-4 flex items-center">
					<label htmlFor="age" className="block w-1/4 mb-2 text-sm text-gray-500">Age</label>
					<input
						type="number"
						id="age"
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
						placeholder="Enter age"
						value={age}
						onChange={(e) => setAge(e.target.value)}
					/>
				</div>
				<div className="mb-4 flex items-center">
					<label htmlFor="activity" className="block w-1/4 mb-2 text-sm text-gray-500">Activity Level</label>
					<select
						id="activity"
						className="w-3/4 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
						value={activity}
						onChange={(e) => setActivity(e.target.value)}
					>
						<option value="low">Low</option>
						<option value="moderate">Moderate</option>
						<option value="high">High</option>
					</select>
				</div>


				{/* Show loading spinner during calculation */}
					{isLoading ? <>
						<div className="mt-6 text-center">
							<div
								className="w-12 h-12 border-4 border-t-4 border-primaryHover border-solid rounded-full animate-spin mx-auto"></div>
							<p className="text-secondTextColor mt-4">Calculating...</p>
						</div>
					</> : <>
						<button
							type="submit"
							className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primaryHover focus:outline-none focus:ring-4 focus:ring-primary transition"
						>Calculate</button>
					</>
					}
			</form>
			{/* Show results after calculation */}
			{result && !isLoading && (
				<div className="mt-6 p-6 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-lg shadow-inner">
					<h3 className="text-xl font-semibold text-secondTextColor mb-4">Results:</h3>
					<p className="text-lg text-secondTextColor">Calories: {result.calories} kcal</p>
					<p className="text-lg text-secondTextColor">Proteins: {result.proteins} g</p>
					<p className="text-lg text-secondTextColor">Fats: {result.fats} g</p>
					<p className="text-lg text-secondTextColor">Carbs: {result.carbs} g</p>
				</div>
			)}
		</section>
	);
}