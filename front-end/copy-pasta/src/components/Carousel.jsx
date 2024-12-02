import React, { useState } from "react";
import "./CarouselStyle.css"; // Include stilurile din secțiunea CSS
import "./../styles/AllStyles.css"
import "./../styles/Homepage.css"
import ex1 from '../assets/ex1.png'
import ex2 from '../assets/ex2.png'
import ex3 from '../assets/ex3.png'
import linie from './../assets/linie.svg'

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
      image: ex2,
      author: "Prenume Nume",
      ratings: 5,
      nrratinguri: 514,
    },
  ];

  const totalSlides = recipes.length;

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
              <img src={recipe.image} alt={recipe.title} />
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
