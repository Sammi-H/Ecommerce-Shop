import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (idToRemove) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const index = updatedCart.findIndex(item => item._id === idToRemove);
      if (index !== -1) updatedCart.splice(index, 1);
      return updatedCart;
    });
  };

  const checkout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      setCart([]);
      if (!token) {
        throw new Error('No token found, please log in');
      }

      
  
      const productsToOrder = cart.map(item => {
        if (!item._id) throw new Error('Product in cart is missing an _id');
        return {
          productId: item._id,
          quantity: 1 
        };
      });
  
      const response = await fetch('https://js2-ecommerce-api.vercel.app/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ products: productsToOrder })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }
      
      const data = await response.json();
      setPurchasedItems(cart);
      setCart([]);
      console.log('Order created:', data);
      
    } catch (error) {
      console.error('Checkout failed:', error);
      
    }
  };

  const cartCount = cart.length;


  const updateLoggedInUser = (user) => {
    setLoggedInUser(user);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartCount, 
      purchasedItems, 
      setCart, 
      addToCart, 
      removeFromCart, 
      checkout,
      loggedInUser,
      setLoggedInUser,
      updateLoggedInUser 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
