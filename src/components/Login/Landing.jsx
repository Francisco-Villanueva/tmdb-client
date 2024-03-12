import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function Landing() {
  const { pathname } = useLocation();

  // console.log(pathname.slice(1));
  return (
    <Grid
      container
      component="main"
      sx={{
        position: "absolute",
        left: 0,
        height: "100vh",
        width: "100%",
      }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://omega.gg/vox/repository/hub/tmdb/tmdb.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        bgcolor={"rgba(255,255,255,.9)"}
        elevation={5}
        square
      >
        {pathname.slice(1) === "login" ? <Login /> : <Register />}
      </Grid>
    </Grid>
  );
}

{
  /* <Routes>
<Route path="" element={<Login />} />
<Route path="register" element={<Register />} />
</Routes> */
}
