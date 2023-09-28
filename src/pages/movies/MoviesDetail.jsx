import { Card } from "@mui/material";
import { movies_2023 } from "../../data/movies_2023";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

function MovieDetail() {
  const location = useLocation();
  const movies = movies_2023.filter(
    (movie) => movie.path === location.pathname
  );
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-[75px] xl:h-[100px] bg-gradient-to-t from-transparent via-opacity-15 to-opacity-35 via-opacity-58 to-black" />
      <Card
        sx={{
          background: "#334155",
          borderRadius: "10px",
          boxShadow: "1px 1px 5px #000",
        }}
      >
        {movies.map((movie) => (
          <div key={movie.id}>
            <div className="bg-[#0f172a] px-4 py-2 text-white text-sm xl:text-xl text-center font-bold">
              <p>{movie.title}</p>
            </div>
            <div className="flex flex-col xl:flex-row justify-between gap-4 p-4">
              <div className="bg-slate-900 w-full h-[360px] mn:h-[480px] md:h-[600px] xl:h-[720px] xl:w-8/12 p-2 rounded-[10px]">
                <ReactPlayer
                  url={movie.video}
                  width={"100%"}
                  height={"100%"}
                  light={movie.cover}
                  playing
                  volume={.25}
                  controls
                />
              </div>
              <div className="flex flex-col gap-4 w-full xl:w-4/12 text-white text-sm md:text-md xl:text-xl font-bold">
                <div className="flex flex-col gap-4 bg-slate-900 p-4 rounded-[10px]">
                  <p>{movie.description}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-[10px] flex gap-2">
                  <p className="flex-none">Genres :</p>
                  <p className="text-blue-600">{movie.genres}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-[10px] flex gap-2">
                  <p className="flex-none">Director :</p>
                  <p className="text-blue-600">{movie.director}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-[10px] flex gap-2">
                  <p className="flex-none">Writers :</p>
                  <p className="text-blue-600">{movie.writers}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-[10px] flex gap-2">
                  <p className="flex-none">Stars :</p>
                  <p className="text-blue-600">{movie.stars}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}

export default MovieDetail;
