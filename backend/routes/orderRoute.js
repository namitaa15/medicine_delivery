import express from "express";
import { addItemsToCart, placeOrder, removeItemFromCart, unplacedOrdersForCurrentUser ,getUserOrders} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);

orderRouter.post("/add", authMiddleware, addItemsToCart);

orderRouter.post("/remove", authMiddleware, removeItemFromCart);

orderRouter.post("/unplaced", authMiddleware, unplacedOrdersForCurrentUser);

orderRouter.post("/user", authMiddleware, getUserOrders);

export default orderRouter;