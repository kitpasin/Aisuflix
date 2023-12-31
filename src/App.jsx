import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./layouts/Header";
import Home from "./pages/home/Home";
import Movies from "./pages/movies/Movies";
import MoviesDetail from "./pages/movies/MoviesDetail";
import Series from "./pages/series/Series";
import SeriesDetail from "./pages/series/SeriesDetail";
import { useState } from "react";
import Login from "./layouts/Login";
import Register from "./layouts/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("auth") || false
  );
  const auth = localStorage.getItem("auth");
  const location = useLocation();

  return (
    <>
      {isLoggedIn == "true" || auth == "true" ? (
        <>
          <Header setIsLoggedIn={setIsLoggedIn} location={location} />
          <main
            className={`w-full h-full min-h-screen ${
              location.pathname == "/"
                ? "bg-black"
                : "bg-[url('/images/main_background.png')] pt-[60px]"
            }  bg-cover`}
          >
            <div
              className={`${location.pathname == "/" ? "p-0" : "p-4 xl:p-12"}`}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movies/:movieID" element={<MoviesDetail />} />
                <Route path="/series" element={<Series />} />
                <Route path="/series/:serieID" element={<SeriesDetail />} />
              </Routes>
            </div>
          </main>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}

export default App;
