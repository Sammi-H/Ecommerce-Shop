import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

function Navbar() {
    const { cartCount } = useCart();
    const isLoggedIn = localStorage.getItem('authToken');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login'); 
    };

    return (
        <div className="navbar">
            <img src="src/images/Logo.svg" className="logo" alt="Logo" />
            <nav className="navbar-links">
                <Link to="/products" className='navbar-link'>Products</Link>
                <Link to="/contacts" className='navbar-link'>Contact</Link>
                <Link to="/SignupPage" className='navbar-link'>Registration</Link>

                {isLoggedIn && (
                    <Link to="/order-history" className='navbar-link'>Order History</Link>
                )}

                {!isLoggedIn ? (
                    <Link to="/login" className="navbar-link">Login</Link>
                ) : (
                    <button onClick={handleLogout} className="navbar-link">Logout</button>
                )}

                <Link to="/cart" className="navbar-cart">
                    <svg fill="#000000" height="40px" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.066 492.066">
                        <g>
                            <path d="M485.128,100.778c-7.25-10.449-19.168-16.69-31.902-16.69H212.607c-8.981,0-16.272,7.288-16.272,16.278c0,8.987,7.291,16.275,16.272,16.275h240.618c2.051,0,3.99,1,5.167,2.71c1.178,1.685,1.448,3.846,0.731,5.77L414.03,246.495c-0.906,2.454-3.29,4.108-5.899,4.108H155.277L115.001,78.741c-5.01-21.338-23.812-36.25-45.747-36.25h-44.84C10.92,42.491,0,53.42,0,66.906C0,80.395,10.92,91.32,24.414,91.32h43.38l54.232,231.405c4.908,20.918,23.108,35.574,44.474,36.146c-12.56,9.117-20.791,23.812-20.791,40.516c0,27.722,22.46,50.189,50.181,50.189c27.706,0,50.176-22.468,50.176-50.189c0-16.642-8.198-31.281-20.661-40.412h93.623c-12.481,9.131-20.679,23.77-20.679,40.412c0,27.722,22.471,50.189,50.175,50.189c27.723,0,50.198-22.468,50.198-50.189c0-16.642-8.204-31.281-20.678-40.412h22.757c13.495,0,24.416-10.928,24.416-24.415c0-13.486-10.92-24.414-24.416-24.414H169.232l-6.326-26.99h245.226c16.131,0,30.771-10.164,36.399-25.313l45.11-121.396C494.059,124.523,492.374,111.182,485.128,100.778z"/>
                        </g>
                    </svg>
                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </Link>
            </nav>
        </div>
    );
}

export default Navbar;
