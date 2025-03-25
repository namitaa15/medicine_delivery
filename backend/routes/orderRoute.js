import express from "express";
import { addItemsToCart, placeOrder, removeItemFromCart, unplacedOrdersForCurrentUser } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);

orderRouter.post("/add", authMiddleware, addItemsToCart);

orderRouter.post("/remove", authMiddleware, removeItemFromCart);

orderRouter.post("/unplaced", authMiddleware, unplacedOrdersForCurrentUser);

export default orderRouter;