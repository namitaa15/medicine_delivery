import React, { useContext } from "react";
import "./MedicineDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import MedicineItem from "../MedicineItem/MedicineItem";

const MedicineDisplay = ({ category }) => {
  const { medicine_list } = useContext(StoreContext);

  if (!medicine_list || medicine_list.length === 0) {
    return <p>Loading medicines...</p>;
  }

  // Filtered list based on selected category
  const filteredMedicines = medicine_list.filter(
    (item) => category === "All" || item.category === category
  );

  return (
    <div className="medicine-display" id="medicine-display">
      <h2 className="h2we">Top Medicines Near You 🩺</h2>
      {category !== "All" && (
        <h3 className="category-title">💊 {category}</h3>
      )}
      <div className="medicine-display-list">
        {filteredMedicines.map((item) => (
          <MedicineItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default MedicineDisplay;