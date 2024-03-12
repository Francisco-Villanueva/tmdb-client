import { Grid } from "@mui/material";
import React from "react";
import MoreInfo from "../../commons/MoreInfo";
import useModal from "../../hooks/useModal";
import ModalInfo from "../../commons/ModalInfo";

export default function Big_item({ tv, type }) {
  // console.log(tv);
  const { open, handleClose, handleOpen } = useModal();
  const { backdrop_path, name, overview, id } = tv;
  return (
    <div className="big_item">
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt={name}
      />
      <aside>
        <h2>{name}</h2>
        <span>{overview.slice(0, 350)}</span>
        <MoreInfo
          id={id}
          title={name}
          size={50}
          font={20}
          showInfo={handleOpen}
          type={"tv"}
        />
        {open ? (
          <ModalInfo
            open={open}
            handleClose={handleClose}
            id={id}
            type={type}
          />
        ) : (
          ""
        )}
      </aside>
    </div>
  );
}
