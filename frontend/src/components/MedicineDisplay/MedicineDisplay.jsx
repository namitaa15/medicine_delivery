import React, { useContext } from "react";
import "./MedicineDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import MedicineItem from "../MedicineItem/MedicineItem";

const MedicineDisplay = ({ category }) => {
  const { medicine_list } = useContext(StoreContext);

  // Debugging: Check if medicine_list is received correctly
  console.log("Medicine List:", medicine_list);

  // Prevent .map() error by checking if medicine_list exists
  if (!medicine_list || medicine_list.length === 0) {
      return <p>Loading medicines...</p>;
  }

  return (
    <div className="medicine-display" id="medicine-display">
      <h2 className="h2we">Top medicines near you</h2>
      <div className="medicine-display-list">
        {medicine_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return <MedicineItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default MedicineDisplay;