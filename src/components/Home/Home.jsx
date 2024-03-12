import React, { useContext, useEffect, useState } from "react";
import MoreInfo from "../../commons/MoreInfo";
import ModalInfo from "../../commons/ModalInfo";
import useModal from "../../hooks/useModal";
import useRandom from "../../hooks/useRandom";
import noImage from "../../imgs/cineLogo.png";
import Loading from "../../commons/Loading";
import { Box } from "@mui/material";
import { MoviesContext } from "../../context/MoviesContext";
import { UserContext } from "../../context/UserContext";
import Modal_AddPlaylist from "../../commons/Modal_AddPlaylist";

export default function Home() {
  const [homeMovie, setHomeMovie] = useState({
    title: "",
    poster_path: "",
    backdrop_path: "",
    overview: "",
    id: "",
  });

  const { topRated } = useContext(MoviesContext);

  const { randomIndex, handlePause } = useRandom(20, 30);

  useEffect(() => {
    if (topRated.length > 0) {
      const { title, poster_path, backdrop_path, overview, id } =
        topRated[randomIndex];
      setHomeMovie({ title, poster_path, backdrop_path, overview, id });
    }
  }, [randomIndex, topRated.length]);
  const { title, backdrop_path, id } = homeMovie;
  const { open, handleClose, handleOpen } = useModal();
  const {
    open: openPlaylist,
    handleClose: handleClosePlaylist,
    handleOpen: handleOpenPlaylist,
  } = useModal();

  return (
    <section className="home_section">
      <div className="top_movie fade-in-fwd ">
        {topRated.length ? (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
              alt={title}
            />
            <div className="top_movie_info">
              <h1>{title}</h1>
              <div className="top_movie_info_btns">
                <MoreInfo
                  size={40}
                  showInfo={handleOpen}
                  handlePause={handlePause}
                  showAddPlaylist={handleOpenPlaylist}
                  title={title}
                  id={id}
                  type="movie"
                />
                {open ? (
                  <ModalInfo
                    open={open}
                    handleClose={handleClose}
                    handlePause={handlePause}
                    id={id}
                    type="movie"
                  />
                ) : (
                  ""
                )}

                {openPlaylist ? (
                  <Modal_AddPlaylist
                    {...{
                      openPlaylist,
                      handleClosePlaylist,
                      handleOpenPlaylist,
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        ) : (
          <Box sx={{ position: "absolute" }}>
            <Loading />
          </Box>
        )}
      </div>
    </section>
  );
}
