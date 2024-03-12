import { message } from "antd";
import axios from "axios";
import { createContext, useState } from "react";
const initialState = {
  user: {},
  favorites_tv: [],
  favorites_movie: [],
  playlists: [],
  logged: false,
  id_LS: localStorage.getItem("userId") ? localStorage.getItem("userId") : "",
};

export const UserContext = createContext(initialState);

export function UserProvider({ children }) {
  const [state, setState] = useState({
    user: {},
    favorites_tv: [],
    favorites_movie: [],
    playlists: [],
    id_LS: localStorage.getItem("userId"),
    logged: false,
  });

  function setUser(user) {
    setState((state) => ({ ...state, user: user, logged: true }));
    setFavorites(user.user_favorite_movie, user.user_favorite_tv);

    // console.log("User setteado", user);
  }

  const logOut = () => {
    localStorage.clear();
    setState((s) => ({ ...s, id_LS: null, user: {}, logged: false }));
  };

  const addToFavorites_movie = async (userId, movieId, title) => {
    try {
      const newFavorite = await axios.post(
        `http://localhost:4000/user/${userId}/favorites/movies/${movieId}`
      );

      const user = await axios.get(`http://localhost:4000/user/${userId}`);
      setUser(user.data);

      message.success(`${title} added to your favorites  !`, 1);
    } catch (error) {
      // message.success(`${title} already exisist your favorites  ${type} !`);

      console.log(error);
    }
  };
  const deleteFavorites_movie = async (userId, movieId, title) => {
    try {
      const newFavorite = await axios.delete(
        `http://localhost:4000/user/${userId}/favorites/movies/${movieId}`
      );

      const user = await axios.get(`http://localhost:4000/user/${userId}`);

      setUser(user.data);
      // message.destroy
      message.info(`${title} deleted from favorites  !`);
    } catch (error) {
      console.log(error);
    }
  };
  const addToFavorites_tv = async (userId, tvId, title) => {
    try {
      const newFavorite = await axios.post(
        `http://localhost:4000/user/${userId}/favorites/tv/${tvId}`
      );

      const user = await axios.get(`http://localhost:4000/user/${userId}`);
      setUser(user.data);

      message.success(`${title} added to your favorites  ${type} !`);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFavorites_tv = async (userId, tvId, title) => {
    try {
      const newFavorite = await axios.delete(
        `http://localhost:4000/user/${userId}/favorites/tv/${tvId}`
      );

      const user = await axios.get(`http://localhost:4000/user/${userId}`);
      setUser(user.data);

      message.destroy(`${title} deleted from favorites ${type} !`);
    } catch (error) {
      console.log(error);
    }
  };

  const isFavorite = (idToCheck, type) => {
    const fav_id_movie = state.user.user_favorite_movie.map((m) => m.idMovie);
    const fav_id_tv = state.user.user_favorite_tv.map((m) => m.idTv);

    // console.log({ type, idToCheck, fav_id_movie, fav_id_tv });

    return type === "movie"
      ? fav_id_movie.includes(idToCheck)
      : fav_id_tv.includes(idToCheck);
  };

  const setFavorites = async (arrayMovies, arrayTv) => {
    const arrayOfTvsId = arrayTv.map((m) => m.idTv);
    const arrayOfMoviesId = arrayMovies.map((m) => m.idMovie);
    // console.log("Inicio FAVORITES: ", arrayOfMoviesId);

    const fetchMovieDetails = async (movieId) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/movies/details/${movieId}`
        );

        return response.data; // Suponiendo que los detalles de la película se encuentren en response.data
      } catch (error) {
        console.error("Error al obtener detalles de la película:", error);
        // return null;
      }
    };
    const fetchTvDetails = async (tvId) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/tv/details/${tvId}`
        );

        return response.data; // Suponiendo que los detalles de la película se encuentren en response.data
      } catch (error) {
        console.error("Error al obtener detalles de la tv serie:", error);
        // return null;
      }
    };

    // Función para obtener los detalles de todas las películas en arrayOfMoviesId
    const fetchAllMovieDetails = async () => {
      try {
        const detailsPromises_Movies = arrayOfMoviesId.map((movieId) =>
          fetchMovieDetails(movieId)
        );
        const detailsPromises_Tv = arrayOfTvsId.map((movieId) =>
          fetchTvDetails(movieId)
        );
        const movie_DetailsArray = await Promise.all(detailsPromises_Movies);
        const tv_DetailsArray = await Promise.all(detailsPromises_Tv);

        // console.log("EN PROMISE ALL", { movieDetailsArray });

        setState((state) => ({
          ...state,
          favorites_movie: movie_DetailsArray,
          favorites_tv: tv_DetailsArray,
        }));

        return { movie_DetailsArray, tv_DetailsArray };
      } catch (error) {
        console.log({ error });
      }
    };

    fetchAllMovieDetails();
  };

  const createPlaylist = async (userId, playlist_name) => {
    try {
      await axios.post(`http://localhost:4000/user/${userId}/playlist`, {
        playlist_name,
      });
      const user = await axios.get(`http://localhost:4000/user/${userId}`);
      setUser(user.data);

      message.success(`Playlist ${playlist_name}, created succesfully !`);
    } catch (error) {}
  };
  const deletePlaylist = async (userId, playlist_id) => {
    try {
      await axios.delete(
        `http://localhost:4000/user/${userId}/playlist/${playlist_id}`
      );
      const user = await axios.get(`http://localhost:4000/user/${userId}`);
      setUser(user.data);

      message.warning(`Playlist ${playlist_name}, deleted succesfully !`);
    } catch (error) {
      console.log({ error });
    }
  };

  const editUser = async (userId, payload) => {
    try {
      await axios.put(`http://localhost:4000/user/${userId}`, payload);
      const user = await axios.get(`http://localhost:4000/user/${userId}`);
      setUser(user.data);
      message.success("User edited successfully !");
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <UserContext.Provider
      value={{
        ...state,
        setUser,
        logOut,
        addToFavorites_movie,
        addToFavorites_tv,
        setFavorites,
        deleteFavorites_movie,
        deleteFavorites_tv,
        isFavorite,
        createPlaylist,
        deletePlaylist,
        editUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
