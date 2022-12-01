import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;

  bottom: 0%;
  left: 0%;
  z-index: 3;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  padding-top: 20px;
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  display: block;
  z-index: 2;
  object-fit: cover;
  weight: contain;
`;

const Icon = styled.div`
  width: 94%;
  height: 30px;
  left: 0%;
  border-radius: 2%;
  bottom: 48px;
  position: absolute;
  display: flex;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
  }
`;

const AllProductItem = (props) => {
  const imagename = props.image.replace(
    "http://10.0.2.2:4000/",
    "http://localhost:4000/"
  );
  const addToFav = () => {
    const userId = localStorage.getItem("user id");

    const config = {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .put(
        `http://localhost:4000/api/fav/${props.id}/${userId}`,

        config
      )
      .then((response) => {
        toast("Added to favorite");
        console.log(response);
      })
      .catch((e) => {
        console.log(toast("error"));
      });
  };

  return (
    <Container>
      <ToastContainer />
      <Circle />
      <div style={{ width: "350px", height: "400px", zIndex: "2" }}>
        <Image src={imagename} />
      </div>
      <div style={{ font: "1.25rem", fontWeight: "bold" }}>{props.name}</div>
      <div style={{ font: "1.25rem", fontWeight: "bold" }}>
        R.S {props.price}
      </div>
      <Info>
        <Icon>
          <Link to={`/ProductDetail/${props.id}`} className="btn">
            View Details
          </Link>
          <FavoriteBorderSharpIcon
            style={{ margin: "10" }}
            onClick={() => {
              addToFav();
            }}
          />
          {/* <SearchOutlined onClick={ProductDetails} /> */}
        </Icon>
        <div style={{ font: "2.25rem", fontWeight: "bold" }}>
          {/* <button onClick={addToFav}>Add to Fav</button> */}
        </div>
      </Info>
    </Container>
  );
};

export default AllProductItem;
