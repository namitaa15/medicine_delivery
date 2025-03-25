import React, { useEffect, useState, useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    token,
    medicine_list,
    cartItems,
    url
  } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];

    medicine_list.forEach((medicine) => {
      if (cartItems[medicine._id] > 0) {
        orderItems.push({
          product: medicine._id,
          quantity: cartItems[medicine._id]
        });
      }
    });

    const orderData = {
      orderItems,
      shippingAddress: `${data.street}, ${data.city}, ${data.state} - ${data.zipcode}, ${data.country}`,
      totalPrice: getTotalCartAmount() + 2,
      paymentMethod: 'Online'
    };

    try {
      const response = await axios.post(
        `${url}/api/orders/place`,
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        navigate('/myorders');
      } else {
        alert('❌ Order failed. Try again!');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('⚠️ Something went wrong. Please try again later.');
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstName" value={data.firstName} onChange={onChangeHandler} placeholder="First Name" required />
          <input name="lastName" value={data.lastName} onChange={onChangeHandler} placeholder="Last Name" required />
        </div>
        <input name="email" type="email" value={data.email} onChange={onChangeHandler} placeholder="Email Address" className="emaill" required />
        <input name="street" value={data.street} onChange={onChangeHandler} placeholder="Street" className="streett" required />
        <div className="multi-fields">
          <input name="city" value={data.city} onChange={onChangeHandler} placeholder="City" required />
          <input name="state" value={data.state} onChange={onChangeHandler} placeholder="State" required />
        </div>
        <div className="multi-fields">
          <input name="zipcode" value={data.zipcode} onChange={onChangeHandler} placeholder="Zip Code" required />
          <input name="country" value={data.country} onChange={onChangeHandler} placeholder="Country" required />
        </div>
        <input name="phone" value={data.phone} onChange={onChangeHandler} placeholder="Phone" className="phonee" required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
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
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;