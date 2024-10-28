import {Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import TelegramWebApp from './components/TelegramWebApp';
import Training from './pages/Training';
import PrivateRoute from './components/PrivateRoute';
import CalendarTraining from "./pages/CalendarTraining.jsx";
import TrainerProfile from "./pages/Trainer/TrainerProfile.jsx";

function App() {
	return (
		<>
			<Header/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/signup" element={<Register/>}/>
				<Route path="/signin" element={<Login/>}/>
				<Route path="/telegram" element={<TelegramWebApp/>}/>
				<Route path="/calendar" element={<CalendarTraining/>}/>
				<Route
					path="/training"
					element={
						<PrivateRoute>
							<Training/>
						</PrivateRoute>
					}
				/>
				<Route path="/trainer" element={<TrainerProfile/>}/>

			</Routes>

			<Footer/>
		</>
	);
}

export default App;