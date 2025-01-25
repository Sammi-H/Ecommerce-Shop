import { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Ingen inloggning hittades.");
          return;
        }

        const response = await fetch("https://js2-ecommerce-api.vercel.app/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Något gick fel med att hämta orderhistoriken.");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history-container">
    <h1>Orderhistorik</h1>
    {error && <p className="error-message">{error}</p>}
    {orders.length === 0 ? (
      <p className="no-orders">Du har inga tidigare ordrar.</p>
    ) : (
      orders.map((order) => (
        <div key={order._id} className="order-item">
          <h2>Ordernummer: {order._id}</h2>
          <p>Antal produkter: {order.products.length}</p>
          <p className="order-total">
            Summa:{" "}
            {order.products.reduce(
              (sum, product) => sum + product.product.price * product.quantity,
              0
            )}{" "}
            kr
          </p>
          <p className="order-date">Datum: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p className="order-date">Klockslag: {new Date(order.createdAt).toLocaleTimeString()}</p>
        </div>
      ))
    )}
  </div>
  
  );
};

export default OrderHistory;
