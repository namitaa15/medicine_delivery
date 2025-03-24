import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems = {}, medicine_list = [], removeFromCart } = useContext(StoreContext);

  // Get items from cart (convert object to array)
  const cartData = Object.entries(cartItems).map(([id, quantity]) => {
    const medicine = medicine_list.find((m) => m._id === id);
    return medicine
      ? {
          ...medicine,
          quantity,
        }
      : null;
  }).filter(Boolean); // Remove nulls

  const handleRemove = (medicineId) => {
    removeFromCart(medicineId);
  };

  const handleQuantityChange = () => {
    // This function needs to be implemented if you want quantity update
  };

  const totalPrice = cartData.reduce(
    (total, medicine) => total + medicine.price * medicine.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartData.length === 0 ? (
          <p>Your cart is empty. <Link to="/home">Go back</Link> to shopping.</p>
        ) : (
          cartData.map((medicine) => (
            <div key={medicine._id} className="cart-item">
              <img src={medicine.image} alt={medicine.name} />
              <div className="item-details">
                <h3>{medicine.name}</h3>
                <p>Price: ₹{medicine.price}</p>
                <div className="quantity-control">
                  <button disabled>-</button>
                  <span>{medicine.quantity}</span>
                  <button disabled>+</button>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemove(medicine._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cartData.length > 0 && (
        <div className="cart-summary">
          <h3>Total Price: ₹{totalPrice}</h3>
          <Link to="/placeorder">
            <button className="place-order-button">Place Order</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;