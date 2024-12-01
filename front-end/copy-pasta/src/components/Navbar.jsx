import { useState } from 'react'
import './NavStyle.css'
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
      <ul>
        <li><Link to="/recipes" className='recipes'>Recipes</Link></li>
        <li><Link to="/add-recipe" className='addRecipe'>Add Recipe</Link></li>
      </ul>
    </nav>
  )
}
export default Navbar
