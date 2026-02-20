import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import './Account.css';

export default function Account() {
  const { user, isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state for account fields
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleLogin = (userData) => {
    login(userData);
    navigate('/home'); // Go to home page after login
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleViewOrders = () => {
    navigate('/orders');
  };

  const openLoginModal = (signup = false) => {
    setIsSignupMode(signup);
    setShowLoginModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // TODO: Add API call to save account information
    console.log('Saving account info:', formData);
    setIsEditing(false);
    alert('Account information updated successfully!');
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    });
    setIsEditing(false);
  };

  if (!isLoggedIn) {
    return (
      <>
        <style>
          {`
            body footer {
              display: none !important;
            }
          `}
        </style>
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #000000, #fecaca)',
          color: 'white',
          padding: '3rem 4rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%'
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>
            Welcome to ShopEZ
          </h2>
          
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.6' }}>
            Please sign in to access your account details and order history
          </p>
          
          <button
            onClick={() => openLoginModal(false)}
            style={{
              background: 'white',
              color: 'var(--primary-color)',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: 'var(--radius)',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '1rem'
            }}
          >
            Sign In
          </button>
          
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
            New to ShopEZ?{' '}
            <button 
              type="button"
              onClick={() => openLoginModal(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '0.9rem'
              }}
            >
              Contact support to create an account.
            </button>
          </p>
        </div>
        
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          isSignup={isSignupMode}
        />
      </div>
      </>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        padding: '2rem'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #000000, #fecaca)',
          color: 'white',
          padding: '2rem',
          borderRadius: 'var(--radius)',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            👤 My Account
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Welcome back, {user.name}!
          </p>
        </div>

        {/* Account Information Form */}
        <form onSubmit={handleSaveChanges}>
          <div style={{
            background: 'var(--surface)',
            padding: '2rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }}>
                Account Information
              </h2>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ✏️ Edit
                </button>
              )}
            </div>

            {/* Form Fields in Left Column Layout */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1rem'
            }}>
              {/* Name Field */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '1rem',
                    backgroundColor: isEditing ? 'white' : '#f3f4f6',
                    cursor: isEditing ? 'text' : 'not-allowed'
                  }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '1rem',
                    backgroundColor: isEditing ? 'white' : '#f3f4f6',
                    cursor: isEditing ? 'text' : 'not-allowed'
                  }}
                />
              </div>

              {/* Phone Field */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="+1 (555) 123-4567"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '1rem',
                    backgroundColor: isEditing ? 'white' : '#f3f4f6',
                    cursor: isEditing ? 'text' : 'not-allowed'
                  }}
                />
              </div>

              {/* Address Field */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}>
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="123 Main Street"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '1rem',
                    backgroundColor: isEditing ? 'white' : '#f3f4f6',
                    cursor: isEditing ? 'text' : 'not-allowed'
                  }}
                />
              </div>

              {/* City Field */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}>
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="New York"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '1rem',
                    backgroundColor: isEditing ? 'white' : '#f3f4f6',
                    cursor: isEditing ? 'text' : 'not-allowed'
                  }}
                />
              </div>

              {/* State Field */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}>
                  State / Province
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="NY"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '1rem',
                    backgroundColor: isEditing ? 'white' : '#f3f4f6',
                    cursor: isEditing ? 'text' : 'not-allowed'
                  }}
                />
              </div>

              {/* Zip Code Field */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}>
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="10001"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '1rem',
                    backgroundColor: isEditing ? 'white' : '#f3f4f6',
                    cursor: isEditing ? 'text' : 'not-allowed'
                  }}
                />
              </div>

              {/* Country Field */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}>
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="United States"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '1rem',
                    backgroundColor: isEditing ? 'white' : '#f3f4f6',
                    cursor: isEditing ? 'text' : 'not-allowed'
                  }}
                />
              </div>
            </div>

            {/* Edit Mode Buttons */}
            {isEditing && (
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border)'
              }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    background: 'var(--primary-color)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 'var(--radius)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  💾 Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    flex: 1,
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 'var(--radius)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            )}
          </div>
        </form>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleViewOrders}
            style={{
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius)',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            📋 View Orders
          </button>
          
          <button
            onClick={handleLogout}
            style={{
              background: 'var(--accent-color)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius)',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
