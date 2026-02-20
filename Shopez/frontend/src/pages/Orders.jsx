import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useOrders } from "../contexts/OrderContext";
import { sendOrderCancellationEmail, requestNotificationPermission } from "../utils/emailService";
import "./Home.css";

export default function Orders() {
  const { orders, cancelOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  // Request notification permission on component mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return '#ff9800';
      case 'Shipped': return '#2196f3';
      case 'Delivered': return '#4caf50';
      case 'Cancelled': return '#f44336';
      default: return '#666';
    }
  };

  const handleCancelOrder = (order) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      // Cancel the order (remove from list) immediately
      cancelOrder(order.id);
      
      // Send cancellation email (async)
      sendOrderCancellationEmail({
        shipping: order.shipping,
        order: order,
        total: order.total
      }).then(emailResult => {
        console.log('Cancellation email result:', emailResult);
      });
      
      alert(`Order #${order.id} cancelled successfully!\n\n📧 Cancellation email is being sent to ${order.shipping.email}\n\nCheck browser notifications for email status!\n\n${order.payment.method !== 'cod' ? `Refund of ₹${order.total} will be processed within 5-7 business days.` : 'No payment was made (Cash on Delivery).'}`);
    }
  };

  if (orders.length === 0) {
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
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold', color: 'white' }}>No Orders Yet</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: 1.6, color: 'white' }}>
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <button
              onClick={() => {
                navigate('/home#products');
                setTimeout(() => {
                  const productsSection = document.getElementById('products');
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
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
      <div className="orders-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>My Orders</h2>
        
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card" style={{ 
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius)', 
              marginBottom: '20px',
              backgroundColor: 'var(--surface)',
              boxShadow: 'var(--shadow)'
            }}>
              {/* Order Header */}
              <div style={{ 
                padding: '15px 20px', 
                borderBottom: '1px solid var(--border)', 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Order ID: {order.id}</h4>
                  <p style={{ margin: '5px 0 0 0', color: 'var(--text-secondary)' }}>
                    Placed on {formatDate(order.orderDate)}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    backgroundColor: getStatusColor(order.status),
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: 'var(--radius)',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ padding: '20px' }}>
                <div className="order-items" style={{ marginBottom: '15px' }}>
                  {order.items.map(item => (
                    <div key={item.id} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: '10px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid var(--border)'
                    }}>
                      <img src={item.img} alt={item.name} style={{ 
                        width: '60px', 
                        height: '60px', 
                        objectFit: 'cover', 
                        marginRight: '15px',
                        borderRadius: 'var(--radius)'
                      }} />
                      <div style={{ flex: 1 }}>
                        <h5 style={{ margin: '0 0 5px 0', color: 'var(--text-primary)' }}>{item.name}</h5>
                        <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '14px' }}>
                          {item.brand} • Quantity: {item.quantity}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                          ₹{item.price * item.quantity}
                        </p>
                        <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '12px' }}>
                          ₹{item.price} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Details */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '20px',
                  marginBottom: '15px'
                }}>
                  <div>
                    <h5 style={{ margin: '0 0 10px 0', color: 'var(--text-primary)' }}>Shipping Address</h5>
                    <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.4' }}>
                      <strong>{order.shipping.fullName}</strong><br />
                      {order.shipping.address}<br />
                      {order.shipping.city}, {order.shipping.state} - {order.shipping.pincode}<br />
                      📞 {order.shipping.phone}<br />
                      📧 {order.shipping.email}
                    </p>
                  </div>
                  
                  <div>
                    <h5 style={{ margin: '0 0 10px 0', color: 'var(--text-primary)' }}>Payment Details</h5>
                    <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.4' }}>
                      <strong>Method:</strong> {order.payment.method === 'cod' ? 'Cash on Delivery' : 
                                          order.payment.method === 'upi' ? 'UPI' : 'Card'}<br />
                      <strong>Details:</strong> {order.payment.details}<br />
                      <strong>Estimated Delivery:</strong><br />
                      {formatDate(order.estimatedDelivery)}
                    </p>
                  </div>
                </div>

                {/* Order Total */}
                <div style={{ 
                  textAlign: 'right', 
                  paddingTop: '15px', 
                  borderTop: '1px solid var(--border)'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: 'var(--text-primary)' }}>Total: ₹{order.total}</h4>
                  {order.status === 'Processing' && (
                    <button
                      onClick={() => handleCancelOrder(order)}
                      style={{
                        background: 'var(--accent-color)',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius)',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
