import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { user, isLoggedIn, logout } = useAuth();

  const scrollToProducts = () => {
    navigate("/");
    setTimeout(() => {
      const productsSection = document.querySelector('.shop-section');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate("/account");
    } else {
      navigate("/account");
    }
  };

  return (
    <nav className="navbar" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      width: '100%',
      margin: '0',
      boxSizing: 'border-box',
      zIndex: '1000',
      background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>

      {/* LEFT SIDE — LOGO */}
      <div className="logo" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--primary-color)'
      }}>
        🛍️ <span style={{ color: 'var(--primary-color)' }}>ShopEZ Store</span>
      </div>

      {/* RIGHT SIDE — MENU */}
      <div className="nav-menu" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <Link to="/home" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius)',
          textDecoration: 'none',
          color: 'var(--text-primary)',
          transition: 'all 0.2s ease',
          fontWeight: 'bold'
        }}>
          🏠 Home
        </Link>
        
        <Link to="/home#products" 
          onClick={scrollToProducts} 
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius)',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            transition: 'all 0.2s ease',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--primary-color)';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'var(--text-primary)';
          }}
        >
          📦 Products
        </Link>
        
        <Link to="/cart" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius)',
          textDecoration: 'none',
          color: 'var(--text-primary)',
          transition: 'all 0.2s ease',
          position: 'relative',
          fontWeight: 'bold'
        }}>
          🛒 Cart 
          {getCartCount() > 0 && (
            <span style={{
              background: 'var(--accent-color)',
              color: 'var(--text-primary)',
              borderRadius: '50%',
              padding: '0.125rem 0.5rem',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              minWidth: '1.5rem',
              textAlign: 'center'
            }}>
              {getCartCount()}
            </span>
          )}
        </Link>
        
        <Link to="/orders" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius)',
          textDecoration: 'none',
          color: 'var(--text-primary)',
          transition: 'all 0.2s ease',
          fontWeight: 'bold'
        }}>
          📋 My Orders
        </Link>
        
        <div 
          onClick={handleAccountClick}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius)',
            color: 'var(--text-primary)',
            transition: 'all 0.2s ease',
            fontWeight: 'bold',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--primary-color)';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'var(--text-primary)';
          }}
        >
          👤 {isLoggedIn ? user.name : 'Account'}
          {isLoggedIn && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'var(--accent-color)',
              color: 'white',
              borderRadius: '50%',
              width: '8px',
              height: '8px',
              fontSize: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              ✓
            </span>
          )}
        </div>
      </div>

    </nav>
  );
}
