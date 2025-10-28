'use client';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const getRandomGradient = () => {
    const colors = [
      'linear-gradient(45deg, #f093fb, #f5576c)',
      'linear-gradient(45deg, #4facfe, #00f2fe)',
      'linear-gradient(45deg, #43e97b, #38f9d7)',
      'linear-gradient(45deg, #fa709a, #fee140)',
      'linear-gradient(45deg, #a8edea, #fed6e3)',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card">
        <div 
          className="product-image" 
          style={{ background: getRandomGradient() }}
        >
          {product.image && (
            <img 
              src={product.image} 
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
        <div className="product-info">
          <div className="product-name">{product.name}</div>
          <div className="product-description">{product.description}</div>
          <div className="product-price">
            <div className="starting-price">${product.bidStartPrice}</div>
            {product.currentHighestBid && (
              <div className="current-bid">Current: ${product.currentHighestBid}</div>
            )}
          </div>
          <div className="bid-count">{product.totalBids || product.biddings?.length || 0} bid(s)</div>
        </div>
      </div>
    </Link>
  );
}