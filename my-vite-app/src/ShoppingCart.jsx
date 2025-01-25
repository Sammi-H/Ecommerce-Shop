import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

function ShoppingCart() {
  const { cart, setCart, removeFromCart, checkout } = useCart(); 

  if (!cart || !Array.isArray(cart)) return <div>Loading...</div>;

  
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const navigate = useNavigate(); 
  
  const handleCheckout = async () => {
    try {
      await checkout();  
      navigate('/OrderSummary');
    } catch (error) {
      // Visa ett felmeddelande
    }
  };


  const handleEmptyCart = () => {
    setCart([]);
  };


  return (
    <div className="Shoppingcart-container">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your shopping cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={`${item._id || item.id}-${index}`}>
                <h3>{item.name}</h3>
                <p className='price'>Price: {item.price} SEK</p>
                <img src={item.image} alt={item.name}></img>
                <button onClick={() => removeFromCart(item._id)} className="remove-btn">Remove</button>
              </li>
            ))}
          </ul>

          <div className="total-price">
            <h3>Total Price: {totalPrice} SEK</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Check Out
            </button>
            <button className="emptycart-btn" onClick={handleEmptyCart}>Empty Cart</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
