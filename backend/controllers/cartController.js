import Medicine from "../models/medicineModel.js";

const cart = [];

const addToCart = (req, res) => {
    const { medicineId, quantity } = req.body;
    const item = cart.find(i => i.medicineId === medicineId);
    
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ medicineId, quantity });
    }

    res.json({ success: true, cart });
};

const removeFromCart = (req, res) => {
    const { medicineId } = req.body;
    const index = cart.findIndex(i => i.medicineId === medicineId);

    if (index !== -1) {
        cart.splice(index, 1);
        res.json({ success: true, cart });
    } else {
        res.status(404).json({ success: false, message: "Item not found" });
    }
};

const getCart = (req, res) => {
    res.json({ success: true, cart });
};

export { addToCart, removeFromCart, getCart };
