import { useState } from 'react';
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './../styles/AllStyles.css';
import '../styles/ProfileStyle.css';
import '../styles/AddRecipe.css';
import '../styles/LoginStyle.css';
import Footer from '../components/Footer';

const Login = ({ menuOpen, isMobile }) => {
  const [email, setEmail] = useState('');
  const [parola, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
   // Functie pentru gestionarea schimbarii valorii inputului
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleParolaChange = (e) => setPassword(e.target.value);
  const validate = () => {
    const validationErrors = {};
    if (!email) validationErrors.email = 'Nu ai completat email-ul!';
    if (!parola) validationErrors.parola = 'Nu ai completat parola!';
    return validationErrors;
  };
  const navigate = useNavigate(); // Creează o instanță de navigate
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, parola }), // Trimiți datele în corpul cererii
      });
      
      // Verifici dacă răspunsul este OK (status 200)
      if (response.ok) {
        const data = await response.json(); // Răspunsul de la server
        setMessage(data.message || 'Autentificare reușită!');
        setEmail('');
        setPassword('');
        setErrors({});
        navigate('/');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Eroare la autentificare');
      }
    } catch (error) {
      console.error('Eroare la trimiterea cererii:', error);
      setMessage('Eroare de conexiune');
    }
    // Reset fields after successful submit
  };


  return (
    <div className={`${menuOpen && 'blur'}`}>
      <div className={`main ${isMobile && 'mobil'}`}>
        <div className={`profil ${isMobile && 'loginmobile'} flex`}>
          <form
            className={`informatiiBucatar add ${isMobile && 'loginmobile'} login flex`}
            onSubmit={handleSubmit}
          >
            <h2 className={`loginText ${isMobile&&'loginmobile'}`}>
              Loghează-te,<br /> chiorăie mațele!
            </h2>

            {/* Input pentru email */}
            <div className={`content-nickname informatii ${isMobile && 'loginmobile'} add`}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className={`nickname ${isMobile && 'mobil'}`}
              />
              <svg
                width="100%"
                height="1"
                viewBox="0 0 412 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <line y1="0.5" x2="412" y2="0.5" stroke="white" />
              </svg>
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            {/* Input pentru password */}
            <div className={`content-nickname informatii ${isMobile && 'loginmobile'} add`}>
              <input
                type="password"
                placeholder="Password"
                value={parola}
                onChange={handleParolaChange}
                className={`nickname ${isMobile && 'mobil'}`}
              />
              <svg
                width="100%"
                height="1"
                viewBox="0 0 412 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <line y1="0.5" x2="412" y2="0.5" stroke="white" />
              </svg>
              {errors.parola && <p className="error">{errors.parola}</p>}
            </div>

            {/* Buton pentru Login */}
            <button
              type="submit"
              className={`add-recipe-button login add ${isMobile && 'mobile'}`}
            >
              Login
            </button>

            {/* Link Forgot Password */}
            <Link to="/forgot-password" className={`forgot-password ${isMobile && 'mobilelogin'}`}>
              Forgot password
            </Link>
          </form>
        </div>
      </div>
      {isMobile && <Footer isMobile={isMobile} />}
    </div>
  );
};

export default Login;
