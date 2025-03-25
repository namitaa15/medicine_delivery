import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import medicineRoutes from "./routes/medicineRoute.js";
import userRoutes from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import reviewRouter from "./routes/reviewRoute.js";


dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/medicines", medicineRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);

app.get("/", (req, res) => {
    res.send("✅ Medicine Delivery API is Running!");
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));