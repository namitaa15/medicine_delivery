import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(StoreContext);

  const handleRemove = (medicineId) => {
    removeFromCart(medicineId);
  };

  const handleQuantityChange = (medicineId, newQuantity) => {
    updateQuantity(medicineId, newQuantity);
  };

  const totalPrice = cart.reduce(
    (total, medicine) => total + medicine.price * medicine.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty. <Link to="/home">Go back</Link> to shopping.</p>
        ) : (
          cart.map((medicine) => (
            <div key={medicine._id} className="cart-item">
              <img src={medicine.imageUrl} alt={medicine.name} />
              <div className="item-details">
                <h3>{medicine.name}</h3>
                <p>Price: ₹{medicine.price}</p>
                <div className="quantity-control">
                  <button
                    onClick={() =>
                      handleQuantityChange(medicine._id, medicine.quantity - 1)
                    }
                    disabled={medicine.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{medicine.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(medicine._id, medicine.quantity + 1)
                    }
                  >
                    +
                  </button>
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

      {cart.length > 0 && (
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