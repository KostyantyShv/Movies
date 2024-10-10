import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import EpisodeCard from "../EpisodeCard/EpisodeCard";
import { Episode } from "../../types/interfaces/SeasonsDetail";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type Props = {
  data: Episode[];
};

SwiperCore.use([Navigation]);

const EpisodesSwiper = ({ data }: Props) => {
  return (
    <div className="mt-10">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={"auto"}
        className="w-[70vw]"
        navigation
      >
        {data
          ? data.map((e) => (
              <SwiperSlide className="w-fit" key={e.id + "movie"}>
                <EpisodeCard name={e.name} imgUrl={e.still_path} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default EpisodesSwiper;
