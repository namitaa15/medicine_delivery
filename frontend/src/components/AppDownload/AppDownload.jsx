import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets'; // Import assets for download buttons

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p className="pforbetter">
        For a better experience, download the <br />
        Medicine Delivery App now!
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="Google Play Store" />
        <img src={assets.app_store} alt="Apple App Store" />
      </div>
    </div>
  );
};

export default AppDownload;