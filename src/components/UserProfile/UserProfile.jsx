import React, { useContext, useState } from "react";
import Favorites from "./Favorites/Favorites";
import { UserContext } from "../../context/UserContext";
import List from "../List/List";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Chip } from "@mui/material";
import Divider from "@mui/material/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PlaylistCard from "./PlaylistCard/PlaylistCard";
import { TransitionGroup } from "react-transition-group";
import CardsContainer from "./PlaylistCard/CardsContainer";
export default function UserProfile() {
  const { user, favorites_movie, favorites_tv, createPlaylist } =
    useContext(UserContext);
  // console.log(favorites_movie, favorites_tv);

  // console.log(user);
  const [playlist_name, setPlayListName] = useState("");

  const handleInputPlaylist = (e) => {
    setPlayListName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createPlaylist(user.id, playlist_name);
    setPlayListName("");
  };
  return (
    <div className="userProfile_main">
      <button className="btn_back">
        <Link to={"/"} style={{ color: "unset" }}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </button>
      {/* <br /> */}

      {user.name ? (
        <>
          <UserCard user={user} />

          <div className="playlists_favorites_section">
            <div className="child1">
              <Divider>
                <h1 style={{ fontSize: "25px" }}>Favorites</h1>
              </Divider>
              <div className="userProfiler_favorites_section">
                <div className="favoriteList_container">
                  {favorites_movie[0] ? (
                    <List
                      list_name={" MOVIES"}
                      movies_list={favorites_movie}
                      type={"movie"}
                    />
                  ) : (
                    <>
                      <h3>Movies</h3>
                      <span>No favorites movies ...</span>
                    </>
                  )}
                </div>
                <div className="favoriteList_container">
                  {favorites_tv[0] ? (
                    <List
                      list_name={" TV- SERIES"}
                      movies_list={favorites_tv}
                      type={"tv"}
                    />
                  ) : (
                    <>
                      <h3>TV - SERIES</h3>
                      <span>No favorites tv series ...</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="child2">
              <Divider>
                <h1 style={{ fontSize: "25px" }}>Playlists</h1>
              </Divider>
              <CardsContainer playlist={user.user_playlist} />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
