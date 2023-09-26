import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "./layouts/Header";
import Home from "./pages/home/Home";
import Movies from "./pages/movies/Movies";
import MoviesDetail from "./pages/movies/MoviesDetail";
import Series from "./pages/series/Series";
import SeriesDetail from "./pages/series/SeriesDetail";
import { useEffect, useState } from "react";
import Login from "./layouts/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("auth") || false
  );
  const auth = localStorage.getItem("auth");
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);

  useEffect(() => {
    navigate(location.pathname)
  }, [])

  return (
    <>
      {isLoggedIn == "true" || auth == "true" ? (
        <>
          <Header setIsLoggedIn={setIsLoggedIn} />
          <main
            className={`w-full h-[calc(100vh-60px)] ${
              location.pathname == "/"
                ? "bg-black"
                : "bg-[url('/images/main_background.png')]"
            }  bg-cover overflow-x-hidden`}
          >
            <div
              className={`${location.pathname === "/" ? "p-0" : "p-4 xl:p-12"}`}
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
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default App;
