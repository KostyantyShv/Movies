import { useEffect, useState } from "react";
import { useDiscoverMovieQuery } from "../redux/api/movie.api";
import { useLazyDiscoverMovieQuery } from "../redux/api/movie.api";
import { Movie as MovieInterface } from "../types/interfaces/Movie";
import MovieCard from "../components/MovieCard/MovieCard";

const Movie = () => {
  
  type GenresList = {
    id: number,
    name: string
  }
  
  const movieGenresList: Array<GenresList> = [
    {
      id: 10759,
      name: "Action & Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 10762,
      name: "Kids",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  
  const [genreID, setGenreID] = useState<string>(movieGenresList[2].name);
  const [movies, setMovies] = useState<MovieInterface>();


  const {data: movieData, isLoading, isError} = useDiscoverMovieQuery({with_genres: "Western"});

  useEffect(() => {
      if(!isError && !isLoading) {
          console.log(movieData);
          setMovies(movieData);
      }
  }, [movieData])

  return (
    <div className="mt-20 w-[90%] m-auto">
      <div className="flex w-full">
        <select className="bg-transparent border-2 border-main-color w-[300px] py-3 px-2" name="genres" id="movie-genres">
          {movieGenresList.map(g => (
            <option key={g.id + "genre"} className="text-main-color bg-body-bg border-none" value={g.name}>{g.name}</option>
          ))}
        </select>
      </div>

      <div className="grid col-4">
          {movies?.results.map(m => (
            <MovieCard id={m.id} imgUrl={"https://image.tmdb.org/t/p/original" + m.backdrop_path} title={m.title} type="movie" key={m.id}/>
          ))}
      </div>

    </div>
  );
};

export default Movie;
