import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  const [data, setData] = useState(true);
  useEffect(() => {
    setData(true);
  }, []);
  setTimeout(() => {
    setData(!data);
  }, 4000);
  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "100%" }}>
      {data ? <CircularProgress /> : <b>No video!</b>}
    </Box>
  );
}
