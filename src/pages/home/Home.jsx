import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { movies_2023 } from "../../data/movies_2023";
import { series_2023 } from "../../data/series_2023";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Footer from "../../layouts/Footer";

function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {loading ? (
        <div className="bg-[url('/images/main_background.png')] bg-cover w-full h-[calc(100vh-60px)] flex justify-center items-center">
          <PulseLoader color="#DB0000" size={30} />
        </div>
      ) : (
        <>
          <div className="w-full h-full relative">
            <ReactPlayer
              url="/videos/movies/oppenheimer.mp4"
              width={"100%"}
              height={"100%"}
              playing={true}
              muted
              loop
            />
            <figure className="absolute top-0 left-0 w-[100px] sm:w-[150px] md:w-[200px] lg:w-[250px] xl:w-[300px]">
              <img className="" src="/images/new.png" alt="" />
            </figure>
          </div>
          <div
            style={{ textShadow: "1px 5px 10px #000" }}
            className="2xl:-mt-80 xl:-mt-60 lg:-mt-40 px-4 xl:px-12 pb-12 text-white text-4xl font-bold flex flex-col gap-4 xl:gap-12 w-full"
          >
            <div className="flex flex-col gap-4">
              <p className="text-sm md:text-xl lg:text-2xl xl:text-4xl z-50">
                Movies
              </p>
              <Swiper
                breakpoints={{
                  1550: {
                    slidesPerView: 6,
                    slidesPerGroup: 6,
                    spaceBetween: 30,
                  },
                  1280: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                  },
                  980: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                  },
                  768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 20,
                  },
                  360: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                  },
                }}
                slidesPerView={1}
                slidesPerGroup={1}
                spaceBetween={10}
                loop={true}
                navigation={true}
                modules={[Navigation]}
              >
                {movies_2023.map((movie) => (
                  <SwiperSlide key={movie.id} className="relative">
                    <Link to={movie.path} className="w-full h-full">
                      <img src={movie.cover} alt="" />
                      <div className="bg-black bg-opacity-70 absolute bottom-0 left-0 w-full text-center text-sm p-2">
                        <p>{movie.title}</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm md:text-xl lg:text-2xl xl:text-4xl">
                Series
              </p>
              <Swiper
                breakpoints={{
                  1550: {
                    slidesPerView: 6,
                    slidesPerGroup: 6,
                    spaceBetween: 30,
                  },
                  1280: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                  },
                  980: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                  },
                  768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 20,
                  },
                  360: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                  },
                }}
                slidesPerView={1}
                slidesPerGroup={1}
                spaceBetween={10}
                loop={true}
                navigation={true}
                modules={[Navigation]}
              >
                {series_2023.map((serie) => (
                  <SwiperSlide key={serie.id} className="relative">
                    <Link to={serie.path} className="w-full h-full">
                      <img src={serie.cover} alt="" />
                      <div className="bg-black bg-opacity-70 absolute bottom-0 left-0 w-full text-center text-sm p-2">
                        <p>{serie.title}</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
