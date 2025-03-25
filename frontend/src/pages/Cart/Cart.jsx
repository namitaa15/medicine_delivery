import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems = {},
    medicine_list = [],
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const cartData = medicine_list
    .filter((item) => cartItems[item._id] > 0)
    .map((item) => ({
      ...item,
      quantity: cartItems[item._id],
    }));

  const getImage = (imageUrl) => {
    try {
      const key = `../../assets${imageUrl.replace('/assets', '')}`;
      const images = import.meta.glob('../../assets/*.png', {
        eager: true,
        import: 'default',
      });
      return images[key];
    } catch {
      return null;
    }
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Image</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {cartData.map((item, index) => (
          <div key={item._id}>
            <div className="cart-items-title cart-items-item">
              <img
                src={getImage(item.imageUrl)}
                alt={item.name}
                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
              />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
              <p className="qty-control">
                <button onClick={() => removeFromCart(item._id)}>-</button>
                {item.quantity}
                <button onClick={() => addToCart(item._id)}>+</button>
              </p>
              <p>₹{item.price * item.quantity}</p>
              <p onClick={() => removeFromCart(item._id)} className="cross">
                x
              </p>
            </div>
            <hr />
          </div>
        ))}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <p className="promocodep">If you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo Code" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;