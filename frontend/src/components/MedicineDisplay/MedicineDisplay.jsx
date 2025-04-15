import React, { useContext } from "react";
import "./MedicineDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import MedicineItem from "../MedicineItem/MedicineItem";

const MedicineDisplay = ({ category }) => {
  const { medicine_list } = useContext(StoreContext);

  if (!medicine_list || medicine_list.length === 0) {
    return <p>Loading medicines...</p>;
  }

  // ✅ Case-insensitive filtering
  const filteredMedicines = medicine_list.filter(
    (item) =>
      category.toLowerCase() === "all" ||
      item.category?.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="medicine-display" id="medicine-display">
      <h2 className="h2we">Top Medicines Near You 🩺</h2>
      {category.toLowerCase() !== "all" && (
        <h3 className="category-title">💊 {category}</h3>
      )}
      <div className="medicine-display-list">
        {filteredMedicines.map((item) => (
          <MedicineItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price || 0}
            image={item.imageUrl} // ✅ Fix: use correct field
          />
        ))}
      </div>
    </div>
  );
};

export default MedicineDisplay;