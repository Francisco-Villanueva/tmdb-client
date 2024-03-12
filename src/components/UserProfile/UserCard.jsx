import {
  faAdd,
  faEdit,
  faNewspaper,
  faPlayCircle,
  faReplyAll,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "@mui/material/Avatar";
import React from "react";
import useModal from "../../hooks/useModal";
import EditModal from "./EditModal/EditModal";
export default function UserCard({ user }) {
  const { open, handleClose, handleOpen } = useModal();
  return (
    <>
      {open ? (
        <EditModal handleClose={handleClose} />
      ) : (
        <div className="userCard_container">
          <Avatar sx={{ width: 156, height: 156, bgcolor: user.color }}>
            {user.name?.slice(0, 1).toUpperCase()}
          </Avatar>

          <div className="user_data">
            <h2>{user.name}</h2>
            <h5>{user.email}</h5>
          </div>

          <div className="editBtn_container">
            <button className="editUser_btn">
              <FontAwesomeIcon icon={faEdit} onClick={handleOpen} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
