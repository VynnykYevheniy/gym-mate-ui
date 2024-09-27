import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Header from './components/Header';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import TelegramWebApp from './components/TelegramWebApp.jsx';
import { TokenProvider } from './context/TokenContext.jsx';

function App() {
	return (
		<TokenProvider>
			<Header />
			<div className="min-h-screen bg-gray-50 bg-[url('./assets/background.svg')] bg-fixed bg-bottom bg-no-repeat">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/telegram" element={<TelegramWebApp />} /> {/* Новый маршрут */}
				</Routes>
			</div>
		</TokenProvider>
	);
}

export default App;