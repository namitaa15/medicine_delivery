import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order Medicines Online</h2>
            <p>Choose from a wide variety of medicines and health products delivered straight to your doorstep. Take care of your health with ease and convenience, anytime, anywhere.</p>
            <a href="#explore-menu"><button className='buttonwl'>Explore Medicines</button></a>
        </div>
    </div>
  );
}

export default Header;