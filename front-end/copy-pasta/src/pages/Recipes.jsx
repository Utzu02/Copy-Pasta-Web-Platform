import { useState, useEffect } from 'react';
import React from 'react';
import './../styles/AllStyles.css';
import '../styles/RecipesStyle.css';
import linieorizontala from './../assets/linie-orizontala.svg';
import Footer from '../components/Footer';
import { use } from 'react';

const Recipes = ({ menuOpen, userName, isMobile }) => {

  const [recipes, setRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [finalRating, setFinalRating] = useState(0)
  const [isLoading, setIsLoading] = useState(false); 
  const [sortMode, setSortMode] = useState('Top rated');
  const [mod,setMod] = useState("")
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    search(e.target.value)
  };
  const search = (item) => {
    let searched = [...recipes];
    searched = searched.filter(recipe => recipe.title.toLowerCase().startsWith(item.toLowerCase(), 0));
    setSearchedRecipes(searched);
  }
  const toggleFilterDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
    if (isSortOpen) setIsSortOpen(false);
  };
 const handleDelete =  async (id) => {
  closeModal()
  let updatedRecipes = recipes.filter (recipe => recipe._id !== id)
  setRecipes(updatedRecipes)
  updatedRecipes = searchedRecipes.filter (recipe => recipe._id !== id)
  setSearchedRecipes(updatedRecipes)
  updatedRecipes = filteredRecipes.filter (recipe => recipe._id !== id)
  setFilteredRecipes(updatedRecipes)
  try {
    const response = await fetch(`http://localhost:5000/api/recipes/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Rețeta a fost ștearsă cu succes.');
    } else {
      console.error('Eroare la ștergerea rețetei.');
    }
  } catch (error) {
    console.error('Eroare:', error);
  }
 }
  const toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen);
    if (isFilterOpen) setIsFilterOpen(false);
  };

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
  useEffect(()=> {
    sortRecipes(sortMode)
  },[mod])
  const [checkboxes, setCheckboxes] = useState([false, false, false, false, false]);

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };

  const startOptions = [{}, {}, {}, {}, {}];
  const deleteButton = (numeReteta) => {
    if(userName==numeReteta) return (
      <button onClick={ () => handleDelete(selectedRecipe._id)} className={`add-recipe-button login stergeReteta add recenzie ${isMobile && 'mobile'}`}>
        Sterge reteta
      </button>
    )
  }
  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true); 
      try {
        const response = await fetch('http://localhost:5000/api/get-recipes');
        const data = await response.json();
        setRecipes(data); 
        setSearchedRecipes(data); 
      } catch (error) {
        console.error('Eroare la preluarea rețetelor:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const [hoveredRating, setHoveredRating] = useState(0); 

  const handleMouseEnter = (index) => {
    setHoveredRating(index + 1); 
  };
  
  const handleMouseLeave = () => {
    setHoveredRating(0); 
  };
  const handleMouseClick = (index) => {
    setFinalRating(index+1)
  }
  const updateRecipe = async (id, updatedData) => {
  try {
    const response = await fetch(`http://localhost:5000/api/recipes/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Rețeta actualizată:', data.updatedRecipe);
      // Actualizează local lista de rețete
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe._id === id ? { ...recipe, ...updatedData } : recipe
        )
      );
    sortRecipes(sortMode)
    } else {
      console.error('Eroare la actualizarea rețetei.');
    }
  } catch (error) {
    console.error('Eroare:', error);
  }
};
  const handleSubmit = (recipe,rating) => {
    const reteta = recipe
    if(reteta.nrratinguri==0) reteta.ratings=0
    reteta.ratings+=rating
    reteta.nrratinguri++;
    updateRecipe(reteta._id,reteta)
    setFinalRating(0)
  }
  const filterRecipesByRating = () => {
    let filtered = [...searchedRecipes]; 
    if (!checkboxes.some(isChecked => isChecked)) {
      setFilteredRecipes(searchedRecipes);
      setMod(mod==1?0:1)
      return;
    }

    filtered = filtered.filter(recipe =>
      checkboxes.some((isChecked, index) => isChecked && Aprox((recipe.nrratinguri==0)?recipe.ratings:recipe.ratings/recipe.nrratinguri) === 5 - index)
    );
    setFilteredRecipes(filtered); 
    setMod(mod==1?0:1)
  };

  useEffect(() => {
    filterRecipesByRating();
  }, [checkboxes, recipes, searchedRecipes]); 
  const sortRecipes = (option) => {
    let sorted = [...filteredRecipes];
    setSortMode(option)
    switch (option) {
      case 'Top rated':
        sorted = sorted.sort((a, b) =>{return(((b.nrratinguri==0)?b.ratings:b.ratings/b.nrratinguri) - ((a.nrratinguri==0)?a.ratings:a.ratings/a.nrratinguri))});
        break;
      case 'Worst rated':
        sorted = sorted.sort((a, b) => {return(-((b.nrratinguri==0)?b.ratings:b.ratings/b.nrratinguri) + ((a.nrratinguri==0)?a.ratings:a.ratings/a.nrratinguri))});
        break;
      case 'Most rated':
        sorted = sorted.sort((a, b) => b.nrratinguri - a.nrratinguri);
        break;
      case 'Least rated':
        sorted = sorted.sort((a, b) => a.nrratinguri - b.nrratinguri);
        break;
      case 'Name':
        sorted = sorted.sort((a, b) =>{
          if(b.title<a.title) return 1;
          else return -1;
        });
        break;
      default:
        break;
    }

    setFilteredRecipes(sorted);
  };
  function Aprox (a) {
    if(a+0.4>(Math.floor(a+1))) return Math.floor(a+1)
    else return Math.floor(a)
  }
  const handleSortSelection = (option) => {
    setSortOption(option);
    setIsSortOpen(false);
    sortRecipes(option);
  };

  const closeModal = () => {
    setSelectedRecipe(null);document.documentElement.style.overflow = '';
  };
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);document.documentElement.style.overflow = 'hidden';
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
                  <img className="linieoriz" src={linieorizontala}></img>
                  <p onClick={() => handleSortSelection('Name')}>Name</p>
                </div>
              )}
            </div>
          </div>

          <div className={`grid-container ${isMobile && 'mobil'}`}>
          {isLoading && <div className='spinner'></div>}
            {filteredRecipes.map((recipe, index) => (
              <div className={`grid-item ${isMobile && 'mobil'}`} onClick={() => handleRecipeClick(recipe)} key={index}>
                <img src={`http://localhost:5000${recipe.image}`} alt="recipe" />
                <img className="linieoriz" src={linieorizontala} alt="linie"></img>
                <div className='informatii recipe'>
                  <p className='titlureteta recipe'>
                    {recipe.title}
                  </p>
                  <div className='stars'>
                    {"★".repeat(Aprox((recipe.nrratinguri==0)?recipe.ratings:recipe.ratings/recipe.nrratinguri))}
                    {"☆".repeat(5 - Aprox((recipe.nrratinguri==0)?recipe.ratings:recipe.ratings/recipe.nrratinguri))}
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
      {selectedRecipe && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className={`modal-content ${isMobile&&'mobile'}`} onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>✖</button>
            <div className={`flex ${!isMobile&&'flex-row'} ${isMobile&&'flex-col'} modal-inf`}>
              <img src={`http://localhost:5000${selectedRecipe.image}`} alt={selectedRecipe.title} />
              <div className='flex flex-col descriereinf'>
                <h2>{selectedRecipe.title}</h2>
                <div>
                  <p className='rateRecipe'>
                    {"★".repeat(Aprox((selectedRecipe.nrratinguri==0)?selectedRecipe.ratings:selectedRecipe.ratings/selectedRecipe.nrratinguri))}
                    {"☆".repeat(5 - Aprox((selectedRecipe.nrratinguri==0)?selectedRecipe.ratings:selectedRecipe.ratings/selectedRecipe.nrratinguri))}
                  </p>
                </div>
                <p>Nr ratinguri </p><p>{selectedRecipe.nrratinguri}</p>
                <p>Author:</p><p>{selectedRecipe.author}</p>
              </div>
              {!isMobile&&<div className='flex flex-col rate'><h2>Rate this recipe</h2>
                <p className='rateRecipe pointer'>
                  {Array(5)
                    .fill()
                    .map((_, index) => (
                      <span
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)} 
                        onMouseLeave={handleMouseLeave} 
                        onClick={() => handleMouseClick(index)}
                      >
                        {index < (hoveredRating ||finalRating)? "★" : "☆"}
                      </span>
                    ))}
                </p>
                <button
                  type="submit"
                  className={`add-recipe-button login add recenzie ${isMobile && 'mobile'}`}
                  onClick={() => handleSubmit(selectedRecipe,finalRating)}
                >
                  Submit
                </button>
              </div>}
            </div>
            <div className='flex'><div className='w-75'><h3>Description</h3></div></div>
            <svg viewBox="0 0 292 2" xmlns="http://www.w3.org/2000/svg">
              <line y1="1" x2="292" y2="1" stroke="#009C41" stroke-width="2" className='linieoriz' />
            </svg>


            <div className='flex descriereretetamodal'><div className='w-75' ><p>{selectedRecipe.description}</p></div></div>
            {isMobile&&<div className='flex flex-col rate mobile'><h2>Rate this recipe</h2>
                <p className='rateRecipe pointer'>
                  {Array(5)
                    .fill()
                    .map((_, index) => (
                      <span
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)} 
                        onMouseLeave={handleMouseLeave} 
                        onClick={() => handleMouseClick(index)}
                      >
                        {index < (hoveredRating ||finalRating)? "★" : "☆"}
                      </span>
                    ))}
                </p>
                <button
                  type="submit"
                  className={`add-recipe-button login add recenzie ${isMobile && 'mobile'}`}
                  onClick={() => handleSubmit(selectedRecipe,finalRating)}
                >
                  Submit
                </button>
              </div>}
            {deleteButton(selectedRecipe.author)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
