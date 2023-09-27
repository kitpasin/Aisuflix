import { Autocomplete, Card, Pagination, TextField } from "@mui/material";
import { movies_2023 } from "../../data/movies_2023";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

function Movies() {
  const [title, setTitle] = useState(null);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredMovies = movies_2023.filter((movie) => {
    const matchesTitle = title ? movie.title === title : true;
    const matchesGenre = genre ? movie.genres.includes(genre) : true;
    return matchesTitle && matchesGenre;
  });

  const pageCount = Math.ceil(filteredMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const moviesToDisplay = filteredMovies.slice(startIndex, endIndex);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [title, genre, currentPage]);

  useEffect(() => {
    if (currentPage !== 1 && moviesToDisplay.length <= itemsPerPage) {
      setCurrentPage(1);
    }
  }, [title, genre]);

  return (
    <>
      <Card
        sx={{
          background: "#334155",
          borderRadius: "10px",
          boxShadow: "1px 1px 5px #000",
        }}
      >
        <div className="bg-[#0f172a] px-4 py-2 text-white text-sm xl:text-xl text-center font-bold">
          <p>Movies</p>
        </div>
        <div className="pt-4 px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Autocomplete
            disabled={genre !== null}
            disablePortal
            size="small"
            id="combo-box-demo"
            options={movies_2023.map((movie) => movie.title)}
            onChange={(event, value) => setTitle(value || null)}
            fullWidth
            sx={{
              background: "#fff",
              borderRadius: "10px",
              opacity: genre && "50%",
            }}
            renderInput={(params) => <TextField {...params} label="Titles" />}
          />
          <Autocomplete
            disabled={title !== null}
            disablePortal
            size="small"
            id="combo-box-demo"
            options={Array.from(
              new Set(movies_2023.flatMap((movie) => movie.genres.split(", ")))
            )}
            onChange={(event, value) => setGenre(value || null)}
            fullWidth
            sx={{
              background: "#fff",
              borderRadius: "10px",
              opacity: title && "50%",
            }}
            renderInput={(params) => <TextField {...params} label="Genres" />}
          />
        </div>
        {loading ? (
          <div className="text-center my-12">
            <PulseLoader color="#0f172a" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 rounded-[10px] p-4">
              {moviesToDisplay.map((movie) => (
                <Link
                  to={movie.path}
                  key={movie.id}
                  className="bg-slate-900 rounded-[10px] flex flex-col gap-4 text-white text-md font-bold relative cursor-pointer p-1"
                >
                  <figure className="w-full overflow-hidden">
                    <img
                      className="rounded-[10px] hover:scale-125 w-full h-full sm:h-[360px] 2xl:h-[480px] transition-all ease-in-out duration-300"
                      src={movie.cover}
                      alt={movie.title}
                    />
                  </figure>
                  <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 w-full rounded-b-[10px] py-1 text-[12px] xl:text-[16px] text-center">
                    <p>{movie.title}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="w-full px-4 py-3 bg-white flex justify-center sm:justify-end items-center">
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={(event, newPage) => setCurrentPage(newPage)}
                variant="outlined"
                shape="rounded"
                size="small"
              />
            </div>
          </>
        )}
      </Card>
    </>
  );
}

export default Movies;
