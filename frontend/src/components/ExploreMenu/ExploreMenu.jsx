import React from "react";
import "./ExploreMenu.css";
import { useNavigate } from "react-router-dom";
import { assets } from '../../assets/assets';
import ActionAreaCard from "./ActionAreaCard";

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
    <div className="explore-menu flex flex-col w-full items-center" id="explore-menu">
      <h2 className="explore-title">Explore Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:w-3/4 px-3 mx-auto">
        {menu_list.map((item, index) => (
          <ActionAreaCard key={item.menu_name + index.toString()} image={item.menu_image} title={item.menu_name} onClick={() => handleCategoryClick(item.menu_name)} />
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
