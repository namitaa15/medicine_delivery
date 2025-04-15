import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets'; // ✅ Make sure this import exists

const Footer = () => {
  return (
    <footer className="footer" id='footer'>
      <div className="footer-content">
        {/* BRAND SECTION */}
        <div className="footer-section brand">
          <h2>MediCare</h2>
          <p>
            Providing fast, affordable, and trusted medicine delivery at your doorstep.
            This is a portfolio project, not a real service.
          </p>
          <div className="social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        {/* LINKS */}
        <div className="footer-section links">
          <h3>Company</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-section contact">
          <h3>Get in Touch</h3>
          <p>📞 +1-800-555-1234</p>
          <p>📧 contact@medicare.com</p>
        </div>
      </div>

      <hr />
      <p className="copyright">© 2025 MediCare. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
