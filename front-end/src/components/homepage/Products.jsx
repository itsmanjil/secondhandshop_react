import styled from "styled-components";
import Product from "./Product";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../Shared/AxiosInstance/AxiosInstance";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #d6d9deb5;

`;

const Products = () => {
  const [popularProducts, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    AxiosInstance.get("products", {
      headers: {
        Authorization: `bearer ${token}`,
      },
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
    <Container>
      {popularProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
