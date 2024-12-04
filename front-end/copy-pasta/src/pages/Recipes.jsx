import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/AllStyles.css';
import '../styles/RecipesStyle.css';
import ex1 from '../assets/ex1.png';
import ex2 from '../assets/ex2.png';
import ex3 from '../assets/ex3.png';
import linieorizontala from './../assets/linie-orizontala.svg';
import Footer from '../components/Footer';

const Recipes = ({ menuOpen, isMobile }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Schimbăm valoarea în input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value)
  };

  // State pentru controlul vizibilității dropdown-urilor
  // Funcție pentru a deschide filtrul și închide sortarea
  const toggleFilterDropdown = () => {
    setIsFilterOpen(!isFilterOpen);  // Toggle filter
    if (isSortOpen) setIsSortOpen(false);  // Închide sortarea dacă este deschisă
  };

  // Funcție pentru a deschide sortarea și închide filtrul
  const toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen);  // Toggle sort
    if (isFilterOpen) setIsFilterOpen(false);  // Închide filtrul dacă este deschis
  };

  // Funcție pentru a închide dropdown-urile când se face clic în afară
  const handleClickOutside = (event) => {
    if (!event.target.closest('.filters-container')) {
      setIsFilterOpen(false);
      setIsSortOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // State pentru checkbox-uri
  const [checkboxes, setCheckboxes] = useState([false, false, false, false, false]);

  // Functie pentru a actualiza starea unui checkbox
  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
    console.log(newCheckboxes)
  };

  const startOptions = [{}, {}, {}, {}, {}];
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

  // Funcții pentru sortare
  const handleSortSelection = (option) => {
    console.log(`Sortare aleasă: ${option}`);
    setIsSortOpen(false);  // Închide dropdown-ul după selecție
  };

  return (
    <div className={`${menuOpen && 'blur'}`}>
      <div className='main'>
        <div className='content'>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <svg className="search-icon" aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7">
              <title id="title">Search Icon</title>
              <desc id="desc">A magnifying glass icon.</desc>
              <g className="search-path" fill="none" stroke="black">
                <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
                <circle cx="8" cy="8" r="7" />
              </g>
            </svg>
          </div>
          <div className="filters-container">
            <div className="filter">
              <button className="filter-button" onClick={toggleFilterDropdown}>
                <p>Filter</p>
                <svg className="dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="39" height="18" viewBox="0 0 39 18" fill="none">
                  <line y1="-1.5" x2="24.6981" y2="-1.5" transform="matrix(-0.761791 -0.647822 0.761791 -0.647823 21.7222 16)" stroke="black" strokeWidth="3" />
                  <line y1="-1.5" x2="24.6981" y2="-1.5" transform="matrix(0.761791 -0.647823 -0.761791 -0.647822 17.0186 16)" stroke="black" strokeWidth="3" />
                </svg>
              </button>

              {isFilterOpen && (
                <div className="dropdown">
                  {startOptions.map((star, index) => (
                    <>
                      <div className='flex'>
                        <input type="checkbox" id={`start${5 - index - 1}`}
                          checked={checkboxes[5 - index - 1]}
                          onChange={() => handleCheckboxChange(5 - index - 1)} />
                        <label for={`start${5 - index - 1}`}>
                          <p key={index} className='stars filter'>
                            {"★".repeat(5 - index)}
                            {"☆".repeat(index)}
                          </p>
                        </label>
                      </div>
                      {index - 4 !== 0 && <img className="linieoriz" src={linieorizontala}></img>}
                    </>
                  ))}
                </div>
              )}
            </div>

            <div className='sort'>
              <button className="sort-button" onClick={toggleSortDropdown}>
                <p>Sort</p>
                <svg className="dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="39" height="18" viewBox="0 0 39 18" fill="none">
                  <line y1="-1.5" x2="24.6981" y2="-1.5" transform="matrix(-0.761791 -0.647822 0.761791 -0.647823 21.7222 16)" stroke="black" strokeWidth="3" />
                  <line y1="-1.5" x2="24.6981" y2="-1.5" transform="matrix(0.761791 -0.647823 -0.761791 -0.647822 17.0186 16)" stroke="black" strokeWidth="3" />
                </svg>
              </button>

              {isSortOpen && (
                <div className="dropdown sort">
                  <p onClick={() => handleSortSelection('Top rated')}>Top rated</p>
                  <img className="linieoriz" src={linieorizontala}></img>
                  <p onClick={() => handleSortSelection('Worst rated')}>Worst rated</p>
                  <img className="linieoriz" src={linieorizontala}></img>
                  <p onClick={() => handleSortSelection('Most rated')}>Most rated</p>
                  <img className="linieoriz" src={linieorizontala}></img>
                  <p onClick={() => handleSortSelection('Least rated')}>Least rated</p>
                </div>
              )}
            </div>
          </div>

          <div className={`grid-container ${isMobile && 'mobil'}`}>
            {recipes.map((recipe, index) => (
              <div className={`grid-item ${isMobile && 'mobil'}`} key={index}>
                <img src={recipe.image} alt="recipe" />
                <img className="linieoriz" src={linieorizontala} alt="linie"></img>
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
        <Footer isMobile={isMobile} />
      </div>
    </div>
  );
};

export default Recipes;
