import React from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
<<<<<<< HEAD
=======
import MedicineDisplay from '../../components/MedicineDisplay/MedicineDisplay';
import { useParams } from 'react-router-dom';
>>>>>>> urgent-issues-fix

const Home = () => {
  const { categoryName } = useParams(); // 🪄 Get category from URL
  const selectedCategory = categoryName || "All";

  return (
    <div>
      <Header />
<<<<<<< HEAD
      <ExploreMenu category={category} setCategory={setCategory} />
      {/* Removed MedicineDisplay */}
=======
      <ExploreMenu />
      <MedicineDisplay category={selectedCategory} />
>>>>>>> urgent-issues-fix
    </div>
  );
};

export default Home;