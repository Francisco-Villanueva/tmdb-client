import axios from "axios";
import { createContext, useState } from "react";
const initialState = {
  movies: {},
};

export const MoviesContext = createContext(initialState);

export function MoviesProvider({ children }) {
  const [state, setState] = useState({
    movies: {},
    topRated: [],
    nowPlaying: [],
    upcoming: [],
    popular: [],
  });

  const setMoviesData = async () => {
    try {
      const movies = await axios.get(`http://localhost:4000/movies`);

      // console.log(movies.data);

      setState((state) => ({
        ...state,
        movies: movies.data,
        popular: movies.data.popular,
        topRated: movies.data.topRated,
        nowPlaying: movies.data.nowPlaying,
        upcoming: movies.data.upcoming,
      }));
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        ...state,
        setMoviesData,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
