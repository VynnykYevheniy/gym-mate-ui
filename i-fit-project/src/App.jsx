

import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import Header from './components/Header';
import './App.css'
import Register from './pages/Register';
import Login from './pages/Login';
//import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
      <Header />
<div className="min-h-screen bg-gray-50 bg-[url('./assets/background.svg')] bg-fixed bg-bottom bg-no-repeat">
      <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/register" element={<Register/>}/> 
      <Route path="/login" element={<Login/>}/> 
      {/*<Route path="/news" element={<News/>}/> 
      <Route path="/new/:id" element={<New/>} />
      <Route path="/about" element={<About/>}/> 
      <Route path="/contact" element={<Contact/>}/> 
      <Route path="/business" element={<Services/>}/> 
      
      <Route path="*" element={<NotFound />} /> {/* Маршрут для страницы 404 */}
    </Routes>
</div>
    </>
  )
}

export default App
