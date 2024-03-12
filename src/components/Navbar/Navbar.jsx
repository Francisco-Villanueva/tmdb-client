import React, { useEffect, useContext, useState, Profiler } from "react";
import Profile from "./Profile";
import SwitchTheme from "./SwitchTheme";
import Search from "./Search/Search";
import Popover from "@mui/material/Popover";
import { UserContext } from "../../context/UserContext";
import FavoriteBadge from "../../commons/FavoritesBadge";
import { SearchContext } from "../../context/SearchContext";
export default function Navbar() {
  // console.log(moviesHook);'

  const { favorites, user, id_LS, favorites_movie, favorites_tv } =
    useContext(UserContext);

  const { setSearch, setLoading } = useContext(SearchContext);
  // Función para cambiar el estilo del navbar al hacer scroll
  function handleScroll() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 0) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  }

  // Escuchar el evento de scroll
  window.addEventListener("scroll", handleScroll);

  const handleBack = () => {
    setSearch("");
    setLoading(false);
  };
  return (
    <nav id="navbar" className="navbar_main">
      <h3 onClick={handleBack}>TMDB </h3>

      <Search />

      <div className="navbar_profile">
        <SwitchTheme />
        <Profile user={user} />
        <FavoriteBadge
          tvCount={favorites_tv.length}
          movieCount={favorites_movie.length}
        />
      </div>
    </nav>
  );
}
