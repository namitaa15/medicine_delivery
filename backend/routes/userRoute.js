import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to login user
router.post("/login", loginUser);

// Route to get user profile (Protected)
router.get("/profile", authMiddleware, getUserProfile);

export default router;