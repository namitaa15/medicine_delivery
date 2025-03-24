import React from "react";
import "./ExploreMenu.css";
import { useNavigate } from "react-router-dom";
import { assets } from '../../assets/assets';

const ExploreMenu = () => {
  const navigate = useNavigate();

  const menu_list = [
    { menu_name: "Painkillers", menu_image: assets.painkiller },
    { menu_name: "Antibiotics", menu_image: assets.antibiotics },
    { menu_name: "Fever Medicines", menu_image: assets.fever },
    { menu_name: "Allergy Medicines", menu_image: assets.allergy },
    { menu_name: "Acidity & Stomach Medicines", menu_image: assets.acidity },
    { menu_name: "Diabetes Medicines", menu_image: assets.suger },
    { menu_name: "Heart & BP Medicines", menu_image: assets.heart },
    { menu_name: "Cough & Cold", menu_image: assets.cough },
    { menu_name: "Brain & Mental Health Medicines", menu_image: assets.brain },
    { menu_name: "Others", menu_image: assets.others },
  ];

  const handleCategoryClick = (selectedCategory) => {
    // navigate to /category/:categoryName
    navigate(`/category/${encodeURIComponent(selectedCategory)}`);
  };

  return (
    <div className="explore-menu">
      <h2 className="explore-title">Explore Categories</h2>
      <div className="menu-items">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className="menu-item"
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
