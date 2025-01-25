import './App.css';
import Navbar from './Navbar';
import LoginBox from './LoginBox';
import SignupPage from './SignupPage';
import ShoppingCart from './ShoppingCart';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Contacts from './Contacts';
import './Contacts.css';
import './Registration.css';
import Products from './Products';
import './Products.css';
import { CartProvider } from './CartContext'; 
import ProductDetail from './ProductDetail'; 
import OrderSummary from './OrderSummary';
import OrderHistory from './OrderHistory';
import './OrderHistory.css';


function App() {
  const isLoggedIn = localStorage.getItem('authToken') !== null;

  return (
    <CartProvider> 
      <BrowserRouter>
        <div>
          <div className="navbar">
            <Navbar isLoggedIn={isLoggedIn} />
          </div>

          <Routes>
            <Route path="/SignupPage" element={<div className="loginbox"><SignupPage /></div>} />
            <Route path="/login" element={<div className="loginbox"><LoginBox /></div>} />
            <Route path="/" element={isLoggedIn ? <Navigate to="/products" /> : <LoginBox />} />
            <Route path="/cart" element={<div className="shoppingcart"><ShoppingCart /></div>} />
            <Route path="/contacts" element={<div className="contacts"><Contacts /></div>} />
            <Route path="/OrderSummary" element={<OrderSummary/>} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/products" element={<div className="products"><Products /></div>} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
