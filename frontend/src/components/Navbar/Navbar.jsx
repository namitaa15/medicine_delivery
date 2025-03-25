import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { Avatar } from '@mui/material';
import { blue } from '@mui/material/colors';
import TemporaryDrawer from './TemporaryDrawer';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState('home');
<<<<<<< HEAD
    const store = useContext(StoreContext);
    const { getTotalCartAmount, token, setToken } = store;
    const navigate = useNavigate();
=======
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Get context values
    const store = useContext(StoreContext);

    const { getTotalCartAmount } = store;

>>>>>>> urgent-issues-fix


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
        <div className="bg-white py-2 px-3 flex items-center justify-between">
            <Link to="/" className="logo" style={{ fontWeight: 'bold', fontSize: '22px', color: '#2b73d1', textDecoration: 'none' }}>
                MediCare<span style={{ color: '#4a6cf7' }}></span>
            </Link>

            <ul className="navbar-menu hidden lg:flex lg:items-center lg:gap-3">
                <Link to="/" onClick={() => setMenu('home')} className={menu === 'home' ? 'font-bold' : ''}>
                    Dashboard
                </Link>
                <Link to="/medicines" onClick={() => setMenu('medicines')} className={menu === 'medicines' ? 'font-bold' : ''}>
                    Medicines
                </Link>
<<<<<<< HEAD
            </ul>

            <div className="navbar-right">
=======
                <a href="#categories" onClick={() => setMenu('categories')} className={menu === 'categories' ? 'font-bold' : ''}>
                    Categories
                </a>
                <a href="#footer" onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'font-bold' : ''}>
                    Customer Support
                </a>
            </ul>
            <div className="flex items-center gap-2 ">
>>>>>>> urgent-issues-fix
                <div className="navbar-search-icon">
                    <Link to="/cart">
                        <img className="basketlogo" src={assets.basket_icon} alt="Cart Icon" />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
                </div>
                {!localStorage.getItem('token') ? (
                    <button className="signbutton" onClick={() => setShowLogin(true)}>
                        Sign In
                    </button>
                ) : (
                    <div className="navbar-profile" onClick={toggleDrawer}>
                        <Avatar sx={{ bgcolor: blue[500] }}
                            alt="Remy Sharp"
                            src="/broken-image.jpg" ></Avatar>
                    </div>
                )}
            </div>
            <TemporaryDrawer open={open} toggleDrawer={toggleDrawer} />
        </div>
    );
};

export default Navbar;