import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login - in real app, this would call API
    const userData = {
      id: 1,
      name: formData.name,
      email: formData.email
    };
    login(userData);
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="login-container" style={{
        background: 'linear-gradient(135deg, #000000, #fecaca)',
        color: 'white',
        padding: '3rem 4rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%',
        position: 'relative'
      }}>
        {/* User Details in Left Corner */}
        <div style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          background: 'rgba(255,255,255,0.1)',
          padding: '1rem',
          borderRadius: 'var(--radius)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: 'var(--text-primary)',
          fontSize: '0.9rem',
          textAlign: 'left',
          maxWidth: '200px'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)' }}>👤 User Info</h4>
          <p style={{ margin: '0.25rem 0', fontSize: '0.8rem', lineHeight: '1.4' }}>
            Welcome back! Sign in to access your profile and order history.
          </p>
        </div>

        {/* Centered Login Form */}
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', fontWeight: 'bold' }}>
            Welcome Back
          </h1>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 'var(--radius)',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 'var(--radius)',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>
            
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 'var(--radius)',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>
          <button type="submit" style={{
            background: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius)',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            🏠 Back to Shopping
          </button>
        </form>
      </div>
    </div>
  );
}
