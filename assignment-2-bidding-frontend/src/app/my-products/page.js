'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import { productAPI } from '../../lib/api';
import { auth } from '../../lib/auth';

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth.requireAuth()) return;
    loadMyProducts();
  }, []);

  const loadMyProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getMy();
      setProducts(response.data.products);
    } catch (error) {
      setError(error.error || 'Failed to load your products');
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
        📦 My Products
      </h1>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link href="/create-product" className="btn btn-primary">
          + Create New Product
        </Link>
      </div>

      {loading && <div className="loading">Loading your products...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && (
        <div className="products-grid">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="loading">
              You haven't created any products yet. 
              <Link href="/create-product" className="btn btn-primary" style={{ marginLeft: '1rem' }}>
                Create Your First Product
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}