import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import MedicineItem from "../components/MedicineItem/MedicineItem";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const CategoryMedicines = () => {
  const { categoryName } = useParams();
  const { medicine_list } = useContext(StoreContext);

  const filtered = medicine_list.filter(
    (item) =>
      categoryName.toLowerCase() === "all" ||
      item.category?.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <>
      <Header />
      <div className="medicine-display" id="medicine-display">
        <h2 className="h2we">Medicines for {categoryName} 🩺</h2>
        <div className="medicine-display-list">
          {filtered.map((item) => (
            <MedicineItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price || 0}
              image={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryMedicines;
