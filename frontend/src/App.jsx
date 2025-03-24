import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import StoreContextProvider from './context/StoreContext';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <StoreContextProvider>
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

        <div className="app-wrapper"> {/* Content Wrapper */}
          <Navbar setShowLogin={setShowLogin} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<PlaceOrder />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/myorders" element={<MyOrders />} />
            </Routes>
          </main>
        </div>

        {/* Footer OUTSIDE the wrapper = full width */}
        <Footer />
      </StoreContextProvider>
    </Router>
  );
};

export default App;