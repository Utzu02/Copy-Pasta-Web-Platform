import { useState,useEffect } from 'react'
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
const Homepage = ({menuOpen,isMobile }) => {

    const [recipes,setRecipes] = useState ([]);
    useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/get-recipes');
          const data = await response.json();
          setRecipes(data); 
          sortRecipes(data);
        } catch (error) {
          console.error('Eroare la preluarea rețetelor:', error);
        }
      };
      fetchRecipes();
    }, []); 
    function Aprox (a) {
        if(a+0.4>(Math.floor(a+1))) return Math.floor(a+1)
        else return Math.floor(a)
      }
  
    const sortRecipes = (newRecipes) => {
      const sorted = [...newRecipes].sort((a,b) => {return(((b.nrratinguri==0)?b.ratings:b.ratings/b.nrratinguri) - ((a.nrratinguri==0)?a.ratings:a.ratings/a.nrratinguri))})
      setRecipes(sorted.slice(0, 3));
    }
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
                                <img src={`http://localhost:5000${recipe.image}`}></img>
                                <img className="linie" src={linie}></img>
                                <div className='informatii'>
                                    <p className='titlureteta'>
                                        {recipe.title}
                                    </p>
                                    <div className='stars'>
                    {"★".repeat(Aprox((recipe.nrratinguri==0)?recipe.ratings:recipe.ratings/recipe.nrratinguri))}
                    {"☆".repeat(5 - Aprox((recipe.nrratinguri==0)?recipe.ratings:recipe.ratings/recipe.nrratinguri))}
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
        <div className={`${menuOpen&&'blur'}`}>
            <Carousel />
            <ContactFrom isMobile={isMobile} />
            <Footer isMobile={isMobile} />
        </div>
    )
}
export default Homepage
