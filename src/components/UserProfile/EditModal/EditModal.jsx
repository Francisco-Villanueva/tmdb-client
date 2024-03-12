import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import "./EditModal.scss";
import EditTable from "./EditTable";
export default function EditModal({ handleClose }) {
  const { user } = useContext(UserContext);
  return (
    <div className="editModal_main">
      <button onClick={handleClose}>x</button>

      <div>
        <span>{user.name}</span>
        <EditTable />
      </div>
    </div>
  );
}
