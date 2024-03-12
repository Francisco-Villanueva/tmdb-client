import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import { Button } from "antd";
import { UserContext } from "../../context/UserContext";

export default function Profile({ user }) {
  const { logOut } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navTo = useNavigate();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {user.name ? (
        <>
          <Chip
            avatar={
              <Avatar sx={{ bgcolor: user.color }}>
                {user.name.slice(0, 1).toUpperCase()}
              </Avatar>
            }
            label={user.name.toUpperCase()}
            style={{ color: "#fff", cursor: "pointer" }}
            clickable
            onClick={handleClick}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "5vw",
                // gap: "1em",
              }}
            >
              <button
                style={{
                  padding: "10px",
                  background: "#fff",
                  color: "#000",
                  border: "none",
                  fontWeight: "600",
                  textAlign: "start",
                  paddingLeft: "15px",
                  cursor: "pointer",
                  ":hover": "color",
                }}
                onClick={() => navTo("/user")}
              >
                User
              </button>
              <button
                style={{
                  padding: "10px",
                  background: "#cecece",
                  color: "#000",
                  border: "none",
                  fontWeight: "600",
                  textAlign: "start",
                  paddingLeft: "15px",
                  cursor: "pointer",
                }}
                onClick={logOut}
              >
                Log out{" "}
              </button>
            </div>
          </Popover>
        </>
      ) : (
        // <UserPopOver />
        <Link
          style={{ background: "unset", border: "unset", cursor: "pointer" }}
          to={"/login"}
        >
          <Chip label={"LOGIN"} style={{ color: "#fff" }} color="primary" />
        </Link>
      )}
    </>
  );
}
