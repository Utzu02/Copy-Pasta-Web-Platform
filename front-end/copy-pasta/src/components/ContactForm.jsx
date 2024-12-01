
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
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
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div></div>
                    <div className=''>
                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
}
export default ContactFrom