import { Autocomplete, Card, TextField } from "@mui/material";
import { series_2023 } from "../../data/series_2023";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

function SeriesDetail() {
  const location = useLocation();
  const series = series_2023.filter(
    (serie) => serie.path === location.pathname
  );
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const getEpisode = series.map((serie) =>
    serie.episodes.filter((ep) => ep.title === selectedEpisode)
  );
  const getVideo = getEpisode[0].map((ep) => ep.video);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedEpisode !== null) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedEpisode]);

  return (
    <>
      <Card
        sx={{
          background: "#334155",
          borderRadius: "10px",
          boxShadow: "1px 1px 5px #000",
        }}
      >
        {series.map((serie) => (
          <div key={serie.id}>
            <div className="bg-[#0f172a] px-4 py-2 text-white text-sm xl:text-xl text-center font-bold">
              <p>{serie.title}</p>
            </div>
            <div className="flex flex-col xl:flex-row justify-between gap-4 p-4">
              <div className="bg-slate-900 w-full h-[360px] mn:h-[480px] md:h-[600px] xl:h-[720px] xl:w-8/12 p-2 rounded-[10px] relative">
                {loading ? (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <PulseLoader color="#475569" />
                  </div>
                ) : selectedEpisode === null ? (
                  <ReactPlayer
                    url={serie.video}
                    width={"100%"}
                    height={"100%"}
                    light={serie.cover}
                    playing
                    volume={.25}
                    controls
                  />
                ) : (
                  <iframe className="block relative" src={getVideo} frameborder="0" width="100%" height="100%" allow="autoplay" allowFullScreen />
                )}
              </div>
              <div className="flex flex-col gap-4 w-full xl:w-4/12 text-white text-sm md:text-md xl:text-xl font-bold">
                <div className="bg-slate-900 p-4 rounded-[10px] flex flex-col gap-4">
                  <p>Episodes</p>
                  <Autocomplete
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={serie.episodes.map((ep) => ep.title)}
                    fullWidth
                    onChange={(event, value) =>
                      setSelectedEpisode(value || null)
                    }
                    sx={{ borderRadius: "10px", background: "white" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select episodes" />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-4 bg-slate-900 p-4 rounded-[10px]">
                  <p>{serie.description}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-[10px] flex gap-2">
                  <p className="flex-none">Genres :</p>
                  <p className="text-blue-600">{serie.genres}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-[10px] flex gap-2">
                  <p className="flex-none">Director :</p>
                  <p className="text-blue-600">{serie.director}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-[10px] flex gap-2">
                  <p className="flex-none">Writers :</p>
                  <p className="text-blue-600">{serie.writers}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-[10px] flex gap-2">
                  <p className="flex-none">Stars :</p>
                  <p className="text-blue-600">{serie.stars}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}

export default SeriesDetail;
