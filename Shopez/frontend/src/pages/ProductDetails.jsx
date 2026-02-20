import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';
import { useCart } from '../contexts/CartContext';
import handbagImage from '../assets/images/hand.png';
import dressImage from '../assets/images/dress.png';
import braceletImage from '../assets/images/bracelet.jpg';
import heelsImage from '../assets/images/heel.jpg';
import skirtImage from '../assets/images/mini.jpg';
import earringsImage from '../assets/images/silver.jpg';
import jacketImage from '../assets/images/lea.jpg';
import sunglassesImage from '../assets/images/sun.jpg';
import watchImage from '../assets/images/watch.jpg';
import scarfImage from '../assets/images/scarf.jpg';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Add cart context
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Demo products data
  const allProducts = [
    { id: 1, name: "Pink Handbag", brand: "Zara", category: "Accessories", price: 1999, img: handbagImage, description: "Elegant pink handbag with gold hardware, perfect for special occasions. Made from premium materials with attention to detail." },
    { id: 2, name: "Floral Dress", brand: "H&M", category: "Clothing", price: 2499, img: dressImage, description: "Beautiful floral dress with modern cut. Features delicate floral pattern and comfortable fit. Ideal for spring and summer events." },
    { id: 3, name: "Gold Bracelet", brand: "Forever21", category: "Jewelry", price: 899, img: braceletImage, description: "Stunning gold bracelet with intricate design. Hypoallergenic and perfect for daily wear. Adds elegance to any outfit." },
    { id: 4, name: "Stylish Heels", brand: "Zara", category: "Footwear", price: 2999, img: heelsImage, description: "Elegant high heels with comfortable padding. Perfect for formal events and special occasions. Made from quality materials for durability." },
    { id: 5, name: "Mini Skirt", brand: "H&M", category: "Clothing", price: 1299, img: skirtImage, description: "Trendy mini skirt with modern design. Versatile piece that can be dressed up or down. Perfect for casual and semi-formal occasions." },
    { id: 6, name: "Silver Earrings", brand: "Forever21", category: "Jewelry", price: 499, img: earringsImage, description: "Elegant silver earrings with modern design. Lightweight and comfortable for all-day wear. Perfect gift for any occasion." },
    { id: 7, name: "Leather Jacket", brand: "Zara", category: "Clothing", price: 3299, img: jacketImage, description: "Premium leather jacket with modern cut. Perfect for all seasons. Features quality leather and stylish design." },
    { id: 8, name: "Sunglasses", brand: "H&M", category: "Accessories", price: 799, img: sunglassesImage, description: "Stylish sunglasses with UV protection. Perfect for sunny days and fashion statements." },
    { id: 9, name: "Watch", brand: "Forever21", category: "Accessories", price: 1599, img: watchImage, description: "Elegant watch with leather strap. Features precise timekeeping and modern design. Perfect for both casual and formal occasions." },
    { id: 10, name: "Scarf", brand: "Zara", category: "Accessories", price: 899, img: scarfImage, description: "Lightweight scarf with modern pattern. Perfect for layering and adding style to any outfit. Made from soft materials for comfort." }
  ];

  // Find product by ID
  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  // Get related products (same brand or category)
  const getRelatedProducts = () => {
    if (!product) return [];
    const related = allProducts.filter(p => 
      p.id !== product.id && 
      (p.brand === product.brand || p.category === product.category)
    );
    // Return exactly 2-3 products
    return related.slice(0, Math.min(3, Math.max(2, related.length)));
  };

  // Get image height based on product type
  const getImageHeight = (productName) => {
    console.log('Product name:', productName); // Debug log
    if (productName.includes("Mini Skirt") || productName === "Leather Jacket" || productName.includes("Scarf")) {
      console.log('Using taller height for:', productName); // Debug log
      return '220px'; // Taller height for these specific products
    }
    return '180px'; // Default height for other products
  };

  const handleAddToCart = () => {
    // Actually add to cart
    addToCart({
      ...product,
      quantity: quantity
    });
    alert('Product added to cart!');
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleBuyNow = () => {
    // Add product to cart and navigate to checkout
    addToCart({
      ...product,
      quantity: quantity
    });
    navigate('/checkout');
  };

  if (!product) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <Navbar />
        <div style={{
          textAlign: 'center',
          padding: '3rem'
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Product Not Found</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/home#products')}
            style={{
              background: 'var(--primary-color)',
              color: 'white',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
      paddingTop: '80px'
    }}>
      <Navbar />
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        <div className="product-details-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'start',
          padding: '2rem'
        }}>
          {/* Product Image */}
          <div style={{
            flex: '0 0 400px',
            maxWidth: '400px'
          }}>
            <img 
              src={product.img} 
              alt={product.name} 
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid #000000',
                boxShadow: 'var(--shadow-lg)'
              }}
            />
          </div>

          {/* Product Details */}
          <div style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              fontWeight: 'bold'
            }}>
              {product.name}
            </h1>
            
            <div style={{
              display: 'flex',
              gap: '2rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                textAlign: 'left'
              }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Brand</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{product.brand}</p>
              </div>
              
              <div style={{
                textAlign: 'left'
              }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Category</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{product.category}</p>
              </div>
              
              <div style={{
                textAlign: 'left'
              }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Price</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>₹{product.price}</p>
              </div>
            </div>

            {/* Product Description */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Description</h3>
              <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Quantity</h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    background: 'var(--surface)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    width: '40px',
                    height: '40px',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  -
                </button>
                
                <span style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '0.5rem 1rem',
                  fontSize: '1.1rem',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>
                  {quantity}
                </span>
                
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    background: 'var(--surface)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    width: '40px',
                    height: '40px',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <button
                onClick={handleAddToCart}
                style={{
                  background: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flex: '1'
                }}
              >
                🛒 Add to Cart
              </button>
              
              <button
                onClick={handleBuyNow}
                style={{
                  background: 'white',
                  color: 'var(--primary-color)',
                  border: '1px solid var(--primary-color)',
                  borderRadius: 'var(--radius)',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flex: '1'
                }}
              >
                🛍 Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {getRelatedProducts().length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Related Products</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
              minHeight: '300px' // Reduced height
            }}>
              {getRelatedProducts().map(p => (
                <div 
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  style={{
                    background: 'var(--surface)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow)',
                    border: '1px solid var(--border)', // Remove black border from related products
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontWeight: 'bold' // Make related products bold
                  }}
                >
                  <img 
                    src={p.img} 
                    alt={p.name} 
                    style={{
                      width: '100%',
                      height: getImageHeight(p.name), // Use dynamic height based on product
                      objectFit: 'cover',
                      border: '2px solid #000000',
                      borderRadius: 'var(--radius-lg)',
                      margin: '0',
                      display: 'block'
                    }}
                  />
                  <div style={{ padding: '1rem' }}>
                    <h4 style={{ 
                      fontSize: '1rem', 
                      marginBottom: '0.5rem', 
                      color: 'var(--text-primary)',
                      fontWeight: 'bold' // Make product name bold
                    }}>
                      {p.name}
                    </h4>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: 'bold', // Make description text bold
                      color: 'var(--text-secondary)' 
                    }}>
                      {p.brand}
                    </p>
                    <p style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 'bold', 
                      color: 'var(--primary-color)' 
                    }}>
                      ₹{p.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
