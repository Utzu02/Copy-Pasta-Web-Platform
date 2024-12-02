import { useState } from 'react'
import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/AllStyles.css'
import '../styles/ProfileStyle.css'
import '../styles/AddRecipe.css'
import Footer from '../components/Footer';

const AddRecipes = ({ isMobile }) => {
    return (
        <>
        <div className='main'>
            <div className='profil flex'>
                <div className='informatiiBucatar add flex'>
                    <div className='content-nickname informatii add'>
                        <p className='nickname'>Recipe name:</p>
                        <svg width="100%" height="1" viewBox="0 0 412 1" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <line y1="0.5" x2="412" y2="0.5" stroke="white" />
                        </svg>
                    </div>
                    <div className='content-nickname informatii add'>
                        <p className='nickname'>Description:</p>
                        <svg width="100%" height="1" viewBox="0 0 412 1" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <line y1="0.5" x2="412" y2="0.5" stroke="white" />
                        </svg>
                    </div>
                    <div className='upload-photo'>

                    </div>
                    <button className="upload-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.882 6.882a4 4 0 00-5.657 0l-7.071 7.071a4 4 0 105.657 5.657l5.657-5.657m-2.121-2.121a4 4 0 015.657 5.657l-7.071 7.071a4 4 0 01-5.657-5.657l5.657-5.657" />
                        </svg>
                        Upload photo
                    </button>
                    <Link to="/add-recipe" className="add-recipe-button add">
                        Add a recipe
                    </Link>

                </div>
            </div>
        {isMobile&&<Footer isMobile={isMobile} />}
        </div>
        </>
    )
}
export default AddRecipes
