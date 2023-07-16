import { Route, Routes } from "react-router-dom";
import About from "./about";
import Header from "./Header";
import Register from "./user/register";
import Login from "./user/login";
import AddProduct from "./addproduct/Addproduct";
import Home from "./homepage/Home";
import Myproduct from "./myproduct/myproduct";
import Profile from "./profile/Profile";
// import ProductPage from "./ProductPage";

import AllProducts from "./AllProdcuts/AllProducts";
import DetailProduct from "./DetailProduct/DetailProduct";
import Editproduct from "./myproduct/editproduct";
import Fav from "./fav/Allfav";
import "../App.css";

const Mid = () => {
  return (
    <div className="mid">
      <switch>
        <Header />
        <Routes>
          <Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/allProdcut" element={<AllProducts />}></Route>
            <Route
              path="/ProductDetail/:id"
              element={<DetailProduct />}
            ></Route>
            <Route path="/Editproduct/:id" element={<Editproduct />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
          <Route path="/fav" element={<Fav />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>

          <Route path="/" element={<Home />}></Route>
          <Route path="/addProdcut" element={<AddProduct />}></Route>
          <Route path="/myproduct" element={<Myproduct />}></Route>
        </Routes>
      </switch>
    </div>
  );
};

export default Mid;
