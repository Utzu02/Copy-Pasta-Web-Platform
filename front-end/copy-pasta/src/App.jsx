import { useState, useEffect } from 'react'
import './App.css'
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar'
import Home from './pages/Homepage';
import Recipes from './pages/Recipes';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import AddRecipes from './pages/AddRecipes';
import NotFound from './pages/NotFound';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Actualizează starea în funcție de dimensiunea ecranului
  const handleMenuToggle = (isOpen) => {
    setMenuOpen(isOpen);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    // Verificăm dimensiunea la montare
    handleResize();

    // Adăugăm un event listener pentru redimensionare
    window.addEventListener("resize", handleResize);

    // Eliminăm event listener la demontare
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Router>
      {<Navbar isMobile={isMobile} menuOpen={menuOpen} onToggleMenu={handleMenuToggle}/>}
      <Routes>
        <Route path="/" element={<Home menuOpen={menuOpen} isMobile={isMobile}/>} />
        <Route path="/recipes" element={<Recipes menuOpen={menuOpen} isMobile={isMobile}/>} />
        <Route path="/profile" element={<Profile menuOpen={menuOpen} isMobile={isMobile}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/add-recipe" element={<AddRecipes menuOpen={menuOpen} isMobile={isMobile}/>} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to='/not-found' />} />
      </Routes>
    </Router>
  )
}

export default App
