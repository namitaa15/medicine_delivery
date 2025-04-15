// 📦 Import all local PNG images from assets folder
const medicineImages = import.meta.glob('../../assets/*.png', {
  eager: true,
  import: 'default',
});

import React, { useContext } from 'react';
import './MedicineItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

function MedicineItem({ id, name, price, image }) {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  // 🧠 Fix image path
  const imageKey = `../../assets${image.replace('/assets', '')}`;
  const imageSrc = medicineImages[imageKey] || assets.others; // fallback

  return (
    <div className='medicine-item'>
      <div className="medicine-item-img-container">
        <img className="medicine-item-image" src={imageSrc} alt={name} />

        {!cartItems[id] ? (
          <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add" />
        ) : (
          <div className='medicine-item-counter'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='Remove' />
            <p className='cartitemsp'>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt='Add' />
          </div>
        )}
      </div>

      <div className="medicine-item-info">
        <div className="medicine-item-name-rating">
          <p className='namewe'>{name}</p>
          <img className='ratingstars' src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="medicine-item-price">₹{price}</p>
      </div>
    </div>
  );
}

export default MedicineItem;