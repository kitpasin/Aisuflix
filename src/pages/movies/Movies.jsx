import { Autocomplete, Card, TextField } from "@mui/material";
import { movies_2023 } from "../../data/movies_2023";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

function Movies() {
  const [title, setTitle] = useState(null);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(false);

  const filterdMovies = movies_2023.filter((movie) => {
    const matchesTitle = title ? movie.title === title : true;
    const matchesGenre = genre ? movie.genres.includes(genre) : true;
    return matchesTitle && matchesGenre;
  });

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
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
        <div className="bg-[#0f172a] px-4 py-2 text-white text-xl text-center font-bold">
          <p>Movies</p>
        </div>
        <div className="pt-4 px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Autocomplete
            disabled={genre}
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
            disabled={title}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 rounded-[10px] p-4">
            {filterdMovies.map((movie) => (
              <Link
                to={movie.path}
                key={movie.id}
                className="bg-slate-900 rounded-[10px] flex flex-col gap-4 text-white text-md font-bold relative cursor-pointer p-1"
              >
                <figure>
                  <img
                    className="rounded-[10px] w-full h-[360px] 2xl:h-[400px]"
                    src={movie.cover}
                    alt={movie.title}
                  />
                </figure>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 w-full rounded-b-[10px] py-2 text-xl text-center">
                  <p>{movie.title}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}

export default Movies;
