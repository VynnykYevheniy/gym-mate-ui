import WeightBMIChart from "../components/Profile/WeightChart.jsx";
import BJUCalculator from "../components/generic/BJUCalculator.jsx";
import ProfileInfo from "../components/Profile/ProfileInfo.jsx";
import ProfileEditMenu from "../components/Profile/ProfileEditMenu.jsx";
import {useCallback, useEffect, useState} from "react";
import {currentUser} from "../service/UserService.jsx";
import * as AnalyticsBodyService from "../service/AnalyticsBodyService.jsx";
import * as ImageService from "../service/ImageService.jsx";
import Loader from "../components/generic/Loader.jsx";

const Profile = () => {
	const [data, setData] = useState({
		user: null,
		body: null,
		image: null,
		weightData: [],
		bmiData: [],
		loading: true,
	});

	const fetchData = useCallback(async () => {
		try {
			// Получение данных пользователя
			const userData = await currentUser();
			localStorage.setItem("user", JSON.stringify(userData));

			// Получение данных тела
			const bodyData = await AnalyticsBodyService.getCurrent();

			// Получение изображения
			const imageUrl = userData.imageId
				? await ImageService.getImageById(userData.imageId)
				: null;

			// Получение аналитики
			const analytics = await AnalyticsBodyService.getAll();
			const weights = analytics.map(({date, weight}) => ({date, weight}));
			const bmiValues = analytics.map(({date, bmi}) => ({date, bmi}));

			// Обновление состояния
			setData({
				user: userData,
				body: bodyData,
				image: imageUrl,
				weightData: weights,
				bmiData: bmiValues,
				loading: false,
			});
		} catch (error) {
			console.error("Error fetching ProfileInfo data:", error);
			setData((prev) => ({...prev, loading: false}));
		}
	}, [setData]);

	useEffect(() => {
		// Проверяем наличие токена и отсутствие данных пользователя
		const token = localStorage.getItem("token");
		if (token && !data.user) {
			fetchData();
		}
	}, [data.user, fetchData]);

	if (data.loading) {
		return <Loader/>; // Показываем Loader, пока идет загрузка
	}

	return (
		<main>
			{/* ProfileInfo Section */}
			<ProfileInfo user={data.user} body={data.body} image={data.image}/>

			{/* Weight and BMI Chart */}
			<WeightBMIChart weightData={data.weightData} bmiData={data.bmiData}/>

			{/* BJU Calculator */}
			<BJUCalculator/>

			{/* Edit Options */}
			<ProfileEditMenu onRefresh={fetchData}/>
		</main>
	);
};

export default Profile;