import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import { OutlineButton } from "../../UI/Buttons";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import MovieCard from "../MovieCard/MovieCard";
import { Result } from "../../types/interfaces/Movie";


type Props = {
  title: string;
  data: Result[];
  type: "movie" | "tv"
};

SwiperCore.use([Navigation])

const FilmSwiper = ({ type ,title, data }: Props) => {
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center w-full mb-5">
        <h3 className="sm:text-2xl text-lg font-bold">{title}</h3>
        <OutlineButton children="View more" />
      </div>

      <Swiper draggable={true} slidesPerView={"auto"} spaceBetween={7}>
        {data
          ? data.map((m) => (
              <SwiperSlide className="w-fit" key={m.id + "movie"}>
                <MovieCard type={type} 
                  id={m.id}
                  imgUrl={
                    "https://image.tmdb.org/t/p/original" + m.poster_path
                  }
                  title={m.title ? m.title : m.name!}
                />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default FilmSwiper;
