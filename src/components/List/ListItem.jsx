import React, { useEffect } from "react";
import MoreInfo from "../../commons/MoreInfo";
import useModal from "../../hooks/useModal";
import ModalInfo from "../../commons/ModalInfo";
import noImage from "../../imgs/cineLogo.png";
export default function ListItem({ movie, onlyFav, type }) {
  const { title, poster_path, id, name } = movie;
  const { open, handleClose, handleOpen } = useModal();

  // console.log({ id, title });
  return (
    <div className="list_item">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w200${poster_path}`
            : noImage
        }
        alt={title}
        className={poster_path ? "listItem_img" : "listItem_no_img "}
      />

      <div className="list_item_info">
        {/* <h1>TIPO {type}</h1> */}
        {/* <b>{title}</b> */}
        <MoreInfo
          size={30}
          font={20}
          showInfo={handleOpen}
          onlyFav={onlyFav}
          title={title || name}
          id={id}
          type={type}
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
      </div>
    </div>
  );
}
