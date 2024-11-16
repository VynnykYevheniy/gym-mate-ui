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
		<section className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mb-6">
			<h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">BJU Calculator</h2>
			<form className="space-y-6" onSubmit={handleCalculate}>
				<div className="flex flex-col">
					<label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender</label>
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
				<div className="flex flex-col">
					<label htmlFor="weight" className="text-sm font-medium text-gray-700">Weight (kg)</label>
					<input
						type="number"
						id="weight"
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
						placeholder="Enter weight"
						value={weight}
						onChange={(e) => setWeight(e.target.value)}
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="height" className="text-sm font-medium text-gray-700">Height (cm)</label>
					<input
						type="number"
						id="height"
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
						placeholder="Enter height"
						value={height}
						onChange={(e) => setHeight(e.target.value)}
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="age" className="text-sm font-medium text-gray-700">Age</label>
					<input
						type="number"
						id="age"
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
						placeholder="Enter age"
						value={age}
						onChange={(e) => setAge(e.target.value)}
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="activity" className="text-sm font-medium text-gray-700">Activity Level</label>
					<select
						id="activity"
						className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
						value={activity}
						onChange={(e) => setActivity(e.target.value)}
					>
						<option value="low">Low</option>
						<option value="moderate">Moderate</option>
						<option value="high">High</option>
					</select>
				</div>
				<button
					type="submit"
					className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg hover:from-blue-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
				>
					{isLoading ? "Calculating..." : "Calculate"}
				</button>
			</form>

			{/* Show loading spinner during calculation */}
			{isLoading && (
				<div className="mt-6 text-center">
					<div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
					<p className="text-gray-500 mt-4">Calculating...</p>
				</div>
			)}

			{/* Show results after calculation */}
			{result && !isLoading && (
				<div className="mt-6 p-6 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-lg shadow-inner">
					<h3 className="text-xl font-semibold text-gray-800 mb-4">Results:</h3>
					<p className="text-lg text-gray-700">Calories: {result.calories} kcal</p>
					<p className="text-lg text-gray-700">Proteins: {result.proteins} g</p>
					<p className="text-lg text-gray-700">Fats: {result.fats} g</p>
					<p className="text-lg text-gray-700">Carbs: {result.carbs} g</p>
				</div>
			)}
		</section>
	);
}