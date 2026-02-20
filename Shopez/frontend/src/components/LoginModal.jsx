import React, { useState } from 'react';
import './LoginModal.css';

export default function LoginModal({ isOpen, onClose, onLogin, isSignup = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [existingAccounts, setExistingAccounts] = useState([
    'test@example.com', 
    'user@example.com', 
    'admin@example.com'
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if it's login mode and user doesn't have account
    if (!isSignup) {
      // Check if user has account in database
      const hasAccount = existingAccounts.includes(formData.email);
      
      if (!hasAccount) {
        alert('Please create account');
        return;
      }
      
      // Login existing user
      const userData = {
        id: 1,
        name: formData.name,
        email: formData.email
      };
      onLogin(userData);
      onClose();
    } else {
      // Create account - don't login directly
      alert('Account created successfully! Please sign in to continue.');
      // Add email to existing accounts
      setExistingAccounts([...existingAccounts, formData.email]);
      onClose();
      // Reset form for login
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form" style={{ textAlign: 'left' }}>
          <div className="form-group" style={{ textAlign: 'left', alignItems: 'flex-start' }}>
            <label style={{ textAlign: 'left', display: 'block', float: 'left', clear: 'both' }}>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              style={{ textAlign: 'left', display: 'block', float: 'left', clear: 'both', width: '100%' }}
            />
          </div>
          
          <div className="form-group" style={{ textAlign: 'left', alignItems: 'flex-start' }}>
            <label style={{ textAlign: 'left', display: 'block', float: 'left', clear: 'both' }}>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              style={{ textAlign: 'left', display: 'block', float: 'left', clear: 'both', width: '100%' }}
            />
          </div>
          
          <div className="form-group" style={{ textAlign: 'left', alignItems: 'flex-start' }}>
            <label style={{ textAlign: 'left', display: 'block', float: 'left', clear: 'both' }}>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              style={{ textAlign: 'left', display: 'block', float: 'left', clear: 'both', width: '100%' }}
            />
          </div>
          
          {isSignup && (
            <div className="form-group" style={{ textAlign: 'left', alignItems: 'flex-start' }}>
              <label style={{ textAlign: 'left', display: 'block', float: 'left', clear: 'both' }}>Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
                style={{ textAlign: 'left', display: 'block', float: 'left', clear: 'both', width: '100%' }}
              />
            </div>
          )}
          
          <button type="submit" className="submit-button">
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>
          
          {isSignup && (
            <p style={{ 
              fontSize: '0.9rem', 
              color: 'rgba(255,255,255,0.8)', 
              textAlign: 'left',
              marginTop: '1rem',
              marginBottom: '1rem'
            }}>
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '0.9rem'
                }}
              >
                Sign In
              </button>
            </p>
          )}
        </form>
        
        <div className="modal-footer">
          {!isSignup && (
            <p style={{ 
              fontSize: '0.9rem', 
              color: 'rgba(255,255,255,0.8)', 
              textAlign: 'center'
            }}>
              New to ShopEZ?{' '}
              <button 
                type="button" 
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '0.9rem'
                }}
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
