import Search from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const Container = styled.div`
  height: 60px;
  padding-bottom: 70px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-decoration: none;
  color: #00bcd4;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user id");
};

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <HomeIcon></HomeIcon>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "black", fontSize: 16 }} />
          </SearchContainer>
        </Left>

        <Center>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            <Logo>SecondHandShop</Logo>
          </Link>
        </Center>
        <Right>
          <ul style={{ display: "flex", gap: "10px", listStyle: "none" }}>
            <li style={{ textDecoration: "none" }}>
              <Link className="nav-link" to="/allProdcut">
                All&nbsp;Products
              </Link>
            </li>
          </ul>
          <Link to="/login" className="nav-link ">
            <Button variant="outlined">Login</Button>
          </Link>
          <Link className="nav-link " to="/register">
            <Button variant="outlined">Register</Button>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
