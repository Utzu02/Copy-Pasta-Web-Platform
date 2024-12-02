import { useState } from 'react'
import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/AllStyles.css'
import '../styles/RecipesStyle.css'
import ex1 from '../assets/ex1.png'
import ex2 from '../assets/ex2.png'
import ex3 from '../assets/ex3.png'
import linieorizontala from './../assets/linie-orizontala.svg'
import Footer from '../components/Footer';
const Recipes = ({menuOpen, isMobile}) => {

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
    }, {
      title: "Reteta 3",
      image: ex1,
      author: "Prenume Nume",
      ratings: 5,
      nrratinguri: 514,
    }, {
      title: "Reteta 3",
      image: ex1,
      author: "Prenume Nume",
      ratings: 5,
      nrratinguri: 514,
    }, {
      title: "Reteta 3",
      image: ex1,
      author: "Prenume Nume",
      ratings: 5,
      nrratinguri: 514,
    }, {
      title: "Reteta 3",
      image: ex1,
      author: "Prenume Nume",
      ratings: 5,
      nrratinguri: 514,
    }, {
      title: "Reteta 3",
      image: ex1,
      author: "Prenume Nume",
      ratings: 5,
      nrratinguri: 514,
    }, {
      title: "Reteta 3",
      image: ex1,
      author: "Prenume Nume",
      ratings: 5,
      nrratinguri: 514,
    }, {
      title: "Reteta 3",
      image: ex1,
      author: "Prenume Nume",
      ratings: 5,
      nrratinguri: 514,
    }, {
      title: "Reteta 3",
      image: ex1,
      author: "Prenume Nume",
      ratings: 5,
      nrratinguri: 514,
    }, {
      title: "Reteta 3",
      image: ex1,
      author: "Prenume Nume",
      ratings: 5,
      nrratinguri: 514,
    }, {
      title: "Reteta 3",
      image: ex1,
      author: "Prenume Nume",
      ratings: 5,
      nrratinguri: 514,
    }, {
      title: "Reteta 3",
      image: ex1,
      author: "Prenume Nume",
      ratings: 5,
      nrratinguri: 514,
    },
  ];
  return (
    <div className={`${menuOpen&&'blur'}`}>
    <div className='main'>
      <div className='content'>

        <div class={`grid-container ${isMobile&&'mobil'}`}>
          {recipes.map((recipe, index) => (
            <div className={`grid-item ${isMobile&&'mobil'}`}>
              <img src={recipe.image}></img>
              <img className="linieoriz" src={linieorizontala}></img>
              <div className='informatii recipe'>
                <p className='titlureteta recipe'>
                  {recipe.title}
                </p>
                <div className='stars'>
                  {"★".repeat(recipe.ratings)}
                  {"☆".repeat(5 - recipe.ratings)}
                </div>
                <p className='informatiisuplimentare'>Nr ratinguri</p>
                <p className='nrratinguri'>{recipe.nrratinguri}</p>
                <p className='informatiisuplimentare'>Author:</p>
                <p className='autor recipe'>{recipe.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer isMobile={isMobile}/>
    </div>
    </div>
  )
}
export default Recipes
