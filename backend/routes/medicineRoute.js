import express from "express";
import { getMedicines, getMedicineById } from "../controllers/medicineController.js";

const router = express.Router();

// 📌 Route to fetch all medicines with optional filtering & sorting
router.get("/", getMedicines);

// 📌 Route to fetch a single medicine by ID
router.get("/:id", getMedicineById);

export default router;