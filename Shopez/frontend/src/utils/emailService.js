// Email service simulation for frontend
// In a real application, this would connect to a backend email service

export const sendOrderConfirmationEmail = (orderData) => {
  const { shipping, order, total } = orderData;
  
  // Simulate email sending with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful email sending
      const emailSent = Math.random() > 0.1; // 90% success rate
      
      if (emailSent) {
        // Show browser notification if permission is granted
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('📧 Email Sent - Order Confirmation', {
            body: `Order confirmation sent to ${shipping.email}`,
            icon: 'https://cdn-icons-png.flaticon.com/512/561/561127.png',
            requireInteraction: true
          });
        }
        
        console.log('✅ ORDER CONFIRMATION EMAIL SENT');
        console.log('To:', shipping.email);
        console.log('Subject:', `Order Confirmation - ShopEZ Store - Order #${order.id}`);
        console.log('Order Details:', orderData);
        
        resolve({
          success: true,
          message: `✅ Order confirmation email successfully sent to ${shipping.email}`,
          emailId: `ORD-${order.id}-${Date.now()}`,
          sentAt: new Date().toISOString(),
          emailContent: {
            to: shipping.email,
            subject: `Order Confirmation - ShopEZ Store - Order #${order.id}`,
            body: generateOrderConfirmationEmail(orderData)
          }
        });
      } else {
        resolve({
          success: false,
          message: `❌ Failed to send email to ${shipping.email}. Please try again.`,
          error: 'SMTP connection failed'
        });
      }
    }, 1500); // Simulate 1.5 second email sending delay
  });
};

export const sendOrderCancellationEmail = (orderData) => {
  const { shipping, order, total } = orderData;
  
  // Simulate email sending with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful email sending
      const emailSent = Math.random() > 0.1; // 90% success rate
      
      if (emailSent) {
        // Show browser notification if permission is granted
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('📧 Email Sent - Order Cancellation', {
            body: `Cancellation notice sent to ${shipping.email}`,
            icon: 'https://cdn-icons-png.flaticon.com/512/3462/3462599.png',
            requireInteraction: true
          });
        }
        
        console.log('✅ ORDER CANCELLATION EMAIL SENT');
        console.log('To:', shipping.email);
        console.log('Subject:', `Order Cancellation - ShopEZ Store - Order #${order.id}`);
        console.log('Order Details:', orderData);
        
        resolve({
          success: true,
          message: `✅ Order cancellation email successfully sent to ${shipping.email}`,
          emailId: `CAN-${order.id}-${Date.now()}`,
          sentAt: new Date().toISOString(),
          emailContent: {
            to: shipping.email,
            subject: `Order Cancellation - ShopEZ Store - Order #${order.id}`,
            body: generateOrderCancellationEmail(orderData)
          }
        });
      } else {
        resolve({
          success: false,
          message: `❌ Failed to send email to ${shipping.email}. Please try again.`,
          error: 'SMTP connection failed'
        });
      }
    }, 1500); // Simulate 1.5 second email sending delay
  });
};

// Generate email content functions
const generateOrderConfirmationEmail = (orderData) => {
  const { shipping, order, total } = orderData;
  return `
🛍️ ORDER CONFIRMATION - ShopEZ Store

Dear ${shipping.fullName},

Thank you for your order! We're excited to get your items to you.

📋 ORDER DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Order ID: ${order.id}
Order Date: ${new Date(order.orderDate).toLocaleDateString()}
Order Time: ${new Date(order.orderDate).toLocaleTimeString()}
Total Amount: ₹${total}
Payment Method: ${order.payment.method === 'cod' ? 'Cash on Delivery' : 
                 order.payment.method === 'upi' ? 'UPI Payment' : 'Credit/Debit Card'}

📦 ITEMS ORDERED:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${order.items.map(item => 
  `• ${item.name} (${item.brand})
  Quantity: ${item.quantity} × ₹${item.price} = ₹${item.price * item.quantity}`
).join('\n\n')}

🏠 SHIPPING ADDRESS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${shipping.fullName}
${shipping.address}
${shipping.city}, ${shipping.state} - ${shipping.pincode}
📞 ${shipping.phone}
📧 ${shipping.email}

🚚 DELIVERY INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Estimated Delivery: ${new Date(order.estimatedDelivery).toLocaleDateString()}
Tracking will be available once your order is shipped.

💳 PAYMENT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${order.payment.method === 'cod' ? 
  'Pay ₹' + total + ' when your order arrives' :
  'Payment processed successfully via ' + order.payment.method
}

📱 TRACK YOUR ORDER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Visit your account on ShopEZ Store to track your order status.

Thank you for shopping with ShopEZ Store! 🎉

Best regards,
ShopEZ Customer Support Team
🌐 www.shopez.com
📞 1800-SHOP-EZ
  `.trim();
};

const generateOrderCancellationEmail = (orderData) => {
  const { shipping, order, total } = orderData;
  return `
❌ ORDER CANCELLATION - ShopEZ Store

Dear ${shipping.fullName},

Your order has been cancelled as per your request.

📋 CANCELLED ORDER DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Order ID: ${order.id}
Original Order Date: ${new Date(order.orderDate).toLocaleDateString()}
Cancelled Amount: ₹${total}
Cancellation Time: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}

📦 CANCELLED ITEMS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${order.items.map(item => 
  `• ${item.name} (${item.brand})
  Quantity: ${item.quantity} × ₹${item.price} = ₹${item.price * item.quantity}`
).join('\n\n')}

💰 REFUND INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${order.payment.method === 'cod' ? 
  '✅ No payment was made (Cash on Delivery order)' :
  `💳 Refund of ₹${total} initiated
   • Payment Method: ${order.payment.method}
   • Refund Method: Same as original payment
   • Processing Time: 5-7 business days
   • Refund ID: REF-${order.id}-${Date.now()}`
}

📧 REFUND UPDATES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You'll receive email updates about your refund status.

We're sorry to see your order cancelled. 
If you need any assistance or have questions, please contact us.

📞 CUSTOMER SUPPORT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: support@shopez.com
Phone: 1800-SHOP-EZ
Hours: 9 AM - 9 PM, 7 days a week

Thank you for your understanding.

Best regards,
ShopEZ Customer Support Team
🌐 www.shopez.com
  `.trim();
};

// Request notification permission with better user experience
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('📧 Notifications Enabled!', {
          body: 'You will receive email notifications for your orders',
          icon: 'https://cdn-icons-png.flaticon.com/512/561/561127.png'
        });
      }
      return permission;
    }
    return Notification.permission;
  }
  return 'denied';
};
