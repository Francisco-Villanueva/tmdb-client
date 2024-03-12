import React, { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
import { UserContext } from "../../../context/UserContext";
import PlaylistCard from "./PlaylistCard";
import { message } from "antd";

export default function CardsContainer({}) {
  const { createPlaylist, user, deletePlaylist } = useContext(UserContext);
  const { user_playlist: playlists } = user;
  const [playlist_name, setPlayListName] = useState("");

  const handleInputPlaylist = (e) => {
    setPlayListName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (playlist_name !== "") {
      createPlaylist(user.id, playlist_name);
      setPlayListName("");
    } else {
      message.warning("Please enter a name for playlist!", 2);
    }
  };

  const handleDeletePlaylist = (idPlaylist) => {
    deletePlaylist(user.id, idPlaylist);
  };
  console.log(playlists.length);
  return (
    <div className="playlist_container">
      <form className="form_newPlaylist" onSubmit={handleSubmit}>
        <input
          className="newPlaylis_input"
          type="text"
          value={playlist_name}
          placeholder="Playlist Name..."
          onChange={handleInputPlaylist}
        />
        <button className="newPlaylis_btn"> + </button>
      </form>
      {playlists.length > 0 ? (
        <TransitionGroup>
          {playlists.map((item) => (
            <Collapse key={item.id}>
              <PlaylistCard
                playlist={item}
                handleRemove={handleDeletePlaylist}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      ) : (
        <span>{"No playlists  ..."}</span>
      )}
    </div>
  );
}
