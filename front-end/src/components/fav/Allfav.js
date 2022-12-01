import React, { useEffect, useState } from "react";
import AllFavItem from "./Allfavitems";
import axios from "axios";

const AllFav = () => {
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("user id");

  console.log(userId);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/fav/${userId}`, {
        // headers: {
        //   Authorization: `bearer ${token}`,
        // },
      })
      .then((res) => {
        setProducts(res.data.product);
        // console.log("product data" + JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "80%",
        width: "100%",
        margin: "0 auto",
        paddingTop: "20px",
      }}
    >
      {products.map((product, index) => {
        return (
          <AllFavItem
            key={index}
            id={product._id}
            name={product.name}
            image={product.image}
            price={product.price}
            product={product}
          />
        );
      })}
    </div>
  );
};

export default AllFav;
