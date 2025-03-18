import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genericName: { type: String },
    manufacturer: { type: String },
    category: { type: String },
    description: { type: String },
    dosage: { type: String },
    warnings: { type: String },
    imageUrl: { type: String } // Medicine Image URL
});

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;