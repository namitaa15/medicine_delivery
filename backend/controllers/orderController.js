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

const addItemsToCart = async (req, res) => {
    const { itemId } = req.body;

    try {
        // check if an unplaced order exits for current user
        const unplacedOrder = await Order.findOne({ user: req.user._id, isPlaced: false });

        if (!unplacedOrder) {
            // if no unplaced order exists, create a new one
            const newOrder = new Order({
                user: req.user._id,
                orderItems: [{ product: itemId, quantity: 1 }],
                isPlaced: false
            });
            const savedOrder = await newOrder.save();
            res.json({ success: true, order: savedOrder });
            return;
        }else{
            // if an unplaced order exists, add the item to it
            // check if the item is already in the order
            const existingItem = unplacedOrder.orderItems.find(item => item.product.toString() === itemId);
            if (existingItem) {
                existingItem.quantity += 1;
                const savedOrder = await unplacedOrder.save();
                res.json({ success: true, order: savedOrder });
                return;
            }else{
                // if the item is not in the order, add it
                unplacedOrder.orderItems.push({ product: itemId, quantity: 1 });
                const savedOrder = await unplacedOrder.save();
                res.json({ success: true, order: savedOrder });
                return;
            }
        }
    }catch(error){
        res.status(500).json({ success: false, message: "Failed to add item to cart" });
    }
}

const removeItemFromCart = async (req, res) => {
    const { itemId } = req.body;
    try {
        const unplacedOrder = await Order.findOne({ user: req.user._id, isPlaced: false });

        if (!unplacedOrder) {
            res.status(404).json({ success: false, message: "Order not found" });
            return;
        }else{
            const itemIndex = unplacedOrder.orderItems.findIndex(item => item.product.toString() === itemId);
            if (itemIndex === -1) {
                res.status(404).json({ success: false, message: "Item not found in cart" });
                return;
            }else{
                // decrement count by 1 if count is greater than 1
                if (unplacedOrder.orderItems[itemIndex].quantity > 1) {
                    unplacedOrder.orderItems[itemIndex].quantity -= 1;
                }else{
                    // remove the item from the order
                    unplacedOrder.orderItems.splice(itemIndex, 1);
                }
                const savedOrder = await unplacedOrder.save();
                res.json({ success: true, order: savedOrder });
            }
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to remove item from cart" });
    }
}
const unplacedOrdersForCurrentUser = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id, isPlaced: false });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
}

export { placeOrder, addItemsToCart, removeItemFromCart, unplacedOrdersForCurrentUser };