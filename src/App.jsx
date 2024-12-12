import {Navigate, Route, Routes} from 'react-router-dom';
import Header from './components/generic/Header.jsx';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import TelegramWebApp from './components/TelegramWebApp';
import PrivateRoute from './service/PrivateRoute.jsx';
import CalendarTraining from './pages/CalendarTraining.jsx';
import TrainerProfile from './pages/Trainer/TrainerProfile.jsx';
import ClientManager from './pages/Trainer/ClientManager.jsx';
import WelcomeComponent from './components/generic/WelcomeComponent.jsx';
import TrainerList from "./pages/TrainerList.jsx";
import {AuthProvider} from "./context/AuthProvider.jsx";
import TrainingsTable from "./components/training/TrainingsTable.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import Profile from "./pages/Profile.jsx";

function App() {

	return (
		<AuthProvider>
			{/* Показывать Header, только если текущий путь не входит в список исключений */}
			{!"/welcome".includes(location.pathname) && <Header/>}
			<Routes>
				{/* WelcomeComponent доступен без авторизации */}
				<Route path="/" element={<WelcomeComponent/>}/>
				<Route path="/signup" element={<Register/>}/>
				<Route path="/signin" element={<Login/>}/>
				<Route path="/telegram" element={<TelegramWebApp/>}/>

				{/* Все остальные маршруты обернуты в PrivateRoute */}
				<Route element={<PrivateRoute/>}>
					<Route path="/calendar" element={<CalendarTraining/>}/>
					<Route path="/training" element={<TrainingsTable/>}/>
					<Route path="/trainer" element={<TrainerProfile/>}/>
					<Route path="/client" element={<Profile/>}/>
					<Route path="/clientmanager" element={<ClientManager/>}/>
					<Route path="/clientmanager/:id" element={<ClientManager/>}/>
					<Route path="/trainers" element={<TrainerList/>}/>
					<Route path="/trainer/:id" element={<TrainerProfile/>}/>
				</Route>
				<Route path="/welcome" element={<WelcomePage/>}/>
				{/* Обработка несуществующих маршрутов */}
				<Route path="*" element={<Navigate to="/" replace/>}/>
			</Routes>
		</AuthProvider>
	);
}

export default App;