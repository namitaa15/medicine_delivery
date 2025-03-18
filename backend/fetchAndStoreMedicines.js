import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import Medicine from "./models/medicineModel.js"; // Import Medicine Model

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected!"))
    .catch((err) => console.error("❌ MongoDB Connection Failed!", err));

// Function to fetch and store medicines
const fetchAndStoreMedicines = async () => {
    try {
        const response = await axios.get('https://rxnav.nlm.nih.gov/REST/drugs.json?name=aspirin');
        const drugGroup = response.data.drugGroup?.conceptGroup || []; // Ensure API response is structured

        const formattedMedicines = [];

        drugGroup.forEach(group => {
            if (group.conceptProperties) {
                group.conceptProperties.forEach(drug => {
                    formattedMedicines.push({
                        name: drug.synonym || "Unknown",
                        genericName: drug.synonym || "Unknown",
                        manufacturer: "Unknown",
                        category: group.tty || "General",
                        description: "No description available.",
                        dosage: "Follow doctor's prescription.",
                        warnings: "No warnings.",
                        imageUrl: `https://rximage.nlm.nih.gov/api/rximage/1/rxnav?rxcui=${drug.rxcui}`
                    });
                });
            }
        });

        if (formattedMedicines.length === 0) {
            console.log("⚠ No medicines found. API response might have changed.");
            return;
        }

        await Medicine.deleteMany();
        await Medicine.insertMany(formattedMedicines);
        console.log("✅ Medicines saved successfully!");

        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error fetching medicines:", error);
    }
};

// Run the function
fetchAndStoreMedicines();