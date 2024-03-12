import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import OptionsIcon from "@mui/icons-material/AddToPhotosOutlined";

import { message } from "antd";
import { UserContext } from "../context/UserContext";

export default function MoreInfo({
  size,
  font,
  showInfo,
  handlePause,
  title,
  onlyFav = false,
  id,
  type,
}) {
  const {
    user,
    addToFavorites_movie,
    addToFavorites_tv,
    isFavorite,
    deleteFavorites_movie,
    deleteFavorites_tv,
  } = useContext(UserContext);
  const handleClick = () => {
    showInfo();
    if (handlePause) handlePause();
  };

  const handelFavorites = () => {
    if (!user.name) {
      message.warning(`Log in to add to favorites.`);
    } else {
      type === "movie"
        ? !isFavorite(id, type)
          ? addToFavorites_movie(user.id, id, title)
          : deleteFavorites_movie(user.id, id, title)
        : !isFavorite(id, type)
        ? addToFavorites_tv(user.id, id, title)
        : deleteFavorites_tv(user.id, id, title);
    }
  };
  return (
    <Box sx={{ "& > :not(style)": { m: 0.5, border: "none", p: ".5em 0" } }}>
      {!onlyFav && (
        <Fab
          onClick={handleClick}
          color="primary"
          aria-label="add"
          sx={{ width: size, height: size, minHeight: "1px", p: 2 }}
        >
          <InfoOutlinedIcon sx={{ fontSize: font || 20 }} />
        </Fab>
      )}

      {user.name ? (
        !isFavorite(id, type) ? (
          <>
            <Fab
              onClick={handelFavorites}
              aria-label="like"
              color="info"
              sx={{ width: size, height: size, minHeight: "1px", p: 2 }}
            >
              <FavoriteIcon sx={{ fontSize: font || 20 }} />
            </Fab>
            <Fab
              // onClick={handleClick}
              disabled={true}
              color="warning"
              aria-label="add"
              sx={{ width: size, height: size, minHeight: "1px", p: 2 }}
            >
              <OptionsIcon sx={{ fontSize: font || 20 }} />
            </Fab>
          </>
        ) : (
          <>
            <Fab
              onClick={handelFavorites}
              aria-label="like"
              color="default"
              sx={{ width: size, height: size, minHeight: "1px", p: 2 }}
            >
              <DeleteIcon sx={{ fontSize: font || 20 }} />
            </Fab>
            <Fab
              onClick={handleClick}
              disabled={true}
              color="primary"
              aria-label="add"
              sx={{ width: size, height: size, minHeight: "1px", p: 2 }}
            >
              <OptionsIcon sx={{ fontSize: font || 20 }} />
            </Fab>
          </>
        )
      ) : (
        ""
      )}
    </Box>
  );
}
