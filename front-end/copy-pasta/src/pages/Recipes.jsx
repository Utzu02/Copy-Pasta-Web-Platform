import { useState, useEffect } from 'react';
import React from 'react';
import './../styles/AllStyles.css';
import '../styles/RecipesStyle.css';
import linieorizontala from './../assets/linie-orizontala.svg';
import Footer from '../components/Footer';

const Recipes = ({ menuOpen, isMobile }) => {

  const [recipes, setRecipes] = useState([]); // State pentru rețete
  const [searchedRecipes, setSearchedRecipes] = useState([]); // Rețete filtrate
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState(''); // Pentru selectarea opțiunii de sortare

  // Schimbăm valoarea în input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    search(e.target.value)
  };
  const search = (item) => {
    let searched = [...recipes]; // Facem o copie a rețetelor
    // Reuniunea filtrează rețetele care au ratingurile selectate
    searched = searched.filter(recipe => recipe.title.toLowerCase().startsWith(item.toLowerCase(),0));

    setSearchedRecipes(searched); // Setăm rețetele filtrate

  }
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
  };

  const startOptions = [{}, {}, {}, {}, {}];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/get-recipes');
        const data = await response.json();
        setRecipes(data); // Stochează rețetele în state
        setSearchedRecipes(data); // Inițial, setăm toate rețetele
      } catch (error) {
        console.error('Eroare la preluarea rețetelor:', error);
      }
    };
    fetchRecipes();
  }, []); // Array de dependențe gol => se execută o singură dată, la montarea componentei


  // Funcția de filtrare
  const filterRecipesByRating = () => {
    let filtered = [...searchedRecipes]; // Facem o copie a rețetelor

    // Dacă niciun checkbox nu este selectat, afișăm toate rețetele
    if (!checkboxes.some(isChecked => isChecked)) {
      setSearchedRecipes(searchedRecipes);
      return;
    }

    // Reuniunea filtrează rețetele care au ratingurile selectate
    filtered = filtered.filter(recipe => 
      checkboxes.some((isChecked, index) => isChecked && recipe.ratings === 5-index)
    );

    setSearchedRecipes(filtered); // Setăm rețetele filtrate
  };

  // Folosim un useEffect pentru a filtra rețetele de fiecare dată când checkbox-urile se schimbă
  useEffect(() => {
    filterRecipesByRating();
  }, [checkboxes, recipes]); // Se reexecută la schimbarea checkbox-urilor sau a listei de rețete

  // Funcția pentru sortare
  const sortRecipes = (option) => {
    let sorted = [...searchedRecipes]; // Facem o copie a rețetelor filtrate

    switch (option) {
      case 'Top rated':
        sorted = sorted.sort((a, b) => b.ratings - a.ratings);
        break;
      case 'Worst rated':
        sorted = sorted.sort((a, b) => a.ratings - b.ratings);
        break;
      case 'Most rated':
        sorted = sorted.sort((a, b) => b.nrratinguri - a.nrratinguri);
        break;
      case 'Least rated':
        sorted = sorted.sort((a, b) => a.nrratinguri - b.nrratinguri);
        break;
      default:
        break;
    }

    setSearchedRecipes(sorted); // Setăm rețetele sortate
  };

  // Funcția care se apelează când se alege o opțiune de sortare
  const handleSortSelection = (option) => {
    setSortOption(option); // Setăm opțiunea de sortare selectată
    setIsSortOpen(false);  // Închide dropdown-ul după selecție
    sortRecipes(option); // Apelăm funcția de sortare
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
                        <input type="checkbox" id={`start${index}`}
                          checked={checkboxes[index]}
                          onChange={() => handleCheckboxChange(index)} />
                        <label for={`start${index}`}>
                          <p key={index} className='stars filter'>
                            {"★".repeat(5-index)}
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
            {searchedRecipes.map((recipe, index) => (
              <div className={`grid-item ${isMobile && 'mobil'}`} key={index}>
                <img src={`http://localhost:5000${recipe.image}`} alt="recipe" />
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
