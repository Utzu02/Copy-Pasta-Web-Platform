import { useState } from 'react'
import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/AllStyles.css'
import './../styles/Homepage.css'
import logo from './../assets/logoHomepage.svg'
import linie from './../assets/linie.svg'
import footer from './../assets/footer.svg'
import ContactFrom from '../components/ContactForm';
const Homepage = () => {
    return (
        <>
            <div className='main'>
                <div className='flex homepage'>
                    <img className="homepageLogo" src={logo}></img>
                </div>
            </div>
            <div className='topRated'>
                <h2>Top rated recipes</h2>
                <div className='items flex'>
                    <div className='item flex'>
                        <img src={logo}></img>
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
                        <img src={logo}></img>
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
                        <img src={logo}></img>
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
            <ContactFrom />
            <footer>
                <img src={footer}></img>
            </footer>
        </>
    )
}
export default Homepage
