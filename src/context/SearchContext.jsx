import {
  useRef,
  useState,
  useMemo,
  useCallback,
  createContext,
  useEffect,
} from "react";
import axios from "axios";

const initialState = {
  movies: [],
  search: "",
};

export const SearchContext = createContext(initialState);

export function SearchProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const isFirstInput = useRef(true);
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    setError(null);
  }, [search]);

  const searchMovies = async ({ search }) => {
    if (search === "") return { movies: [], tv: [] };
    try {
      const response = await axios.get(
        `http://localhost:4000/general/search/s=${search}`
      );
      setLoading(true);

      console.log("SEARCH: ", response);
      return response.data;
    } catch (error) {
      throw new Error("Error searching !");
    }
  };

  const prevSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (search === prevSearch.current) return;
    try {
      setError(null);
      prevSearch.current = search;
      const newMovies = await searchMovies({ search });

      setMovies(newMovies);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{ movies, getMovies, search, setSearch, loading, setLoading }}
    >
      {children}
    </SearchContext.Provider>
  );
}
