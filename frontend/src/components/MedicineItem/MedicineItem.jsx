import React, { useContext } from 'react';
import './MedicineItem.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { StoreContext } from '../../context/StoreContext';

function MedicineItem ({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className='medicine-item'>
        <div className="medicine-item-img-container">
        <img className='medicine-item-image' src={image} alt={name} />
            {!cartItems[id]
                ?<img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                :<div className='medicine-item-counter'>
                  <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='' />
                  <p className='cartitemsp'>{cartItems[id]}</p>
                  <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt='' />
                  </div>
            }
        </div>
        <div className="medicine-item-info">
            <div className="medicine-item-name-rating">
                <p className='namewe'>{name}</p>
                <img className='ratingstars' src={assets.rating_starts} alt="" />
            </div>
            <p className="medicine-item-desc">{description}</p>
            <p className="medicine-item-price">${price}</p>
        </div>
    </div>
  );
}

export default MedicineItem;