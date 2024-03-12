import { Chip } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PlaylistCard({ playlist, handleRemove }) {
  // console.log({ playlist });
  const { name, playlist_movie, id } = playlist;

  return (
    <div className="playlistCard_main">
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Chip
          label={name.slice(0, 1).toUpperCase()}
          style={{ background: "#FFF" }}
        />
        <h2>{name}</h2>
      </div>

      <span>
        <b> {playlist_movie?.length} </b> | movies
      </span>

      <DeleteIcon
        onClick={() => handleRemove(id)}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
