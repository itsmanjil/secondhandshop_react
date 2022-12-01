import React, { useEffect, useState } from "react";
import AllProductItem from "./AllProductItem";
import { AxiosInstance } from "../../Shared/AxiosInstance/AxiosInstance";
import { padding } from "@mui/system";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    AxiosInstance.get("products", {
      // headers: {
      //   Authorization: `bearer ${token}`,
      // },
    })
      .then((res) => {
        setProducts(res.data);
        console.log("product data" + JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <div
      className="pt: 4"
      style={{
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "80%",
        width: "100%",
        margin: "0 auto",
      }}
    >
      {products.map((product, index) => {
        return (
          <AllProductItem
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

export default AllProducts;
