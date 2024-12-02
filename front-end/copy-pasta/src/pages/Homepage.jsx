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
import Carousel from '../components/Carousel';
const Homepage = ({ isMobile }) => {

    const recipes = [
        {
            title: "Reteta 1",
            image: ex1, // Imaginea poate fi schimbată cu o cale validă
            author: "Prenume Nume",
            ratings: 5,
            nrratinguri: 194,
        },
        {
            title: "Reteta 2",
            image: ex2,
            author: "Prenume Nume",
            ratings: 4,
            nrratinguri: 434,
        },
        {
            title: "Reteta 3",
            image: ex1,
            author: "Prenume Nume",
            ratings: 5,
            nrratinguri: 514,
        },
    ];

    if (!isMobile)
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
                        {recipes.map((recipe, index) => (
                            <div className='item flex'>
                                <img src={recipe.image}></img>
                                <img className="linie" src={linie}></img>
                                <div className='informatii'>
                                    <p className='titlureteta'>
                                        {recipe.title}
                                    </p>
                                    <div className='stars'>
                                        {"★".repeat(recipe.ratings)}
                                        {"☆".repeat(5 - recipe.ratings)}
                                    </div>
                                    <p className='informatiisuplimentare'>Nr ratinguri</p>
                                    <p>{recipe.nrratinguri}</p>
                                    <p className='informatiisuplimentare'>Author:</p>
                                    <p className='autor'>{recipe.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <ContactFrom isMobile={isMobile} />
                <Footer isMobile={isMobile} />
            </>
        )
    else return (
        <>
            <Carousel />
            <ContactFrom isMobile={isMobile} />
            <Footer isMobile={isMobile} />
        </>
    )
}
export default Homepage
