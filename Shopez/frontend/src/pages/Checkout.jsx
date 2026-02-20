import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../contexts/CartContext";
import { useOrders } from "../contexts/OrderContext";
import { sendOrderConfirmationEmail, requestNotificationPermission } from "../utils/emailService";
import "./Home.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();

  // Request notification permission on component mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    
    // Validate shipping info
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    const missingFields = requiredFields.filter(field => !shippingInfo[field]);
    
    if (missingFields.length > 0) {
      alert('Please fill in all required shipping information');
      return;
    }

    // Validate payment info
    if (paymentMethod === 'upi' && !upiId) {
      alert('Please enter UPI ID');
      return;
    }
    
    if (paymentMethod === 'card' && (!cardNumber || !cardName || !expiryDate || !cvv)) {
      alert('Please fill in all card details');
      return;
    }

    // Create order data
    const orderData = {
      items: cart,
      total: getTotalPrice(),
      shipping: shippingInfo,
      payment: {
        method: paymentMethod,
        details: paymentMethod === 'upi' ? upiId : 
                paymentMethod === 'card' ? `****${cardNumber.slice(-4)}` : 
                'Cash on Delivery'
      }
    };

    // Save order
    const newOrder = addOrder(orderData);
    
    // Send confirmation email (async)
    sendOrderConfirmationEmail({
      shipping: shippingInfo,
      order: newOrder,
      total: getTotalPrice()
    }).then(emailResult => {
      console.log('Email result:', emailResult);
    });
    
    // Clear cart
    clearCart();
    
    // Show success message and navigate to orders
    alert(`Order placed successfully!\n\nOrder ID: ${newOrder.id}\nTotal: ₹${getTotalPrice()}\nPayment Method: ${paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI' : 'Card'}\n\n📧 Order confirmation email is being sent to ${shippingInfo.email}\n\nCheck browser notifications for email status!`);
    
    // Navigate to orders page
    navigate('/orders');
  };

  if (cart.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
      }}>
        <Navbar />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          padding: '50px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #000000, #fecaca)',
            color: 'white',
            padding: '3rem 4rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Your Cart is Empty</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
              Add some products to your cart before checkout!
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'white',
                color: 'var(--primary-color)',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow)'
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
      <div className="checkout-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Checkout</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Shipping Information */}
          <div className="shipping-info" style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Shipping Information</h3>
            <form onSubmit={handleCheckout}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Address *</label>
                <textarea
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={shippingInfo.pincode}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>
            </form>
          </div>
          
          {/* Order Summary & Payment */}
          <div>
            {/* Order Summary */}
            <div className="order-summary" style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', boxShadow: 'var(--shadow)' }}>
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
                <h4>Total:</h4>
                <h4>₹{getTotalPrice()}</h4>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="payment-method" style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Payment Method</h3>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: 'var(--text-secondary)' }}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                  Cash on Delivery
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: 'var(--text-secondary)' }}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                  UPI Payment
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: 'var(--text-secondary)' }}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                  Credit/Debit Card
                </label>
              </div>
              
              {/* UPI Payment */}
              {paymentMethod === 'upi' && (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>UPI ID</label>
                  <input
                    type="text"
                    placeholder="your-upi-id@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                  />
                </div>
              )}
              
              {/* Card Payment */}
              {paymentMethod === 'card' && (
                <div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength="19"
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        maxLength="5"
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}>CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength="3"
                        style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                onClick={handleCheckout}
                style={{
                  width: '100%',
                  background: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  padding: '15px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  marginTop: '20px',
                  transition: 'all 0.2s ease'
                }}
              >
                Place Order - ₹{getTotalPrice()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
