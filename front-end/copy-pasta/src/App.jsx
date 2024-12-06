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
import Cookies from 'js-cookie'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [UID, setUID] = useState("")
  const [name, setName] = useState("")
  const fetchName = async () => {
    const _id = UID;
    const response = await fetch('http://localhost:5000/api/get-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({_id}),
    });

    if (!response.ok) {
      throw new Error('Eroare la preluarea numelui');
    }
    const data = await response.json();
    setName(data.nume)
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Cookies.get("UID");
      if (id) {
        setIsLoggedIn(true);
        if(!UID) setUID(id)
      } else {
        setIsLoggedIn(false);
        if(UID) setUID(id)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if(UID) fetchName();
  }, [UID]);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      {<Navbar isMobile={isMobile} menuOpen={menuOpen} onToggleMenu={handleMenuToggle} isLoggedIn={isLoggedIn}/>}
      <Routes>
        <Route path="/" element={<Home menuOpen={menuOpen} isMobile={isMobile}/>} />
        <Route path="/recipes" element={<Recipes menuOpen={menuOpen} isMobile={isMobile}/>} />
        <Route path="/profile" element={isLoggedIn?<Profile menuOpen={menuOpen} isMobile={isMobile} UID={UID}/>:<Navigate to='/login' />} />
        <Route path="/register" element={!isLoggedIn?<Register menuOpen={menuOpen} isMobile={isMobile}/>:<Navigate to='/'/>} />
        <Route path="/login" element={!isLoggedIn?<Login menuOpen={menuOpen} isMobile={isMobile}/>:<Navigate to='/'/>} />
        <Route path="/forgot-password" element={!isLoggedIn?<ForgotPassword menuOpen={menuOpen} isMobile={isMobile}/>:<Navigate to='/'/>} />
        <Route path="/add-recipe" element={isLoggedIn?<AddRecipes userName={name} menuOpen={menuOpen} UID={UID} isMobile={isMobile}/>:<Navigate to='/login'/>} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to='/not-found' />} />
      </Routes>
    </Router>
  )
}

export default App
