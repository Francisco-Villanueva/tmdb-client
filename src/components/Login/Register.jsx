import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

export default function Register() {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const navigateTo = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:4000/user/register", userData)
      .then(() => {
        message.success("Registered succesfully !");
        setTimeout(() => navigateTo("/login"), 1000);
      })
      .catch((e) =>
        message.error(`Invalid login credentials. Please try again.`)
      );

    setUserData({
      email: "",
      name: "",
      password: "",
    });
  };

  const handleInputChange = (e) => {
    setUserData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  return (
    <Box
      sx={{
        my: 0,
        mx: 8,
        display: "flex",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h4">
        Sign Up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="dense"
          fullWidth
          id="username"
          label="Username"
          name="name"
          autoFocus
          onChange={handleInputChange}
          value={userData.name}
        />
        <TextField
          margin="dense"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleInputChange}
          value={userData.email}
        />
        <TextField
          margin="dense"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleInputChange}
          value={userData.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign up
        </Button>
        {/* <Grid container>
          <Grid item xs>
            <LinkRouter to={"/login"}>
              {"Don't have an account? Sign Up"}
            </LinkRouter>
          </Grid>
        </Grid> */}
      </Box>
    </Box>
  );
}
