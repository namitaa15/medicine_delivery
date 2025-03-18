import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState('home');

    // Get context values
    const store = useContext(StoreContext);

    // Debugging: Check if StoreContext is properly provided
    console.log("StoreContext Value:", store);

    if (!store || typeof store.getTotalCartAmount !== "function") {
        console.error("getTotalCartAmount is missing from StoreContext!");
        return null; // Prevent rendering if context is missing
    }

    const { getTotalCartAmount, token, setToken } = store;
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/');
    };

    useEffect(() => {
        const toggle = document.getElementById('visual-toggle');
        if (!toggle) return;

        const applyModePreference = () => {
            const mode = localStorage.getItem('mode');
            if (mode === 'light') {
                toggle.checked = true;
                document.body.classList.add('lightcolors');
                document.getElementById('visual-toggle-button').classList.add('lightmode');
            } else {
                toggle.checked = false;
                document.body.classList.remove('lightcolors');
                document.getElementById('visual-toggle-button').classList.remove('lightmode');
            }
        };

        applyModePreference();

        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                localStorage.setItem('mode', 'light');
                document.body.classList.add('lightcolors');
                document.getElementById('visual-toggle-button').classList.add('lightmode');
            } else {
                localStorage.setItem('mode', 'dark');
                document.body.classList.remove('lightcolors');
                document.getElementById('visual-toggle-button').classList.remove('lightmode');
            }
        });
    }, []);

    return (
        <div className="navbar">
            <Link to="/">
                <img src={assets.logo} alt="Logo" className="logo" />
            </Link>
            <ul className="navbar-menu">
                <Link to="/" onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>
                    Dashboard
                </Link>
                <Link to="/medicines" onClick={() => setMenu('medicines')} className={menu === 'medicines' ? 'active' : ''}>
                    Medicines
                </Link>
                <a href="#categories" onClick={() => setMenu('categories')} className={menu === 'categories' ? 'active' : ''}>
                    Categories
                </a>
                <a href="#app-download" onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>
                    Mobile App
                </a>
                <a href="#footer" onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>
                    Customer Support
                </a>
            </ul>
            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <Link to="/cart">
                        <img className="basketlogo" src={assets.basket_icon} alt="Cart Icon" />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
                </div>
                {!token ? (
                    <button className="signbutton" onClick={() => setShowLogin(true)}>
                        Sign In
                    </button>
                ) : (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} className="white-filter" alt="Profile" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}>
                                <img src={assets.bag_icon} alt="Orders Icon" />
                                <p>My Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="Logout Icon" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;