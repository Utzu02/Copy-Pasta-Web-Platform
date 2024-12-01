import { useState } from 'react'
import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/AllStyles.css'
import './../styles/Homepage.css'
import logo from './../assets/logoHomepage.svg'
import linie from './../assets/linie.svg'
import ContactFrom from '../components/ContactForm';
import ex1 from '../assets/ex1.png'
import ex2 from '../assets/ex2.png'
import ex3 from '../assets/ex3.png'
import Footer from '../components/Footer';
const Homepage = ({isMobile}) => {
    return (
        <>
            {!isMobile&&<div className='main'>
                <div className='flex homepage'>
                    <img className="homepageLogo" src={logo}></img>
                </div>
            </div>}
            <div className='topRated'>
                <h2>Top rated recipes</h2>
                <div className='items flex'>
                    <div className='item flex'>
                        <img src={ex1}></img>
                        <img className="linie" src={linie}></img>
                        <div className='informatii'>
                            <p className='titlureteta'>
                                Supa la plic
                            </p>
                            <div className='stars'>

                            </div>
                            <p className='informatiisuplimentare'>Nr ratinguri</p>
                            <p>nrratinguri</p>
                            <p className='informatiisuplimentare'>Author:</p>
                            <p className='autor'>Croi</p>
                        </div>
                    </div>
                    <div className='item flex'>
                        <img src={ex1}></img>
                        <img className="linie" src={linie}></img>
                        <div className='informatii'>
                            <p className='titlureteta'>
                                Supa la plic
                            </p>
                            <div className='stars'>

                            </div>
                            <p className='informatiisuplimentare'>Nr ratinguri</p>
                            <p>nrratinguri</p>
                            <p className='informatiisuplimentare'>Author:</p>
                            <p className='autor'>Croi</p>
                        </div>
                    </div>
                    <div className='item flex'>
                        <img src={ex3}></img>
                        <img className="linie" src={linie}></img>
                        <div className='informatii'>
                            <p className='titlureteta'>
                                Supa la plic
                            </p>
                            <div className='stars'>

                            </div>
                            <p className='informatiisuplimentare'>Nr ratinguri</p>
                            <p>nrratinguri</p>
                            <p className='informatiisuplimentare'>Author:</p>
                            <p className='autor'>Croi</p>
                        </div>
                    </div>
                </div>
            </div>
            <ContactFrom isMobile={isMobile}/>
            <Footer isMobile={isMobile}/>
        </>
    )
}
export default Homepage
