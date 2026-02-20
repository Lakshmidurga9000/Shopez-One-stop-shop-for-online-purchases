import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../contexts/CartContext";
import "./Home.css";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Navbar />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          padding: '50px',
          flex: 1
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #000000, #fecaca)',
            color: 'white',
            padding: '4rem 5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            textAlign: 'center',
            maxWidth: '700px',
            width: '100%',
            transform: 'translateY(-20px)',
            animation: 'fadeInUp 0.6s ease-out'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold', color: 'white' }}>Your Cart is Empty</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: 1.6, color: 'white' }}>
              Add some products to your cart to see them here!
            </p>
            <button
              onClick={() => navigate('/home#products')}
              style={{
                background: 'white',
                color: '#000000',
                padding: '1.2rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                border: '2px solid #000000',
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'scale(1.05)'
              }}
            >
              🛍️ Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
    }}>
      <Navbar />
      <div className="cart-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Shopping Cart</h2>
        
        <div className="cart-items" style={{ display: 'grid', gap: '20px', marginBottom: '30px' }}>
          {cart.map(item => (
            <div key={item.id} className="cart-item" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '20px', 
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius)', 
              backgroundColor: 'var(--surface)',
              boxShadow: 'var(--shadow)'
            }}>
              <img src={item.img} alt={item.name} style={{ 
                width: '100px', 
                height: '100px', 
                objectFit: 'cover', 
                marginRight: '20px',
                borderRadius: 'var(--radius)'
              }} />
              
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px 0', color: 'var(--text-primary)' }}>{item.name}</h3>
                <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '14px' }}>{item.brand} • Quantity: {item.quantity}</p>
                <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '14px' }}>₹{item.price}</p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{ 
                    padding: '5px 10px', 
                    border: '1px solid var(--border)', 
                    background: 'var(--surface)',
                    cursor: 'pointer',
                    borderRadius: 'var(--radius)'
                  }}
                >
                  -
                </button>
                <span style={{ minWidth: '30px', textAlign: 'center', color: 'var(--text-primary)', fontSize: '14px', fontWeight: 'bold' }}>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ 
                    padding: '5px 10px', 
                    border: '1px solid var(--border)', 
                    background: 'var(--surface)',
                    cursor: 'pointer',
                    borderRadius: 'var(--radius)'
                  }}
                >
                  +
                </button>
              </div>
              
              <div style={{ textAlign: 'right', marginLeft: '20px' }}>
                <p style={{ margin: '0', color: 'var(--text-primary)', fontWeight: 'bold' }}>₹{item.price * item.quantity}</p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ 
                    background: 'var(--accent-color)',
                    color: 'white',
                    border: 'none', 
                    padding: '5px 10px',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary" style={{ 
          textAlign: 'right', 
          padding: '20px', 
          border: '1px solid var(--border)', 
          borderRadius: 'var(--radius)', 
          backgroundColor: 'var(--surface)',
          boxShadow: 'var(--shadow)'
        }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <hr style={{ margin: '15px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <strong>Subtotal:</strong>
            <strong>₹{getTotalPrice()}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>Total: ₹{getTotalPrice()}</h4>
          </div>
          <button 
            onClick={handleCheckout}
            style={{ 
              background: 'var(--primary-color)', 
              color: 'white', 
              border: 'none', 
              padding: '15px 30px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
              marginTop: '10px',
              transition: 'all 0.2s ease'
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
