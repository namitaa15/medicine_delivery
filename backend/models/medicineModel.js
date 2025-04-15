import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    imageUrl: { type: String } // Medicine Image URL
});

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;