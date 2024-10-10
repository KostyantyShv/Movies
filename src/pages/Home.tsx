import HomeSwipper from "../components/HomeSwipper/HomeSwipper";
import FilmSwiper from "../components/FilmSwiper/FilmSwiper";

import { useGetTopRatedMovieQuery } from "../redux/api/movie.api";
import { useGetUpComingMovieQuery } from "../redux/api/movie.api";
import { useGetTopRatedTVQuery } from "../redux/api/tv.api";
import { useGetPopularTVQuery } from "../redux/api/tv.api";

import { useEffect } from "react";
import Footer from "../components/Footer/Footer";


const Home = () => {
  const { data: topRatedMoviesData } = useGetTopRatedMovieQuery({ page: 1 });
  const { data: upComingMovieData } = useGetUpComingMovieQuery({ page: 1 });
  const { data: topRatedTVData } = useGetTopRatedTVQuery({ page: 1 });
  const { data: popularTVData } = useGetPopularTVQuery({ page: 1 });


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="pb-40 relative w-full">
      <HomeSwipper />
      <div className="w-[85%] m-auto my-[15px] flex flex-col gap-10">
        <FilmSwiper type="movie" data={topRatedMoviesData?.results!} title="Top Rated Movie" />
        <FilmSwiper type="movie" data={upComingMovieData?.results!} title="Coming Soon" />
        <FilmSwiper type="tv" data={topRatedTVData?.results!} title="Top Rated TV Series" />
        <FilmSwiper type="tv" data={popularTVData?.results!} title="Popular TV Series" />
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
