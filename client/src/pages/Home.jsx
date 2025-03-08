import React, { useState } from "react";
import AppDownload from "../components/AppDownload";
import ExploreMenu from "../components/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay";
import Header from "../components/Header";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      {/* Sections with IDs */}
      <div id="header">
        <Header />
      </div>
      <div id="menu">
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>
      <div id="food">
        <FoodDisplay category={category} />
      </div>
      <div id="app">
        <AppDownload />
      </div>
    </div>
  );
};

export default Home;
