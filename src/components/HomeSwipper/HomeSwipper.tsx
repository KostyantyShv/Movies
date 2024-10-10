import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useGetPopularMovieQuery } from "../../redux/api/movie.api";
import { Movie } from "../../types/interfaces/Movie";
import HomeSwipperSlide from "../HomeSwipperSlide/HomeSwipperSlide";

import WatchTrailer from "../WatchTrailer/WatchTrailer";

const HomeSwipper = () => {
  const { data, isSuccess } = useGetPopularMovieQuery({ page: 1 });
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [popularMovie, setPopularMovie] = useState<Movie | undefined>();
  const [trailerId, setTrailerId] = useState("");
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const openTrailer = (id: string) => {
    setTrailerId(id);
    setIsTrailerOpen(true);
  };


  useEffect(() => {
    if (isSuccess) {
      setPopularMovie(data);
    }
  }, [data]);


  SwiperCore.use([Autoplay]);


  const handleSlideChange = (swiper: SwiperCore) => {
    if (!isTrailerOpen) {
      setActiveSlideIndex(swiper.activeIndex);
    }
  };

  return (
   <div>
     <Swiper
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      className="xl:h-screen sm:h-[50vh] h-[40vh] md:h-[80vh] z-10"
      autoplay={{ delay: 5000 }}
      onSlideChange={handleSlideChange}
    >
      {popularMovie?.results.slice(0, 8).map((m) => (
        <SwiperSlide className="h-full" key={m.id + "popular"}>
          <HomeSwipperSlide
            key={m.id + "popular" + activeSlideIndex}
            id={m.id}
            imgBackground={"https://image.tmdb.org/t/p/original" + m.backdrop_path}
            imgPoster={"https://image.tmdb.org/t/p/original" + m.poster_path}
            description={m.overview}
            title={m.title}
            openTrailer={openTrailer}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    {isTrailerOpen && <WatchTrailer setIsTrailerOpen={setIsTrailerOpen} id={trailerId} isTrailerOpen={isTrailerOpen} />}
   </div>
  );
};

export default HomeSwipper;