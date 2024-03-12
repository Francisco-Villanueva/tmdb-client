import React, { useEffect, useState } from "react";
import { Box, backdropClasses } from "@mui/material";
import Modal from "@mui/material/Modal";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import axios from "axios";
import Details from "./Details/Details";
import List from "../components/List/List";

export default function Modal_AddPlaylist(props) {
  console.log({ props });
  const [similars, setSimilars] = useState([]);
  const closeHandle = () => {
    handleClose();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          color: "#000",
          backdropFilter: "blur(10px)",
          transition: "all .3s",
        }}
      >
        <div className="modal_main_conainter">
          <button onClick={closeHandle} className="modal_closetBtn">
            x
          </button>
          <VideoPlayer videoId={trailer?.key} />
          <div className="modal_infoContainer">
            <Details {...selected} id={id} type={type} />
            <List
              list_name={"Similars"}
              movies_list={similars}
              onlyFav={true}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
