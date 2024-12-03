import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/AllStyles.css';
import '../styles/ProfileStyle.css';
import '../styles/AddRecipe.css';
import '../styles/LoginStyle.css';
import Footer from '../components/Footer';

const Login = ({ menuOpen, isMobile }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const validationErrors = {};
    if (!email) validationErrors.email = 'Nu ai completat email-ul!';
    if (!password) validationErrors.password = 'Nu ai completat parola!';
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Form submitted:', { email, password });

    // Reset fields after successful submit
    setEmail('');
    setPassword('');
    setErrors({});
  };


  return (
    <div className={`${menuOpen && 'blur'}`}>
      <div className={`main ${isMobile && 'mobil'}`}>
        <div className={`profil ${isMobile && 'mobile'} flex`}>
          <form
            className={`informatiiBucatar add ${isMobile && 'mobil'} login flex`}
            onSubmit={handleSubmit}
          >
            <h2 className="loginText">
              Loghează-te,<br /> chiorăie mațele!
            </h2>

            {/* Input pentru email */}
            <div className={`content-nickname informatii ${isMobile && 'mobil'} add`}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => changeEmail()}
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
            <div className={`content-nickname informatii ${isMobile && 'mobil'} add`}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            {/* Buton pentru Login */}
            <button
              type="submit"
              className={`add-recipe-button login add ${isMobile && 'mobile'}`}
            >
              Login
            </button>

            {/* Link Forgot Password */}
            <Link to="/forgot-password" className="forgot-password">
              Forgot password
            </Link>
          </form>
        </div>
        {isMobile && <Footer isMobile={isMobile} />}
      </div>
    </div>
  );
};

export default Login;
