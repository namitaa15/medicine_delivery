import React from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import MedicineDisplay from '../../components/MedicineDisplay/MedicineDisplay';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { categoryName } = useParams(); // 🪄 Get category from URL
  const selectedCategory = categoryName || "All";

  return (
    <div>
      <Header />
      <ExploreMenu />
    </div>
  );
};

export default Home;