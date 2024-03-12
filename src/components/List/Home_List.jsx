import React, { useContext } from "react";
import List from "./List";
import useRandom from "../../hooks/useRandom";
import Big_item from "./Big_item";
import { Divider } from "@mui/material";
import { MoviesContext } from "../../context/MoviesContext";
import { TvContext } from "../../context/TvContext";
export default function Home_List() {
  const {
    topRated: tv_TopRated,
    popular: tv_popular,
    airingToday,
    onTheAir,
  } = useContext(TvContext);
  const { popular, topRated, nowPlaying, upcoming } = useContext(MoviesContext);
  const { randomIndex } = useRandom(20, 20);
  const randomTv = tv_TopRated.length ? tv_TopRated[randomIndex] : "";
  return (
    <div>
      <List list_name={"Populares"} movies_list={popular} type="movie" />
      <List list_name={"Top Rated"} movies_list={topRated} type="movie" />
      <List list_name={"Now Playing"} movies_list={nowPlaying} type="movie" />

      <hr style={{ width: "70vw" }} />
      <br />
      <div>{randomTv ? <Big_item tv={randomTv} type="tv" /> : "loading"}</div>

      <List list_name={"TV Popular"} movies_list={tv_popular} type="tv" />
      <List list_name={"TV On The Air"} movies_list={onTheAir} type="tv" />
      <List list_name={"TV Airing Today"} movies_list={airingToday} type="tv" />
    </div>
  );
}
