import React from 'react';
import { useCart } from './CartContext';
import './App.css'; 

function OrderSummary() {
    
    const { purchasedItems } = useCart() || { purchasedItems: [] };

    
    const totalPrice = purchasedItems.reduce((total, item) => total + (item.price || 0), 0);

    const purchaseDate = new Date().toLocaleString();

    return (
        <div className='order-summary-container'>
            <h2>Thank you for your purchase!</h2>
            <h3>Order Summary:</h3>
            {purchasedItems.length === 0 ? (
                <p className="empty-cart-message">Your Cart is empty</p>
            ) : (
                <>
                    <ul>
                        {purchasedItems.map((item) => (
                            <li key={item._id || item.name}> 
                                <h3>{item.name}</h3>
                                <p>Price: {item.price} SEK</p>
                            </li>
                        ))}
                    </ul>

                    <div className="total-price">
                        <h3>Total: {totalPrice} SEK</h3>
                    </div>
                    <p className="purchase-date">Purchase Date: {purchaseDate}</p>
                </>
            )}
        </div>
    );
}

export default OrderSummary;
