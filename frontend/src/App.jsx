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
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}

        <div className="app-wrapper"> {/* ✅ NEW WRAPPER */}
          <Navbar setShowLogin={setShowLogin} />

          <main className="main-content"> {/* ✅ MAIN FLEX ITEM */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/medicines' element={<MedicineDisplay />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<PlaceOrder />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/myorders" element={<MyOrders />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </StoreContextProvider>
    </Router>

  );
};

export default App;