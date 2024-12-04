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

  useEffect(() => {
    // Funcție pentru a citi un cookie
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    // Obținem valoarea cookie-ului `userEmail` și o setăm în starea locală
    const email = getCookie('userEmail');
    console.log(email)
  }, []);

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setIsLoggedIn(true);
  }
  return (
    <Router>
      {<Navbar isMobile={isMobile} menuOpen={menuOpen} onToggleMenu={handleMenuToggle} isLoggedIn={isLoggedIn}/>}
      <Routes>
        <Route path="/" element={<Home menuOpen={menuOpen} isMobile={isMobile}/>} />
        <Route path="/recipes" element={<Recipes menuOpen={menuOpen} isMobile={isMobile}/>} />
        <Route path="/profile" element={isLoggedIn?<Profile menuOpen={menuOpen} isMobile={isMobile}/>:<Navigate to='/login' />} />
        <Route path="/register" element={!isLoggedIn?<Register menuOpen={menuOpen} isMobile={isMobile}/>:<Navigate to='/'/>} />
        <Route path="/login" element={!isLoggedIn?<Login menuOpen={menuOpen} isMobile={isMobile}/>:<Navigate to='/'/>} />
        <Route path="/forgot-password" element={!isLoggedIn?<ForgotPassword menuOpen={menuOpen} isMobile={isMobile}/>:<Navigate to='/'/>} />
        <Route path="/add-recipe" element={isLoggedIn?<AddRecipes menuOpen={menuOpen} isMobile={isMobile}/>:<Navigate to='/login'/>} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to='/not-found' />} />
      </Routes>
    </Router>
  )
}

export default App
