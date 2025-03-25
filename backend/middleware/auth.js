import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.token) {
        try {
            token = req.headers.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error("❌ Not authorized, token failed", error);
            res.status(401).json({ success: false, message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: "Not authorized, no token" });
    }
};

export default authMiddleware;