import { useParams } from "react-router-dom";
import { useGetTVDetailQuery, useGetTVSimilarQuery } from "../redux/api/tv.api"
import { useGetTVCreditsQuery } from "../redux/api/tv.api";
import { useEffect } from "react";
import { OutlineButton } from "../UI/Buttons";

import SeasonsCard from "../components/SeasonsCard/SeasonsCard";
import PeopleCard from "../components/PeopleCard/PeopleCard";
import DataNotFound from "../components/DataNotFound/DataNotFound";
import PageLoading from "../components/PageLoading/PageLoading";
import FilmSwiper from "../components/FilmSwiper/FilmSwiper";

const DetailTvSeries = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetTVDetailQuery(id!);
  const { data: tvCredits, isError: isTvCreditsError, isLoading: isTvCreditsLoading } = useGetTVCreditsQuery(id!);
  const { data: tvSimilar, isError: isTvSimilarError, isLoading: isTvSimilarLoading } = useGetTVSimilarQuery(id!);

  const tvDetails = [
    { name: "Studio's name:", value: data?.production_companies[0].name },
    {
      name: "Studio's country:",
      value: data?.production_companies[0].origin_country,
    },
    { name: "Amount of season:", value: data?.number_of_seasons},
    { name: "Amount of series", value: data?.number_of_episodes},
  ];


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id])

  return (
    <div className="relative min-h-screen">
      {isLoading || isTvCreditsLoading || isTvSimilarLoading ? (
        <PageLoading />
      ) : (
        <div>
          {!isError || !isTvCreditsError || !isTvSimilarError  ? (
            // image
            <div className="h-[60vh] w-full absolute">
              <img
                className="object-cover w-full h-full brightness-[15%] absolute top-0 left-0"
                src={
                  "https://image.tmdb.org/t/p/original" + data?.backdrop_path
                }
                alt={data?.name}
              />

              {/* Content */}
              <div className="flex flex-col relative z-30 sm:translate-y-[10vh]  md:translate-y-[20vh] pb-11">
                {/* Main details */}
                <div className="flex-col md:text-left text-center items-center md:flex-row flex px-3 justify-center gap-10">
                  <img
                    className="md:w-[350px] md:h-[550px] sm:w-[500px] sm:h-[700px] rounded-2xl"
                    src={
                      "https://image.tmdb.org/t/p/original" + data?.poster_path
                    }
                    alt=""
                  />
                  <div className="flex flex-col md:w-1/2 w-[95%]">
                    <h2 className="sm:text-5xl text-4xl font-bold">
                      {data?.name}
                    </h2>
                    <p className="mt-5 leading-6">{data?.overview}</p>

                    {data?.vote_count !== 0 ? (
                      <div className="flex justify-between items-center mt-7">
                        <h4 className="italic text-sm sm:text-lg text-yellow-300 font-semibold">
                          {data?.vote_count} users voted for this movie
                        </h4>
                        <span className="sm:text-2xl text-lg font-bold">
                          {data?.vote_average.toFixed(1)} ⭐
                        </span>
                      </div>
                    ) : (
                      <h4 className="mt-7 text-lg text-yellow-300 font-bold">
                        There are no ratings here
                      </h4>
                    )}

                    <div className="flex mt-10 gap-3 flex-wrap">
                      {data?.genres.map((g, index) => (
                        <OutlineButton key={index + g.name} children={g.name} />
                      ))}
                    </div>

                    {tvDetails.map((el, index) => (
                      <div key={"information" + index} className="sm:text-lg text-sm font-bold mt-8 flex justify-between border-gray-600 border-b-2 pb-2 mb-1">
                        <h4 className="">{el.name}</h4>
                        <h5 className="text-yellow-300">
                          {el.value ? el.value : "Unknown"}
                        </h5>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other information */}
                <div className="w-[95%] m-auto mt-16 flex flex-col items-center">
                  {/* Cast */}
                  <div className="flex flex-col items-center">
                    <div className="flex gap-2 flex-wrap justify-center items-center">
                      {tvCredits?.cast.slice(0, 8).map((c, index) => (
                        <PeopleCard
                          key={"tvcast" + index}
                          imgUrl={
                            "https://image.tmdb.org/t/p/original" +
                            c.profile_path
                          }
                          name={c.name}
                        />
                      ))}
                    </div>
                  </div>

              
                  {/* Seasons */}
                  <div className="w-[95%] mt-20 flex flex-col gap-20">
                     {data?.seasons.map((s) => (
                      <SeasonsCard key={"seasons" + s.id} id={data.id} data={s}/>
                     ))}
                  </div>

                   {/* Similar Video */}
                   <div className="w-[95%] mt-20">
                    <FilmSwiper
                      title="Similar TV Series"
                      type="tv"
                      data={tvSimilar?.results!}
                    />
                  </div>

                </div>
              </div>
            </div>
          ) : (
            <DataNotFound />
          )}
        </div>
      )}
    </div>
  );
};



export default DetailTvSeries