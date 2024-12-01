import { useState } from 'react'
import './NavStyle.css'
import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const checkToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setIsLoggedIn(true);
  }

  const optiuniConfigurari = () => {
    if(location.pathname === '/profile' && isLoggedIn)
    {
      return (
        <ul className='setari'><li><Link to="/logout" className='textSectiuni'>Logout</Link></li></ul>
      )
    }
    else if(location.pathname === '/profile')
    {
      return (<Navigate to='/'/>)
    }
    else if (isLoggedIn) {return (
      <ul className='setari'><li><Link to="/profile" className='textSectiuni'>Profile</Link></li></ul>
    )}
    else {return (
      <ul className='setari'>
        <li>
          <Link to="/login" className='textSectiuni'>
          <svg className='loginSVG' width="124" height="52" viewBox="0 0 124 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect opacity="0.85" x="1.5" y="1.5" width="121" height="49" rx="19.5" stroke="white" stroke-width="3"/>
          </svg>
          <p className='textLogin'>Login</p>
          </Link>
        </li>
        <li><Link to="/register" className='textSectiuni'>Register</Link></li>
      </ul>
    )}

  }
  if(location.pathname === '/not-found') return null
  return (
    <nav>
      <div className='navLogo'><Link to="/">
        <p className='logoText'>
          chef
        </p>
        <svg width="52" height="57" viewBox="0 0 52 57" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.4" d="M21.7925 41.5957C33.0027 41.5957 42.0904 32.5081 42.0904 21.2979C42.0904 10.0877 33.0027 1 21.7925 1C10.5823 1 1.49463 10.0877 1.49463 21.2979C1.49463 32.5081 10.5823 41.5957 21.7925 41.5957Z" stroke="white" stroke-miterlimit="10" />
          <path d="M1.90702 25.9535C-0.314307 14.9666 6.46939 3.68703 17.4563 1.479" stroke="#009C41" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" />
          <path d="M52.0001 8.66162H11.8965V16.9085H52.0001V8.66162Z" fill="#009C41" />
          <path d="M21.4202 23.1599H11.8965V56.9454H21.4202V23.1599Z" fill="#009C41" />
          <path d="M36.6236 16.9083H27.0999V56.9587H36.6236V16.9083Z" fill="#009C41" />
        </svg>
      </Link>
      </div>
      <ul className='sectiuni'>
        <li><Link to="/recipes" className='textSectiuni'>Recipes</Link></li>
        <li><Link to="/add-recipe" className='textSectiuni'>Add Recipe</Link></li>
      </ul>
      {optiuniConfigurari()}
    </nav>
  )
}
export default Navbar
