import React, { useState } from "react";
import "./ExploreMenu.css";

const ExploreMenu = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  // Define the categories and their respective images
  const menu_list = [
    { menu_name: "Painkillers", menu_image: "path_to_painkillers_image.jpg" },
    { menu_name: "Antibiotics", menu_image: "path_to_antibiotics_image.jpg" },
    { menu_name: "Fever Medicines", menu_image: "path_to_fever_medicines_image.jpg" },
    { menu_name: "Allergy Medicines", menu_image: "path_to_allergy_medicines_image.jpg" },
    { menu_name: "Acidity & Stomach Medicines", menu_image: "path_to_acidity_medicines_image.jpg" },
    { menu_name: "Diabetes Medicines", menu_image: "path_to_diabetes_medicines_image.jpg" },
    { menu_name: "Heart & BP Medicines", menu_image: "path_to_heart_bp_medicines_image.jpg" },
    { menu_name: "Cough & Cold", menu_image: "path_to_cough_cold_image.jpg" },
    { menu_name: "Brain & Mental Health Medicines", menu_image: "path_to_brain_mental_health_image.jpg" },
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategorySelect(category); // Pass the selected category to the parent component
  };

  return (
    <div className="explore-menu">
      <h2 className="explore-title">Explore Categories</h2>
      <div className="menu-items">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${activeCategory === item.menu_name ? "active" : ""}`}
            onClick={() => handleCategoryClick(item.menu_name)}
          >
            <img src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;