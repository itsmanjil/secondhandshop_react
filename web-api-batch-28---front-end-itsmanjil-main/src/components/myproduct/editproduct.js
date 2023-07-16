import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate, useParams } from "react-router-dom";

const theme = createTheme();
const Editproduct = (props) => {
  // const params=
  const userId = localStorage.getItem("user id");
  const productId = useParams().id;
  let navigate = useNavigate();

  //   const [products, setProducts] = useState([]);

  const [name, Setname] = useState(props.name);
  const [description, Setdesc] = useState(props.description);
  const [image, Setimage] = useState(props.image);
  const [category, Setcategory] = useState("");
  const [price, setprice] = useState(props.price);
  const [phone, Setphone] = useState(props.phone);
  const [condition, setcondition] = useState(props.condition);
  const [usedFor, setusedFor] = useState(props.usedFor);
  const inputRef = useRef();
  const [categoryList, setcategoryList] = useState([]);
  console.log(props.name);

  //   const UserId = localStorage.getItem("user id");

  console.log(name);

  const editproduct = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      image: image,
      // category: category,
      price: price,
      phone: phone,
      owner_id: userId,
      condition: condition,
      usedFor: usedFor,
    };
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .put(`http://localhost:4000/api/products/${props.id}`, data, config)
      .then((response) => {
        toast("Product Updated sucessfully");

        console.log(response);
      })
      .catch((e) => {
        console.log(toast("error"));
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
    <div style={{ backgroundColor: "white", width: "50%" }}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                {/* <AddCircleRoundedIcon /> */}
              </Avatar>
              <div
                onClick={props.onClick}
                style={{ color: "black", cursor: "pointer" }}
              >
                <CancelSharpIcon color="black" />
              </div>
            </div>
            <Typography component="h1" variant="h5">
              Edit product
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={editproduct}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <message />
                  <TextField
                    autoComplete="given-name"
                    name="Name"
                    required
                    fullWidth
                    value={name}
                    onChange={(e) => Setname(e.target.value)}
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
                  <TextField
                    onChange={(e) => Setdesc(e.target.value)}
                    required
                    value={description}
                    fullWidth
                    id="Description"
                    label="Description"
                    name="Description"
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => setprice(e.target.value)}
                    required
                    fullWidth
                    value={price}
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
                    value={phone}
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
                    value={category}
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
                    value={condition}
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
                    value={usedFor}
                    name="usedFor"
                    label="usedFor"
                    id="usedFor"
                    variant="filled"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit Product
              </Button>
              <Grid item xs={20}></Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};
export default Editproduct;
