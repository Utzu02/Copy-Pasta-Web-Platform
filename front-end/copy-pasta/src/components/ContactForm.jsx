
import React, { useState } from 'react';
import './Contact.css';
import './../styles/AllStyles.css'

const ContactFrom = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validare câmpuri
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        // Dacă există erori, le afișăm și nu trimitem formularul
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Dacă nu există erori, trimitem datele (exemplu: log în consolă)
        console.log('Form Data Submitted:', formData);

        // Resetează formularul (opțional)
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            message: '',
        });
        setErrors({});
    };


    return (
        <div className="contact">
            <h2>Contact us</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className='flex form-div'>
                    <div className='flex nume'>
                        <div className="form-group">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                        </div></div>
                    <div className=''>
                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                            {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
                        </div>
                    </div>
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
}
export default ContactFrom