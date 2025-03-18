import express from "express";
import { addReview } from "../controllers/reviewController.js";
import authMiddleware from "../middleware/auth.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", authMiddleware, addReview);

export default reviewRouter;