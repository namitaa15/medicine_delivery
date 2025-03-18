import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img className='medicinelogofooter' src={assets.logo} alt="Medicine Delivery Logo" />
          <p>Providing timely and affordable medicine delivery to your doorstep. This website is a portfolio project and not a real service.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-800-555-1234</li>
            <li>contact@medicinedelivery.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2025 © Medicine Delivery - All rights reserved.</p>
    </div>
  );
};

export default Footer;