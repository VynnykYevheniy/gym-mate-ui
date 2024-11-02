import {Route, Routes, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import Header from './components/Header';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import TelegramWebApp from './components/TelegramWebApp';
import Training from './pages/Training';
import PrivateRoute from './service/PrivateRoute.jsx';
import CalendarTraining from './pages/CalendarTraining.jsx';
import TrainerProfile from './pages/Trainer/TrainerProfile.jsx';
import ClientManager from './pages/Trainer/ClientManager.jsx';
import UserProfile from './components/UserProfile.jsx';
import WelcomeComponent from './components/WelcomeComponent.jsx';
import TrainerList from "./pages/TrainerList.jsx";

function App() {
	const navigate = useNavigate(); // Hook to programmatically navigate
	const token = localStorage.getItem('token');
	const profileLink = localStorage.getItem("profileLink");

	useEffect(() => {
		// Redirect to /client if the token exists
		if (!token) {
			navigate(profileLink);
		}
	}, [navigate, profileLink, token]); // Dependencies include navigate and token

	return (
		<>
			<Header/>
			<Routes>
				{/* WelcomeComponent доступен без авторизации */}
				<Route path="/" element={<WelcomeComponent/>}/>
				<Route path="/signup" element={<Register/>}/>
				<Route path="/signin" element={<Login/>}/>
				<Route path="/telegram" element={<TelegramWebApp/>}/>

				{/* Все остальные маршруты обернуты в PrivateRoute */}
				<Route element={<PrivateRoute/>}>
					<Route path="/calendar" element={<CalendarTraining/>}/>
					<Route path="/training" element={<Training/>}/>
					<Route path="/trainer" element={<TrainerProfile/>}/>
					<Route path="/client" element={<UserProfile/>}/>
					<Route path="/clientmanager" element={<ClientManager/>}/>
					<Route path="/trainers" element={<TrainerList/>}/>
					<Route path="/trainer/:id" element={<TrainerProfile />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;