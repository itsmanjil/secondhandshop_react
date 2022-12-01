import styled from "styled-components";
import { mobile } from "../../responsive";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import * as React from "react";
import { render } from "@testing-library/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url("https://cdn.pixabay.com/photo/2017/08/07/19/45/ecommerce-2607114_960_720.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  function Notify() {
    toast("You clicked the button");
  }
  let navigate = useNavigate();

  const [password, Setpassword] = useState("");
  const [email, Setemail] = useState("");
  const [message, setMessage] = useState("");
  const [login, setLogin] = useState(false);

  const loginCustomer = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:4000/api/user/login", data)
      .then((response) => {
        console.log(response.data.token);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user id", response.data.logininfo.id);
          window.location.href = "/";
          console.log(response.data);
          // return <Redirect to='/'/>
          return navigate("/"), Notify;
        } else {
          setMessage("Invalid Login Crenditials.");
        }
      })
      .catch((e) => {
        console.log(toast("error"));
      });
  };

  return (
    <Container>
      <ToastContainer />
      <Wrapper>
        {message}
        <Title>SIGN IN</Title>
        <Form>
          <Input
            onChange={(e) => Setemail(e.target.value)}
            placeholder="Email"
          />
          <Input
            type="password"
            onChange={(e) => Setpassword(e.target.value)}
            placeholder="password"
          />
          <Button type="submit" onClick={loginCustomer}>
            LOGIN
          </Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
