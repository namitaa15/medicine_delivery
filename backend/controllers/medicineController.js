import Medicine from "../models/medicineModel.js";

// ✅ Get all medicines with filtering & sorting
export const getMedicines = async (req, res) => {
    try {
        let query = {};

        // 📌 Filtering by name (case-insensitive)
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: "i" };
        }

        // 📌 Filtering by category
        if (req.query.category) {
            query.category = req.query.category;
        }

        // 📌 Sorting (default: alphabetical)
        let sort = { name: 1 };
        if (req.query.sortBy === "latest") {
            sort = { createdAt: -1 };
        }

        const medicines = await Medicine.find(query).sort(sort);
        res.json({ success: true, data: medicines });

    } catch (error) {
        console.error("❌ Error fetching medicines:", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

// ✅ Get a single medicine by ID
export const getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ success: false, message: "Medicine not found" });
        }
        res.json({ success: true, data: medicine });
    } catch (error) {
        console.error("❌ Error fetching medicine:", error);
        res.status(500).json({ success: false, message: "Error fetching medicine" });
    }
};

// ✅ Get all medicines without filters (for admin panel, etc.)
export const listMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json({ success: true, data: medicines });
    } catch (error) {
        console.error("❌ Error fetching medicines:", error);
        res.status(500).json({ success: false, message: "Error fetching medicines" });
    }
};