import styled from "styled-components";
import { mobile } from "../../responsive";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url("https://static.vecteezy.com/system/resources/previews/001/410/750/original/cyber-monday-happy-shopping-background-free-vector.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [password, Setpassword] = useState("");
  const [email, Setemail] = useState("");
  const [name, Setname] = useState("");
  const [phone, Setphone] = useState("");

  const registerCustomer = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      name: name,
      phone: phone,
      password: password,
    };
    axios
      .post("http://localhost:4000/api/user/register", data)
      .then((response) => {
        toast("Account Created succesfull");
        console.log("succesfull");
      })
      .catch((e) => {
        console.log(toast("Error"));
      });
  };

  return (
    <Container>
      <ToastContainer />
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input onChange={(e) => Setname(e.target.value)} placeholder="name" />
          <Input
            onChange={(e) => Setphone(e.target.value)}
            placeholder="phone number"
          />
          <Input
            onChange={(e) => Setemail(e.target.value)}
            placeholder="email"
          />
          <Input
            type="password"
            onChange={(e) => Setpassword(e.target.value)}
            placeholder="password"
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={registerCustomer}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
