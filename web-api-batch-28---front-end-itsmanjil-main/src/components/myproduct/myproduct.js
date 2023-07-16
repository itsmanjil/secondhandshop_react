import React, { useEffect, useState } from "react";
import MyproductItem from "./myproductitems";
import { AxiosInstance } from "../../Shared/AxiosInstance/AxiosInstance";
import styled from "styled-components";

const Container = styled.div`
  flex: 3;
  flex-wrap: wrap;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
const Myproduct = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    AxiosInstance.get("products", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const userId = localStorage.getItem("user id");

  const filterMyProduct = products.filter((item) => {
    return item.owner_id === userId;
  });

  return (
    <Container>
      {filterMyProduct.map((product, index) => {
        return (
          <MyproductItem
            key={index}
            id={product._id}
            name={product.name}
            image={product.image}
            price={product.price}
            product={product}
          />
        );
      })}
    </Container>
  );
};

export default Myproduct;
