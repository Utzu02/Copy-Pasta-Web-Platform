import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/AllStyles.css';
import '../styles/ProfileStyle.css';
import '../styles/AddRecipe.css';
import Footer from '../components/Footer';

const AddRecipes = ({ menuOpen, isMobile,UID,userName }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);  // Stocăm fișierul separat
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Folosim navigate pentru redirecționare

    // Handler pentru schimbarea valorilor în inputuri
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    };

    // Handler pentru schimbarea imaginii
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);  // Actualizează starea cu fișierul
        }
    };

    // Validarea formularului
    const validate = () => {
        const newErrors = {};
        if (!title) newErrors.title = 'Nu ai completat numele rețetei!';
        if (!description) newErrors.description = 'Nu ai completat descrierea!';
        if (!image) newErrors.image = 'Nu ai adăugat o imagine!';
        return newErrors;
    };

    // Trimiterea formularului
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        try {
            // Creăm un obiect FormData
            const formDataToSend = new FormData();
            formDataToSend.append('title', title);
            formDataToSend.append('description', description);
            formDataToSend.append('author', userName);

            // Dacă fișierul există, îl adăugăm în FormData
            if (image) {
                formDataToSend.append('image', image); // Fișierul
            }
            formDataToSend.append('userID', UID);
            
            console.log(title, description, image);
            for (let [key, value] of formDataToSend.entries()) {
                console.log(`${key}:`, value);
            }
            // Aici se trimite request-ul POST către server
            const response = await fetch('http://localhost:5000/api/recipes', {
                method: 'POST',
                body: formDataToSend, // Trimite FormData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Rețeta adăugată cu succes:', data);
                navigate('/recipes'); // Redirecționează utilizatorul la pagina cu rețete
            } else {
                const errorData = await response.json();
                console.error('Eroare la adăugarea rețetei:', errorData);
                alert('A apărut o eroare la adăugarea rețetei.');
            }
        } catch (error) {
            console.error('Eroare de conexiune:', error);
            alert('A apărut o eroare de conexiune.');
        }
    };

    return (
        <div className={`${menuOpen && 'blur'}`}>
            <div className={`main ${isMobile && 'mobil'}`}>
                <div className={`profil ${isMobile && 'mobile'} flex`}>
                    <form
                        className={`informatiiBucatar add ${isMobile && 'mobil'} flex`}
                        onSubmit={handleSubmit}
                    >
                        <div className={`content-nickname informatii ${isMobile && 'mobil'} add`}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Recipe name:"
                                value={title}
                                onChange={handleChange}
                                className={`nickname ${isMobile && 'mobil'}`}
                            />
                            <svg width="100%" height="1" viewBox="0 0 412 1" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                <line y1="0.5" x2="412" y2="0.5" stroke="white" />
                            </svg>
                            {errors.title && <p className="error">{errors.title}</p>}
                        </div>

                        <div className={`content-nickname informatii ${isMobile && 'mobil'} add`}>
                            <textarea
                                name="description"
                                placeholder="Description:"
                                maxlength="270"
                                value={description}
                                onChange={handleChange}
                                className={`nickname ${isMobile && 'mobil'}`}
                            />
                            <svg width="100%" height="1" viewBox="0 0 412 1" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                <line y1="0.5" x2="412" y2="0.5" stroke="white" />
                            </svg>
                            {errors.description && <p className="error">{errors.description}</p>}
                        </div>

                        <div className={`upload-photo ${isMobile && 'mobil'}`}>
                            <label htmlFor="butonUpload" className={`upload-button ${isMobile && 'mobil'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.882 6.882a4 4 0 00-5.657 0l-7.071 7.071a4 4 0 105.657 5.657l5.657-5.657m-2.121-2.121a4 4 0 015.657 5.657l-7.071 7.071a4 4 0 01-5.657-5.657l5.657-5.657" />
                                </svg>
                                Upload photo
                            </label>
                            <input
                                id="butonUpload"
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                className="none"
                            />
                            {image && <p className="imgtext">{image.name}</p>}
                            {errors.image && <p className="error">{errors.image}</p>}
                        </div>

                        <button type="submit" className={`add-recipe-button add ${isMobile && 'mobile'}`}>
                            Add a recipe
                        </button>
                    </form>
                </div>
                {isMobile && <Footer isMobile={isMobile} />}
            </div>
        </div>
    );
};

export default AddRecipes;
