// order model
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
        {
            quantity: { type: Number, required: true },
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true }
        }
    ],
    shippingAddress: { type: String, required: false },
    paymentMethod: { type: String, required: false },
    totalPrice: { type: Number, required: false },
    isPaid: { type: Boolean, default: false },
    isPlaced: { type: Boolean, default: false },
    paidAt: { type: Date, required: false },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;