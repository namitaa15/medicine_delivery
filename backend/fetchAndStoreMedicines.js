import mongoose from "mongoose";
import dotenv from "dotenv";
import Medicine from "./models/medicineModel.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);
console.log("✅ MongoDB Connected!");

// Image filenames (m1 to m9)
const imageFilenames = [
  "m1.png", "m2.png", "m3.png",
  "m4.png", "m5.png", "m6.png",
  "m7.png", "m8.png", "m9.png"
];

const assignImagesToMedicines = async () => {
  try {
    const medicines = await Medicine.find();

    for (let i = 0; i < medicines.length; i++) {
      const imageFile = `/assets/${imageFilenames[i % imageFilenames.length]}`;
      medicines[i].imageUrl = imageFile;
      await medicines[i].save();
      console.log(`✅ Updated ${medicines[i].name} with image ${imageFile}`);
    }

    console.log("🎉 All medicines updated with images!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error updating images:", err);
    mongoose.connection.close();
  }
};

assignImagesToMedicines();