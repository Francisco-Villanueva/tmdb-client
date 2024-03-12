import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { MoviesProvider } from "./context/MoviesContext.jsx";
import { TvProvider } from "./context/TvContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <SearchProvider>
      <MoviesProvider>
        <TvProvider>
          <ThemeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </TvProvider>
      </MoviesProvider>
    </SearchProvider>
  </UserProvider>
);
