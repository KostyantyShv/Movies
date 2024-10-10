import { Season } from "../../types/interfaces/TvDetail";
import { Episode } from "../../types/interfaces/SeasonsDetail";
import { FilledButton } from "../../UI/Buttons";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import EpisodesSwiper from "../EpisodesSwiper/EpisodesSwiper";
import MovieDefaltImage from "../../assets/images/default-movie.png";
import { useLazyGetSeasonsDetailQuery } from "../../redux/api/tv.api";

type Props = {
  id: number;
  data: Season;
};

const SeasonsCard = ({ id, data }: Props) => {
  const [getEpisodes, setGetEpisodes] = useState(false);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [getEpisodesData, episodesDataResult] = useLazyGetSeasonsDetailQuery();
  const [imgSrc, setImgSrc] = useState<string>(
    "https://image.tmdb.org/t/p/original" + data.poster_path
  );
  
  useEffect(() => {
    setEpisodes(episodesDataResult.data?.episodes!);
  }, [episodesDataResult]);

  const handleGetEpisodes = async () => {
    setGetEpisodes((prev) => !prev);

    try {
      const response = await getEpisodesData({
        series_id: id,
        season_number: data.season_number,
      });

      const { data: episodesResponse } = response;

      if (response.data) {
        setEpisodes(episodesResponse?.episodes!);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start items-center gap-5 w-full">
      <img
        className="w-[250px] h-[400px]"
        src={imgSrc}
        onError={() => setImgSrc(MovieDefaltImage)}
      />
      <div className="flex flex-col md:items-start items-center md:text-left text-center">
        <h4 className="text-2xl font-bold mb-5">{data.name}</h4>
        <p className="">{data.overview}</p>
        <h4 className="mt-8 text-xl italic font-semibold">
          Episodes count:{" "}
          <span className="text-yellow-300 font-bold">
            {data.episode_count}
          </span>
        </h4>

        {data.episode_count !== 0 && (
          <FilledButton
            callback={handleGetEpisodes}
            buttonClass="mt-4 rounded-lg mb-6"
            children={getEpisodes ? "Hide episodes" : "Get episodes"}
          />
        )}

        {getEpisodes ? (
          <div>
            {episodes && episodes.length > 0 ? (
              <EpisodesSwiper data={episodes} />
            ) : (
              <Loader />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SeasonsCard;
