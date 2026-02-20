import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../contexts/CartContext";
import "./Home.css";
import handbagImage from "../assets/images/hand.png";
import dressImage from "../assets/images/dress.png";
import braceletImage from "../assets/images/bracelet.jpg";
import heelsImage from "../assets/images/heel.jpg";
import backImage from "../assets/images/back.avif";
export default function Home() {

  const navigate = useNavigate();
  const productRef = useRef();
  const { addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState("");

  // Demo girls products
  const allProducts = [
    { id: 1, name: "Pink Handbag", brand: "Zara", category: "Accessories", price: 1999, img: handbagImage },
    { id: 2, name: "Floral Dress", brand: "H&M", category: "Clothing", price: 2499, img: dressImage },
    { id: 3, name: "Gold Bracelet", brand: "Forever21", category: "Jewelry", price: 899, img: braceletImage },
    { id: 4, name: "Stylish Heels", brand: "Zara", category: "Footwear", price: 2999, img: heelsImage }
  ];

  const [products, setProducts] = useState(allProducts);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  // Filtering logic
  useEffect(() => {
    let filtered = allProducts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Brand filter
    if (brand) filtered = filtered.filter(p => p.brand === brand);
    // Category filter
    if (category) filtered = filtered.filter(p => p.category === category);
    // Price filter
    if (price === "low") filtered = filtered.filter(p => p.price < 1500);
    if (price === "high") filtered = filtered.filter(p => p.price >= 1500);

    setProducts(filtered);
  }, [brand, category, price, searchTerm]);

  // Scroll function
  const scrollToProducts = () => {
    productRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
      paddingTop: '80px'
    }}>
      <Navbar />

      {/* HERO */}
      <div className="hero" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #000000, #fecaca)',
        color: 'white',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        gap: '3rem'
      }}>
        <div className="hero-left" style={{ flex: '2', maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold', color: '#ef4444' }}>
            Shop Girls Fashion
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Discover stylish clothing, accessories, and jewelry curated
            for modern women.
          </p>

          <button 
            onClick={scrollToProducts}
            className="btn"
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

        <div className="hero-right" style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={backImage}
            alt="fashion"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              objectFit: 'contain',
              maxHeight: '500px',
              border: '2px solid transparent',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.border = '2px solid var(--primary-color)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.border = '2px solid transparent';
              e.target.style.transform = 'scale(1)';
            }}
          />
        </div>
      </div>

      {/* SEARCH BAR */}
      <div style={{
        maxWidth: '800px',
        margin: '2rem auto', // Center the search bar
        padding: '0 2rem'
      }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="🔍 Search for products, brands, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 3rem 1rem 1rem',
              border: '2px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--surface)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              boxShadow: 'var(--shadow)',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary-color)';
              e.target.style.boxShadow = '0 0 0 3px rgb(99 102 241 / 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border)';
              e.target.style.boxShadow = 'var(--shadow)';
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              style={{
                position: 'absolute',
                right: '1rem',
                background: 'var(--text-muted)',
                border: 'none',
                borderRadius: '50%',
                width: '2rem',
                height: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1rem',
                color: 'white'
              }}
            >
              ✕
            </button>
          )}
        </div>
        {searchTerm && (
          <p style={{
            marginTop: '0.5rem',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem'
          }}>
            Found {products.length} products matching "{searchTerm}"
          </p>
        )}
      </div>

      {/* PRODUCTS + FILTER */}
      <div id="products" className="shop-section" ref={productRef} style={{
        padding: '2rem 0.5rem 2rem 2rem', // More left padding, less right
        maxWidth: '1400px',
        marginLeft: '8rem', // Increase left margin a little bit more
        marginRight: '0.5rem' // Keep small right margin
      }}>

        {/* FILTER */}
        <div className="filters" style={{
          background: 'var(--surface)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)',
          marginBottom: '3rem' // Increased space between filters and products
        }}>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h3 style={{ 
              color: 'var(--text-primary)', 
              fontSize: '1.2rem',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🔍 Filters
            </h3>

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <select 
                onChange={e => setBrand(e.target.value)} 
                value={brand}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  minWidth: '120px'
                }}
              >
                <option value="">All Brands</option>
                <option value="Zara">Zara</option>
                <option value="H&M">H&M</option>
                <option value="Forever21">Forever21</option>
              </select>

              <select 
                onChange={e => setCategory(e.target.value)} 
                value={category}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  minWidth: '140px'
                }}
              >
                <option value="">All Categories</option>
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Footwear">Footwear</option>
              </select>

              <select 
                onChange={e => setPrice(e.target.value)} 
                value={price}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  minWidth: '120px'
                }}
              >
                <option value="">All Prices</option>
                <option value="low">Below ₹1500</option>
                <option value="high">₹1500+</option>
              </select>

              <button 
                onClick={() => {
                  setBrand("");
                  setCategory("");
                  setPrice("");
                  setProducts(allProducts);
                }}
                className="btn btn-secondary"
                style={{
                  padding: '0.5rem 1rem',
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  whiteSpace: 'nowrap'
                }}
              >
                🔄 Clear
              </button>
            </div>
          </div>

        </div>

        {/* PRODUCTS */}
        <div className="products" style={{
          display: 'grid',
          gridTemplateColumns: products.length === 1 ? '1fr' : 'repeat(4, 1fr)',
          gap: '1.5rem',
          justifyContent: 'flex-start', // Align to left instead of center
          alignItems: 'stretch',
          minHeight: '400px',
          maxWidth: products.length === 1 ? '300px' : '1200px' // Smaller for single product
        }}>

          {products.length > 0 ? (
            products.map(p => (
              <div 
                className="card" 
                key={p.id} 
                onClick={() => navigate(`/product/${p.id}`)}
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow)',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                <img 
                  src={p.img} 
                  alt={p.name} 
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    marginBottom: '1rem',
                    border: '1px solid #000000',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ 
                      color: 'var(--text-primary)', 
                      marginBottom: '0.5rem',
                      fontSize: '1.1rem',
                      fontWeight: '600'
                    }}>
                      {p.name}
                    </h4>
                    <p style={{ 
                      color: 'var(--text-secondary)', 
                      marginBottom: '0.5rem',
                      fontSize: '0.85rem'
                    }}>
                      {p.brand}
                    </p>
                    <p style={{ 
                      color: 'var(--primary-color)', 
                      marginBottom: '1rem',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      ₹{p.price}
                    </p>
                  </div>
                  <button 
                    onClick={() => addToCart(p)}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              width: '100%',
              textAlign: 'center',
              padding: '3rem',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                No products found
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {searchTerm ? `No products match "${searchTerm}"` : 'No products match current filters'}
                {brand && ` (Brand: ${brand})`}
                {category && ` (Category: ${category})`}
                {price && ` (Price: ${price})`}
              </p>
              <button 
                onClick={() => setSearchTerm("")}
                className="btn btn-secondary"
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Clear Search
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
