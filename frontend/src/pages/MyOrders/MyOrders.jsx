import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  // Fetch placed orders
  const fetchOrders = async () => {
    try {
      const response = await axios.post(`${url}/api/orders/user`, {}, {
        headers: { token }
      });
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2 className="myordersp">My Orders</h2>
      <div className="container">
        {orders.length === 0 ? (
          <p>No orders found. Go order some medicines! 💊</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="order icon" />
              <p>
                {order.orderItems.map((item, idx) =>
                  `${item.product.name} x ${item.quantity}${idx < order.orderItems.length - 1 ? ', ' : ''}`
                )}
              </p>
              <p>₹{order.totalPrice}</p>
              <p>Items: {order.orderItems.length}</p>
              <p>
                <span style={{ color: order.isDelivered ? 'green' : 'orange' }}>
                  ●
                </span>{" "}
                <b>{order.isDelivered ? 'Delivered' : 'Processing'}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;