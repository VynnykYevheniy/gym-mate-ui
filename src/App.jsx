import {Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import TelegramWebApp from './components/TelegramWebApp';
import Training from './pages/Training';
import PrivateRoute from './components/PrivateRoute';
import CalendarTraining from "./pages/CalendarTraining.jsx";
import TrainerProfile from "./pages/Trainer/TrainerProfile.jsx";
import ClientManager from "./pages/Trainer/ClientManager.jsx";
import UserProfile from "./components/UserProfile.jsx";
import WelcomeComponent from "./components/WelcomeComponent.jsx";

function App() {
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
				</Route>
			</Routes>

			<Footer/>
		</>
	);
}

export default App;