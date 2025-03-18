import Order from "../models/orderModel.js";

const placeOrder = async (req, res) => {
    const { orderItems, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ success: false, message: "No order items" });
    }

    const order = new Order({
        user: req.user._id,
        orderItems,
        totalPrice
    });

    try {
        const createdOrder = await order.save();
        res.status(201).json({ success: true, order: createdOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create order" });
    }
};

export { placeOrder };