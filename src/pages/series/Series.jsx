import { Autocomplete, Card, TextField } from "@mui/material";
import { series_2023 } from "../../data/series_2023";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

function Series() {
  const [title, setTitle] = useState(null);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(false);

  const filterdSeries = series_2023.filter((serie) => {
    const matchesTitle = title ? serie.title === title : true;
    const matchesGenre = genre ? serie.genres.includes(genre) : true;
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
          <p>Series</p>
        </div>
        <div className="pt-4 px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Autocomplete
            disabled={genre}
            disablePortal
            size="small"
            id="combo-box-demo"
            options={series_2023.map((serie) => serie.title)}
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
              new Set(series_2023.flatMap((serie) => serie.genres.split(", ")))
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
            {filterdSeries.map((serie) => (
              <Link
                to={serie.path}
                key={serie.id}
                className="bg-slate-900 rounded-[10px] flex flex-col gap-4 text-white text-md font-bold relative cursor-pointer p-1"
              >
                <figure>
                  <img
                    className="rounded-[10px] w-full h-[360px] 2xl:h-[400px]"
                    src={serie.cover}
                    alt={serie.title}
                  />
                </figure>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 w-full rounded-b-[10px] py-2 text-[12px] xl:text-[16px] text-center">
                  <p>{serie.title}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}

export default Series;
