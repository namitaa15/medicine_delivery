import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css' // Ensure this CSS file is tailored for the medicine delivery style
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext); // Token for authenticated user
  const [data, setData] = useState([]); // Stores the orders

  // Fetch orders from the backend API
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`, 
        {},
        { headers: { token } }
      );
      setData(response.data.data); // Save orders in state
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders(); // Fetch orders if token is available
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2 className='myordersp'>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className='my-orders-order'>
              {/* Displaying the order details */}
              <img src={assets.parcel_icon} alt="order icon" />
              <p>{order.items.map((item, idx) => (
                idx === order.items.length - 1 
                  ? `${item.name} x ${item.quantity}` 
                  : `${item.name} x ${item.quantity}, `
              ))}</p>
              {/* Total amount for the order */}
              <p>${order.amount}.00</p>
              {/* Number of items in the order */}
              <p>Items: {order.items.length}</p>
              {/* Order status (e.g., pending, delivered) */}
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              {/* Button to track the order */}
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;