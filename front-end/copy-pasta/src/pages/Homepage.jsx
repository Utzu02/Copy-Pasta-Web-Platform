import { useState } from 'react'
import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/AllStyles.css'
import './../styles/Homepage.css'
import logo from './../assets/logoHomepage.svg'

const Homepage = () => {
    return (
          <div className='main'>
                <div className='flex homepage'>
                    <img className="homepageLogo" src={logo}></img>
                </div>
          </div>
      )
}
export default Homepage
