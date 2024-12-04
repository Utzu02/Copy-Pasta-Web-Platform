import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/AllStyles.css';
import '../styles/ProfileStyle.css';
import '../styles/AddRecipe.css';
import '../styles/LoginStyle.css';
import Footer from '../components/Footer';

const Register = ({ menuOpen, isMobile }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    telephone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Nu ai completat numele!';
    if (!formData.telephone) newErrors.telephone = 'Nu ai completat numărul de telefon!';
    if (!formData.email) newErrors.email = 'Nu ai completat email-ul!';
    if (!formData.password) newErrors.password = 'Nu ai completat parola!';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Parolele nu sunt identice!';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('Form submitted:', formData);

    // Golește formularul după submit
    setFormData({
      fullName: '',
      telephone: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  return (
    <div className={`${menuOpen && 'blur'}`}>
      <div className={`main ${isMobile && 'mobil'}`}>
        <div className={`profil ${isMobile && 'mobileRegister'} flex`}>
          <form
            className={`informatiiBucatar add ${isMobile && 'mobil'} register flex`}
            onSubmit={handleSubmit}
          >
            <h2 className={`loginText ${isMobile&&'loginmobile'} `}>Hai, fă foamea<br></br> cu noi!</h2>

            {/* Full Name */}
            <div className={`content-nickname informatii ${isMobile && 'mobil'} add`}>
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleChange}
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
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>

            {/* Telephone */}
            <div className={`content-nickname informatii ${isMobile && 'mobil'} add`}>
              <input
                type="tel"
                name="telephone"
                placeholder="Telephone"
                value={formData.telephone}
                onChange={handleChange}
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
              {errors.telephone && <p className="error">{errors.telephone}</p>}
            </div>

            {/* Email */}
            <div className={`content-nickname informatii ${isMobile && 'mobil'} add`}>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
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

            {/* Password */}
            <div className={`content-nickname informatii ${isMobile && 'mobil'} add`}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
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

            {/* Confirm Password */}
            <div className={`content-nickname informatii ${isMobile && 'mobil'} add`}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
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
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`add-recipe-button login signup add ${isMobile && 'mobileReg'}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        {isMobile && <Footer isMobile={isMobile} />}
      </div>
    </div>
  );
};

export default Register;
