import React from "react";
import Categories from "./Categories";
import Footer from "./Footer";
import Products from "./Products";
import Slider from "./Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <Categories />
      <Products/>
      <Footer/>
    </div>
  );
};

export default Home;
