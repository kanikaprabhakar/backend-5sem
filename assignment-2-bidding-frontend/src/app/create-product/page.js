'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { productAPI } from '../../lib/api';
import { auth } from '../../lib/auth';

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    bidStartPrice: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!auth.requireAuth()) return;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await productAPI.create({
        ...formData,
        bidStartPrice: parseFloat(formData.bidStartPrice),
        image: formData.image || null
      });
      
      setSuccess('Product created successfully!');
      setTimeout(() => {
        router.push('/my-products');
      }, 1500);
    } catch (error) {
      setError(error.error || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container" style={{ maxWidth: '600px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
        Create New Product
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="image">Image URL (optional)</label>
          <input
            type="url"
            id="image"
            name="image"
            className="form-control"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="bidStartPrice">Starting Bid Price ($)</label>
          <input
            type="number"
            id="bidStartPrice"
            name="bidStartPrice"
            className="form-control"
            value={formData.bidStartPrice}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%' }}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
}