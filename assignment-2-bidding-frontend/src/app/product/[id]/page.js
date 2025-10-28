'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { productAPI, biddingAPI } from '../../../lib/api';
import { auth } from '../../../lib/auth';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bidError, setBidError] = useState('');
  const [bidSuccess, setBidSuccess] = useState('');
  const [placingBid, setPlacingBid] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(params.id);
      setProduct(response.data.product);
    } catch (error) {
      setError(error.error || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    setPlacingBid(true);
    setBidError('');
    setBidSuccess('');

    try {
      await biddingAPI.place(product.id, parseFloat(bidAmount));
      setBidSuccess('Bid placed successfully!');
      setBidAmount('');
      setTimeout(() => {
        loadProduct();
      }, 1000);
    } catch (error) {
      setBidError(error.error || 'Failed to place bid');
    } finally {
      setPlacingBid(false);
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  const currentUser = auth.getCurrentUser();
  const isOwner = currentUser && currentUser.id === product.user.id;
  const isLoggedIn = auth.isLoggedIn();

  return (
    <div className="product-detail">
      <div className="product-detail-content">
        <div>
          <div 
            className="product-detail-image"
            style={{ background: 'linear-gradient(45deg, #f093fb, #f5576c)' }}
          >
            {product.image && (
              <img 
                src={product.image} 
                alt={product.name}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  borderRadius: '15px' 
                }}
              />
            )}
          </div>
        </div>
        
        <div>
          <h1>{product.name}</h1>
          <p><strong>Seller:</strong> {product.user.name}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Starting Price:</strong> ${product.bidStartPrice}</p>
          {product.biddings.length > 0 && (
            <p><strong>Current Highest Bid:</strong> ${product.biddings[0].bidPrice}</p>
          )}
          
          {!isOwner && isLoggedIn && (
            <div className="bid-section">
              <h3>Place Your Bid</h3>
              <form className="bid-form" onSubmit={handlePlaceBid}>
                <input
                  type="number"
                  className="bid-input"
                  placeholder="Enter bid amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  min={product.biddings.length > 0 ? product.biddings[0].bidPrice + 1 : product.bidStartPrice + 1}
                  step="0.01"
                  required
                />
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={placingBid}
                >
                  {placingBid ? 'Placing...' : 'Place Bid'}
                </button>
              </form>
              {bidError && <div className="error">{bidError}</div>}
              {bidSuccess && <div className="success">{bidSuccess}</div>}
            </div>
          )}
          
          {!isLoggedIn && (
            <p>
              <a href="/login" className="btn btn-primary">Login to place bids</a>
            </p>
          )}
          
          {isOwner && (
            <p><em>This is your product. You cannot bid on it.</em></p>
          )}
        </div>
      </div>
      
      <div className="bids-list">
        <h3>Bidding History</h3>
        {product.biddings.length > 0 ? (
          product.biddings.map((bid, index) => (
            <div key={bid.id} className={`bid-item ${index === 0 ? 'winning-bid' : ''}`}>
              <div>
                <strong>{bid.user.name}</strong>
                {index === 0 && (
                  <span style={{ color: '#51cf66', fontWeight: 'bold' }}>
                    {' '}(Winning Bid)
                  </span>
                )}
              </div>
              <div><strong>${bid.bidPrice}</strong></div>
            </div>
          ))
        ) : (
          <p>No bids yet. Be the first to bid!</p>
        )}
      </div>
    </div>
  );
}