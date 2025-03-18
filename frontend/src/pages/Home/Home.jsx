import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import MedicineDisplay from '../../components/MedicineDisplay/MedicineDisplay'; // Updated from FoodDisplay
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {
    const [category, setCategory] = useState("All");

    return (
        <div>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
            <MedicineDisplay category={category} /> {/* Updated from FoodDisplay */}
            <AppDownload />
        </div>
    );
}

export default Home;
