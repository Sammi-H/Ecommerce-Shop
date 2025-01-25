import { useState, useEffect } from 'react';
import ErrorModal from './ErrorModal';

function Contacts() {
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        message: '',
        saveInfo: false,
    });

   
    const [errors, setErrors] = useState({});
   
    
   
    const [successMessage, setSuccessMessage] = useState("");

    
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('contactForm')) || {};
        setFormData(prevData => ({
            ...prevData,
            name: storedData.name || '',
            phone: storedData.phone || '',
            email: storedData.email || '',
            company: '',
            message: '',
            saveInfo: false,
        }));
    }, []);

    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const validationErrors = {};
        
        
        if (!formData.name) validationErrors.name = 'Name is required';
        if (!formData.phone) validationErrors.phone = 'Phone number is required';
        if (!formData.email) validationErrors.email = 'Email is required';
        if (!formData.message) validationErrors.message = 'Message is required';
    
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch('https://js2-ecommerce-api.vercel.app/api/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                if (response.status === 200) {
                    setSuccessMessage("Thank you!, your form has now been submitted");
                    if (formData.saveInfo) {
                        
                        localStorage.setItem('contactForm', JSON.stringify({
                            name: formData.name,
                            phone: formData.phone,
                            email: formData.email,
                        }));
                    } else {
                        
                        localStorage.removeItem('contactForm');
                    }
                    
                    setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        company: '',
                        message: '',
                        saveInfo: false,
                    });
                    setErrors({});
                } else {
                    setSuccessMessage("There was an error submitting your form. Please try again.");
                }
            } catch (error) {
                console.log(error);
                setSuccessMessage("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <>
        
        {successMessage && (
            <ErrorModal 
                message={successMessage} 
                onClose={() => setSuccessMessage('')} 
            />
        )}
    
     
        <form className="contact-form" onSubmit={handleSubmit}>
            <label>Write something</label>

            <label>Your Name*</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            {errors.name && <span className="error">{errors.name}</span>}

            <label>Phone Number*</label>
            <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
            />
            {errors.phone && <span className="error">{errors.phone}</span>}

            <label>Your Email*</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <label>Company (optional)</label>
            <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
            />

            <label>Something write*</label>
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
            ></textarea>
            {errors.message && <span className="error">{errors.message}</span>}

            <div className="checkbox-container">
                <input
                    type="checkbox"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleChange}
                />
                <label className="Save-text">Save my name, email, and website in this browser for the next time I comment.</label>
            </div>

            <button type="submit" className="submit-btn">Submit</button>
        </form>
        </>
    );
}

export default Contacts;