import { Link, useNavigate } from 'react-router-dom'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ErrorModal from './ErrorModal';
import './LoginBox.css';
import { useCart } from './CartContext'; 

function LoginBox() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const { updateLoggedInUser } = useCart(); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Login btn clicked");
        
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!username || !password) {
            setError("Input-fields cannot be empty. Please fill out both username and password.");
            return;
        }
        if (!emailPattern.test(username)) {
            setError("Invalid username format. Please enter a valid email (e.g., username@domain.com).");
            return;
        }
    
        try {
            const response = await fetch('https://js2-ecommerce-api.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: username,
                    password: password,
                }),
            });

            console.log(response); 
    
            const data = await response.json();
            console.log(data);
    
            if (response.ok) {
                
                localStorage.removeItem('authToken');
                localStorage.setItem('authToken', data.token); 
                const token = localStorage.getItem("authToken");
                console.log("Saved token:", token);
                
                
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const decoded = JSON.parse(atob(base64));
                updateLoggedInUser(decoded.id); 

                navigate('/products');
            } else {
                setError(data.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            setError("Network error. Please try again later.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        localStorage.removeItem("modalShown"); 
        updateLoggedInUser(null); 
        navigate('/login'); 
    };

    return (
        <div>
            <form className="loginbox-form" onSubmit={handleSubmit}>
                <FontAwesomeIcon icon={faUser} className='loginbox-user-icon'/>
                <p className='loginbox-login-text'>Please login to your account</p>
                <p className='loginbox-email-text'>
                    <Link to="/SignupPage">Dont have an account yet? Signup here!</Link>
                </p>
                
                <input 
                    className="loginbox-input loginbox-username"
                    type="text" 
                    placeholder="Användarnamn" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                />
                
                <input 
                    className="loginbox-input loginbox-password"
                    type="password"
                    placeholder="Lösenord" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
        
                <div className="loginbox-rememberMeContainer">
                    <input 
                        id="rememberMe" 
                        type="checkbox"
                        checked={rememberMe} 
                        onChange={() => setRememberMe(!rememberMe)} 
                    />
                    <label className="loginbox-rememberMe" htmlFor="rememberMe">Please keep me logged in</label>
                </div>
                
                <button className="loginbox-login-btn" type="submit">Log In</button>
                
                {error && (
                    <ErrorModal 
                        message={error} 
                        onClose={() => setError("")} 
                    />
                )}
            </form>

            
            <div>
                {!localStorage.getItem('authToken') ? (
                    <Link to="/login">Logga in</Link>
                ) : (
                    <button onClick={handleLogout}>Logga ut</button>
                )}
            </div>
        </div>
    );
}

export default LoginBox;