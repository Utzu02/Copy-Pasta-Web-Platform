import React, { useState,useEffect } from "react";
import "./CarouselStyle.css"; // Include stilurile din secțiunea CSS
import "./../styles/AllStyles.css"
import "./../styles/Homepage.css"
import ex1 from '../assets/ex1.png'
import ex2 from '../assets/ex2.png'
import ex3 from '../assets/ex3.png'
import linie from './../assets/linie.svg'

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [recipes,setRecipes] = useState ([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/get-recipes');
        const data = await response.json();
        setRecipes(data); // Stochează rețetele în state
        sortRecipes(data);
      } catch (error) {
        console.error('Eroare la preluarea rețetelor:', error);
      }
    };
    fetchRecipes();
  }, []); // Array de dependențe gol => se execută o singură dată, la montarea componentei


  const sortRecipes = (newRecipes) => {
    const sorted = [...newRecipes].sort((a,b) => b.ratings - a.ratings)
    setRecipes(sorted.slice(0, 3));
  }
  const totalSlides = 3;

  // Butoanele pentru navigare
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Top rated recipes</h2>
      <div className="carousel-wrapper">
        <button className="carousel-button prev-btn" onClick={prevSlide}>
          ❮
        </button>
        <div className="carousel">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className={`flex item carousel-item ${index === currentSlide ? "active" : "hidden"
                }`}
            >
              <img src={`http://localhost:5000${recipe.image}`} alt={recipe.title} />
              <img className="linie" src={linie}></img>
              <div className="informatii">
                <p className='titlureteta'>
                  {recipe.title}
                </p>
                <div className="ratings">
                  {"★".repeat(recipe.ratings)}
                  {"☆".repeat(5 - recipe.ratings)}
                </div>
                <p className='informatiisuplimentare'>Nr ratinguri</p>
                <p className="nrrating">{recipe.nrratinguri}</p>
                <p className='informatiisuplimentare'>Author:</p>
                <p className='autor'>{recipe.author}</p>
              </div>

            </div>
          ))}
        </div>
        <button className="carousel-button next-btn" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
