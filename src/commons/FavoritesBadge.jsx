import React, { useContext } from "react";
import Badge from "@mui/material/Badge";
// import MailIcon from '@mui/icons-material/Mail';
import MovieIcon from "@mui/icons-material/LocalMoviesRounded";
import TvIcon from "@mui/icons-material/TvOutlined";
import { Popover } from "antd";
import { UserContext } from "../context/UserContext";

export default function FavoriteBadge({ tvCount, movieCount }) {
  const { user } = useContext(UserContext);
  return (
    <>
      {!user.name ? (
        ""
      ) : (
        <div>
          <Badge sx={{ m: "0 10px" }} badgeContent={movieCount} color="warning">
            <MovieIcon color="primary" />
          </Badge>

          <Badge sx={{ m: "0 10px" }} badgeContent={tvCount} color="warning">
            <TvIcon color="primary" />
          </Badge>
        </div>
      )}
    </>
  );
}
