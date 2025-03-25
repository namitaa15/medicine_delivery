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
import MedicineDisplay from './components/MedicineDisplay/MedicineDisplay';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <StoreContextProvider>
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

<<<<<<< HEAD
        <div className="app-wrapper"> {/* Content Wrapper */}
          <Navbar setShowLogin={setShowLogin} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
=======
        <div className="app-wrapper">
          <Navbar setShowLogin={setShowLogin} />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryName" element={<Home />} /> {/* ✅ ADD IT HERE */}
              <Route path="/medicines" element={<MedicineDisplay />} />
>>>>>>> urgent-issues-fix
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<PlaceOrder />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/myorders" element={<MyOrders />} />
            </Routes>
          </main>
<<<<<<< HEAD
        </div>

        {/* Footer OUTSIDE the wrapper = full width */}
        <Footer />
=======

          <Footer />
        </div>
>>>>>>> urgent-issues-fix
      </StoreContextProvider>
    </Router>
  );
};

export default App;