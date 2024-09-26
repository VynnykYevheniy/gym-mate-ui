import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import Header from './components/Header';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import TelegramWebAppComponent from './components/TelegramWebAppComponent'; // Импорт вашего компонента

function App() {
	return (
		<>
			<Header />
			<div className="min-h-screen bg-gray-50 bg-[url('./assets/background.svg')] bg-fixed bg-bottom bg-no-repeat">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/telegram" element={<TelegramWebAppComponent />} /> {/* Новый маршрут */}
				</Routes>
			</div>
		</>
	);
}

export default App;