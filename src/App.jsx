import { Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import AboutUs from './AboutUs';
import Navbar from './components/Navbar';
import ProductList from './ProductList';
import CartItem from './CartItem';

function LandingPage() {
  const [showProductList, setShowProductList] = useState(false);
  return (
    <main className="app-container">
      <Navbar />
      <section className="hero background-image">
        <div className="hero-content">
          <p className="eyebrow">Welcome to your happy place</p>
          <h1>Welcome to Paradise Nursery</h1>
          <p className="hero-copy">Beautiful, healthy houseplants chosen to make everyday spaces feel a little more alive.</p>
          <Link className="primary-button get-started-button" to="/plants" onClick={() => setShowProductList(true)}>Get Started <span>→</span></Link>
        </div>
        <div className="hero-note">Grown with care<br />Packed with love</div>
      </section>
      <AboutUs />
      {showProductList && <span className="sr-only">Product list ready</span>}
    </main>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
      <footer>© 2025 Paradise Nursery · Let’s grow something beautiful.</footer>
    </div>
  );
}
