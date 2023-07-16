import React, { Fragment, useEffect, useState } from "react";
// import MetaData from "../layout/MetaData";
// import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import Search from "@mui/icons-material/Search";

import "./Profile.css";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";

import { AxiosInstance } from "../../Shared/AxiosInstance/AxiosInstance";

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
  localStorage.clear();
  window.location.href = "/";
};

const Profile = () => {
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    AxiosInstance.get("user/me", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        setUser(res.data.user);
        console.log("Profile data" + JSON.stringify(res.data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <Fragment>
      <div className="profileContainer">
        <div>
          <h1>{user.name}'s Profile</h1>
          <img
            className="img"
            src="https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=800x600&vertical=top"
          />
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>

          <div>
            <h4>Phone</h4>
            <p>{user.phone}</p>
          </div>

          <div style={{ backgroundcolor: "blue" }}>
            <Link to="/fav">My Favorite</Link>
            <Link to="/myproduct">My Product</Link>
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
