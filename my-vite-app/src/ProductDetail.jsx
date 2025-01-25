import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`https://js2-ecommerce-api.vercel.app/api/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => setError(error.message));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <h3>Price: {product.price} SEK</h3>
      <p>{product.description}</p>
      <ul>
        {product.images.map((image, index) => (
          <li key={index}>
            <img src={image} alt={product.name} style={{ width: "500px" }} />
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/products")}>Back to Products</button>
    </div>
  );
}

export default ProductDetail;
