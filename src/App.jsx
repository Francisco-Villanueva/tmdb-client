import { useEffect, useState } from "react";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Landing from "./components/Login/Landing";
import HomePage from "./components/Home/HomePage";
import Searched from "./components/SearchedResults/Searched";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import { MoviesContext } from "./context/MoviesContext";
import Loading from "./commons/Loading";
import { TvContext } from "./context/TvContext";
import UserProfile from "./components/UserProfile/UserProfile";
import { SearchContext } from "./context/SearchContext";
import ReactPlayer from "react-player";
import Welcome from "./components/Welcome.jsx/Welcome";
function App() {
  const { user, id_LS, setUser } = useContext(UserContext);
  const { setMoviesData, movies: moviesData } = useContext(MoviesContext);
  const { setTvData, tv } = useContext(TvContext);
  const { movies, search } = useContext(SearchContext);
  useEffect(() => {
    setMoviesData();
    setTvData();
    if (id_LS && !user.name) {
      axios.get(`http://localhost:4000/user/${id_LS}`).then(({ data }) => {
        setUser(data);
      });
    }
  }, [id_LS]);

  return (
    <div className="app ">
      {/* <UserPopOver /> */}

      <Routes>
        <Route path="/login" element={<Landing />} />
        <Route path="/register" element={<Landing />} />

        <Route
          path="/"
          element={
            <div>
              <Navbar />
              <>
                {!Object.keys(moviesData).length ? (
                  <Loading />
                ) : (
                  <>
                    {search ? (
                      <Searched busqueda={search} movies_list={movies} />
                    ) : (
                      <HomePage />
                    )}
                    <Footer />
                  </>
                )}
              </>
            </div>
          }
        />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
