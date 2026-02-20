import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { OrderProvider } from "./contexts/OrderContext";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/theme.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";

export default function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <BrowserRouter>
            <div style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div className="scrollable" style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden'
              }}>
                <Routes>
                  <Route path="/" element={<Account />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}
