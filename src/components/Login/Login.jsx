import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import useConfig from "antd/es/config-provider/hooks/useConfig";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { setUser, setFavorites } = useContext(UserContext);

  const navigateTo = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:4000/user/login", userData)
      .then((user) => {
        // console.log({ USER: user.data, id: user.data.id });
        setUser(user.data);
        setFavorites(user.data.user_favorite);
        localStorage.setItem("userId", user.data.id);
        message.success(`Welcome back ${user.data.name} !`);
        setTimeout(() => navigateTo("/"), 1000);

        return user.data;
      })
      .catch(() => {
        message.error("Invalid login credentials. Please try again.");
      });

    setUserData({
      email: "",
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
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <LinkRouter to={"/register"}>
              {"Don't have an account? Sign Up"}
            </LinkRouter>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
