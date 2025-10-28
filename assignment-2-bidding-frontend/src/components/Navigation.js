'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '../lib/auth';

export default function Navigation() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (auth.isLoggedIn()) {
      setUser(auth.getCurrentUser());
    }
  }, []);

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link href="/" className="logo">
          🏛️ Auction House
        </Link>
        
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          {user && (
            <>
              <li><Link href="/my-products">My Products</Link></li>
              <li><Link href="/create-product">Create Product</Link></li>
            </>
          )}
        </ul>

        {user ? (
          <div className="user-menu">
            <span 
              className="username" 
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: 'pointer', fontWeight: '600' }}
            >
              {user.name}
            </span>
            {showDropdown && (
              <div className="user-dropdown" style={{ display: 'block' }}>
                <Link href="/my-products">My Products</Link>
                <Link href="/create-product">Create Product</Link>
                <a href="#" onClick={handleLogout}>Logout</a>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link href="/login" className="btn btn-secondary">Login</Link>
            <Link href="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
}