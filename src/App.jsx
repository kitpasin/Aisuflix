import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./layouts/Header";
import Home from "./pages/home/Home";
import Movies from "./pages/movies/Movies";
import MoviesDetail from "./pages/movies/MoviesDetail";
import Series from "./pages/series/Series";
import SeriesDetail from "./pages/series/SeriesDetail";
import { useEffect, useState } from "react";
import Login from "./layouts/Login";
import Register from "./layouts/Register";
import { useAccount } from "./context/AccountContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("auth") || false
  );
  const auth = localStorage.getItem("auth");
  const location = useLocation();
  const { accounts } = useAccount();

  useEffect(() => {
    const existingAccountsString = localStorage.getItem("accounts");
    const existingAccounts = existingAccountsString
      ? JSON.parse(existingAccountsString)
      : [];
    if (existingAccounts.length <= 1) {
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  }, []);

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
            }  bg-cover overflow-x-hidden overflow-y-auto`}
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
