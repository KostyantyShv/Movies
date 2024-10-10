import { useParams } from "react-router-dom";
import {
  useGetMovieDetailQuery,
  useGetMovieCreditsQuery,
  useGetMovieTrailerQuery,
  useGetMovieSimilarQuery,
} from "../redux/api/movie.api";

import DataNotFound from "../components/DataNotFound/DataNotFound";
import PageLoading from "../components/PageLoading/PageLoading";
import PeopleCard from "../components/PeopleCard/PeopleCard";
import FilmSwiper from "../components/FilmSwiper/FilmSwiper";

import { OutlineButton } from "../UI/Buttons";

import ReactPlayer from "react-player";
import { useEffect } from "react";

const DetailMovie = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetMovieDetailQuery(id!);
  const {
    data: movieCredits,
    isError: isMovieCreditsError,
    isLoading: isMovieCreditsLoading,
  } = useGetMovieCreditsQuery(id!);

  const {
    data: movieTrailer,
    isError: isMovieTrailerError,
    isLoading: isMovieTrailerLoading,
  } = useGetMovieTrailerQuery(id!);

  const {
    data: movieSimilar,
    isError: isMovieSimilarError,
    isLoading: isMovieSimilarLoading,
  } = useGetMovieSimilarQuery(id!);

  const moviesDetails = [
    { name: "Studio's name:", value: data?.production_companies[0].name },
    {
      name: "Studio's country:",
      value: data?.production_companies[0].origin_country,
    },
    { name: "Duration:", value: data?.runtime + " minutes" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div>
      <div className="relative min-h-screen">
        {isLoading ||
        isMovieCreditsLoading ||
        isMovieTrailerLoading ||
        isMovieSimilarLoading ? (
          <PageLoading />
        ) : (
          <div>
            {!isError ||
            !isMovieCreditsError ||
            !isMovieTrailerError ||
            !isMovieSimilarError ? (
              // image
              <div className="h-[60vh] w-full">
                <img
                  className="object-cover w-full h-full brightness-[15%] absolute top-0 left-0"
                  src={
                    "https://image.tmdb.org/t/p/original" + data?.backdrop_path
                  }
                  alt={data?.title}
                />

                {/* Content */}
                <div className="flex flex-col relative z-30 sm:translate-y-[10vh]  md:translate-y-[20vh] pb-11">
                  {/* Main details */}
                  <div className="flex-col md:text-left text-center items-center md:flex-row flex px-3 justify-center gap-10">
                    <img
                      className="md:w-[350px] md:h-[550px] sm:w-[500px] sm:h-[700px] rounded-2xl"
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        data?.poster_path
                      }
                      alt=""
                    />
                    <div className="flex flex-col md:w-1/2 w-[95%]">
                      <h2 className="sm:text-5xl text-4xl font-bold">
                        {data?.title}
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
                          <OutlineButton
                            key={index + g.name}
                            children={g.name}
                          />
                        ))}
                      </div>

                      {moviesDetails.map((el, index) => (
                        <div
                          key={"movie info" + index}
                          className="sm:text-lg text-sm font-bold mt-8 flex justify-between border-gray-600 border-b-2 pb-2 mb-1"
                        >
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
                        {movieCredits?.cast.slice(0, 8).map((c) => (
                          <PeopleCard
                            key={c.id + "cast"}
                            imgUrl={
                              "https://image.tmdb.org/t/p/original" +
                              c.profile_path
                            }
                            name={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Trailers */}
                    <div className="w-[95%] h-[500px] mt-20">
                      <ReactPlayer
                        light = {false}
                        controls={true}
                        playing={false}
                        width={"100%"}
                        height={"100%"}
                        url={`https://www.youtube.com/watch?v=${
                          movieTrailer?.results[
                            Math.floor(
                              Math.random() * movieTrailer.results.length
                            )
                          ].key
                        }`}
                      />
                    </div>

                    {/* Similar Video */}
                    <div className="w-[95%] mt-20">
                      <FilmSwiper
                        title="Similar Movie"
                        type="movie"
                        data={movieSimilar?.results!}
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
    </div>
  );
};

export default DetailMovie;
