import React, { useContext } from 'react';
import './MedicineDisplay.css'; // Linking CSS for the layout and styling
import { StoreContext } from '../../context/StoreContext'; // Accessing the global context
import MedicineItem from "../MedicineItem/MedicineItem";


const MedicineDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext); // Using context to get the list of medicines
  
  return (
    <div className="medicine-display" id="medicine-display">
      <h2 className="h2we">Top medicines near you</h2> {/* Heading for the medicines section */}
      <div className="medicine-display-list">
        {food_list.map((item, index) => {
          // Display medicines based on selected category
          if (category === "All" || category === item.category) {
            return <MedicineItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />;
          }
        })}
      </div>
    </div>
  );
};

export default MedicineDisplay;