import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar'
import Home from './pages/Homepage';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar-ul este afișat mereu, indiferent de rută */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </Router>
  )
}

export default App
