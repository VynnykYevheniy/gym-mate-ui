import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import Home from "./pages/Home";
import Register from './pages/Register';
import Login from './pages/Login';
import TelegramWebApp from './components/TelegramWebApp.jsx';
import {TokenProvider} from './context/TokenContext.jsx';

function App() {
	return (
		<TokenProvider>
			<Header/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/signup" element={<Register/>}/>
				<Route path="/signin" element={<Login/>}/>
				<Route path="/telegram" element={<TelegramWebApp/>}/>
			</Routes>
		</TokenProvider>
	);
}

export default App;