import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import WelcomeModal from './WelcomeModal';

function Products() {
  const { addToCart, cartCount, loggedInUser, updateLoggedInUser } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showWelcomeModal, setWelcomeModal] = useState(false);

  useEffect(() => {
    fetch("https://js2-ecommerce-api.vercel.app/api/products")
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Något gick fel med API-anropet, försök igen senare.");
        }
      })
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => setError(error.message));
  }, []);

  const handleFilterChange = (category) => {
    setCategoryFilter(category);
    if (category) {
      const filtered = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Retrieved token:", token);
  
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(base64));
      console.log("Decoded token:", decoded);
      
      
      updateLoggedInUser(decoded.id); 
    }
  }, [updateLoggedInUser]);

  useEffect(() => {
  console.log("loggedInUser updated:", loggedInUser);

  if (loggedInUser && !localStorage.getItem('modalShown')) {
    console.log(loggedInUser);
    setWelcomeModal(true); 
    localStorage.setItem('modalShown', 'true');
  }
}, [loggedInUser]);

  const handleCloseModal = () => {
    setWelcomeModal(false); 
  };

  if (selectedProduct) {
    return (
      <div className='product-detail'>
        <h1>{selectedProduct.name}</h1>
        <h3>Price: {selectedProduct.price} SEK</h3>
        <p>{selectedProduct.description}</p>
        <ul>
          {selectedProduct.images.map((image, index) => (
            <li key={index}>
              <img src={image} alt={selectedProduct.name} style={{ width: "500px" }} />
            </li>
          ))}
        </ul>
        <button onClick={() => setSelectedProduct(null)}>Back to Products</button>
      </div>
    );
  }

  return (
    <>
      {showWelcomeModal && (
        <WelcomeModal 
          message="Välkommen, du är nu inloggad. Tryck på OK för att fortsätta shoppa!" 
          onClose={handleCloseModal} 
        />
      )}
      <div className="products-wrapper">
        <div className="header">
          <h1>Produkter</h1>
          <div className="filter">
            <select onChange={(e) => handleFilterChange(e.target.value)}>
              <option value="">Alla produkter</option>
              <option value="mobiltelefoner">Mobiltelefoner</option>
              <option value="tv">TV</option>
              <option value="dammsugare">Dammsugare</option>
            </select>
          </div>
        </div>

        <div className="products">
          {error ? (
            <p>{error}</p>
          ) : (
            <ul>
              {filteredProducts.map(product => (
                <li key={product._id} className="product-card">
                  <h2>{product.name}</h2>
                  <h3>Price: {product.price} SEK</h3>
                  <p className='description'>{product.description}</p>
                  <p className='info'>{product.category}</p>
                  <p style={{ marginTop: "1em" }} className='info'>Created: {product.createdAt}</p>
                  <p className='info'>Updated: {product.updatedAt}</p>
                  <ul>
                    {product.images.map((image, index) => (
                      <li key={index}>
                        <img src={image} alt={product.name} style={{ width: "100px" }} />
                      </li>
                    ))}
                  </ul>
                  <div className='btn-container'>
                    <button onClick={() => {
                      const token = localStorage.getItem("authToken");
                      console.log("Token:", token); // Kontrollera om token är korrekt
                      addToCart({
                        _id: product._id || `${Date.now()}-${Math.random()}`,
                        name: product.name,
                        price: product.price,
                        image: product.images[0],
                        token: token
                      });
                    }} className='cart-btn'>Add to Cart</button>

                    <button onClick={() => setSelectedProduct(product)}>Product Detail</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
