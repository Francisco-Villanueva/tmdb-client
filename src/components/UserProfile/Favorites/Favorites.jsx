import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import List from "../../List/List";
import { Link } from "react-router-dom";
export default function Favorites() {
  const { favorites } = useContext(UserContext);

  // console.log(favorites);
  return (
    <div>
      <List list_name={"Favorites"} movies_list={favorites} />
    </div>
  );
}
