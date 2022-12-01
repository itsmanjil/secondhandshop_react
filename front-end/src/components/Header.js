import Search from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
const Container = styled.div`
  height: 80px;
  padding-bottom: 70px;
  background-color: #697179;
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

const Logo = styled.h1`
  font-weight: bold;
  text-decoration: none;
  color: black;
`;
const Right = styled.div``;

const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

const Header = () => {
  const [login, setLogin] = useState();

  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  const tokenSet = localStorage.getItem("token");

  console.log(tokenSet);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <Container style={{ paddingbottom: "100px" }}>
        <Wrapper>
          <HandshakeOutlinedIcon />
          <Left style={{ paddingright: "500px" }}>
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              <Logo>SecondHandShop</Logo>
            </Link>
          </Left>
          <Right className="d-flex">
            <ul style={{ display: "flex", gap: "10px", listStyle: "none" }}>
              <li style={{ textDecoration: "none" }}>
                {tokenSet != null && (
                  <Link className="nav-link" to="/fav">
                    All&nbsp;favorites
                  </Link>
                )}
              </li>
              <li style={{ textDecoration: "none" }}>
                {tokenSet != null && (
                  <Link className="nav-link" to="/addProdcut">
                    Add&nbsp;Products
                  </Link>
                )}
              </li>
              {/* <li style={{ textDecoration: "none" }}>
              {tokenSet != null && (
                <Link className="nav-link" to="/myproduct">
                  My&nbsp;product
                </Link>
              )}
            </li> */}

              <li style={{ textDecoration: "none" }}>
                <Link className="nav-link" to="/allProdcut">
                  All&nbsp;Products
                </Link>
              </li>
              <li style={{ textDecoration: "none" }}>
                {tokenSet != null && (
                  <Link className="nav-link" to="/profile">
                    <AccountCircleOutlinedIcon />
                  </Link>
                )}
              </li>
              {tokenSet == null ? (
                <Link to="/login" className="nav-link ">
                  <Button variant="outlined">Login</Button>
                </Link>
              ) : (
                <li
                  style={{ textDecoration: "none" }} // onClick={(prev) => setLogOut(!prev)}
                >
                  <Link
                    to="/login"
                    className="nav-link "
                    onClickCapture={logout}
                  >
                    <Button color="error" variant="outlined">
                      Log out
                    </Button>
                  </Link>
                </li>
              )}
            </ul>

            {tokenSet == null && (
              <Link
                to="/register"
                className="nav-link "
                style={{ paddingleft: "20px" }}
              >
                <Button variant="outlined">Register</Button>
              </Link>
            )}
          </Right>
        </Wrapper>
      </Container>
    </ColorModeContext.Provider>
  );
};

export default Header;
