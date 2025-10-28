'use client';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../lib/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data.products);
    } catch (error) {
      setError(error.error || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ 
        textAlign: 'center', 
        color: 'white', 
        marginBottom: '2rem', 
        fontSize: '2.5rem',
        marginTop: '2rem'
      }}>
        🎯 Live Auctions
      </h1>

      {loading && <div className="loading">Loading products...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && (
        <div className="products-grid">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="loading">No products available yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
