import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { orange } from "@mui/material/colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const AddProduct = (props) => {
  function Notify() {
    toast("Product added sucessfully");
  }

  let navigate = useNavigate();

  const [name, Setname] = useState("");
  const [description, Setdesc] = useState("");
  const [image, Setimage] = useState(null);
  const [category, Setcategory] = useState("");
  const [price, setprice] = useState("");
  const [phone, Setphone] = useState("");
  const [condition, setcondition] = useState("");
  const [usedFor, setusedFor] = useState("");
  const inputRef = useRef();
  const [categoryList, setcategoryList] = useState([]);
  console.log(category);

  const userId = localStorage.getItem("user id");
  console.log(userId);
  const Addproducts = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      image: image,
      category: category,
      price: price,
      phone: phone,
      owner_id: userId,
      condition: condition,
      usedFor: usedFor,
    };
    // console.log(image);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .post(
        "http://localhost:4000/api/products",
        data,
        config
        // toast("Product Added sucessfully")
      )
      .then((response) => {
        toast("Product Added sucessfully");
        if (response.data.token) {
          return navigate("/myproduct");
        } else {
          // setMessage("Invalid Login Crenditials.");
        }
      })
      .catch((e) => {
        console.log(toast("Error detected"));
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/category")
      .then((res) => {
        setcategoryList(res.data.data);
        console.log("category data" + JSON.stringify(res.data));
      })
      // .then(({ data }) => Setcategory(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container
      style={{ backgroundcolor: "#d6d9deb5" }}
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ToastContainer />
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AddCircleRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Product
        </Typography>
        <Box component="form" noValidate onSubmit={Addproducts} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <message />
              <TextField
                onChange={(e) => Setname(e.target.value)}
                autoComplete="given-name"
                name="Name"
                required
                fullWidth
                id="filled"
                label="Product Name"
                variant="filled"
                autoFocus
              />
            </Grid>
            <Grid item xs={14}>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => Setimage(e.target.files[0])}
                ref={inputRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                style={{ width: 400 }}
                onChange={(e) => Setdesc(e.target.value)}
                required
                fullWidth
                id="Description"
                label="Specification"
                name="Description"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setprice(e.target.value)}
                required
                fullWidth
                id="Price"
                label="Price"
                name="Price"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => Setphone(e.target.value)}
                required
                fullWidth
                id="Phone"
                label="Phone Number"
                name="Phone"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <select
                className="form-control"
                onChange={(e) => Setcategory(e.target.value)}
              >
                {categoryList &&
                  categoryList.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setcondition(e.target.value)}
                required
                fullWidth
                name="condition"
                label="condition"
                id="condition"
                variant="filled"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onChange={(e) => setusedFor(e.target.value)}
                required
                fullWidth
                name="usedFor"
                label="usedFor"
                id="usedFor"
                variant="filled"
              />
            </Grid>
            <Grid item xs={20}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // onClick={Notify}
          >
            Add Product
          </Button>
          <Grid item xs={20}></Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default AddProduct;
