import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MovieDetail } from "../../types/interfaces/MovieDetail";
import { Credits } from "../../types/interfaces/Credits";
import { MovieVideo } from "../../types/interfaces/MovieVideo";
import { Movie } from "../../types/interfaces/Movie";
import { Genres } from "../../types/interfaces/Genres";

const baseUrl = "https://api.themoviedb.org/3";

const movieApi = createApi({
  reducerPath: "movie/api",

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.append("accept", "application/json");
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjE1MDRiNzQ3YzAxNGVhODMyY2M1OWFiNjg1Y2YzYSIsInN1YiI6IjY1NDQwODI4MWFjMjkyMDEzYjYxNjdiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gxN8mzL0XAQgIbwC3dnGblpnw1eBlVPKiJCJnYGJFVA"
      );
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getMovie: builder.query({
      query: (params: {query: string}) => ({
        url: "search/movie",
        params,
      }),
    }),
    
    discoverMovie: builder.query({
      query: (params) => ({
        url: `discover/movie`,
        params
      }),
    }),

    getPopularMovie: builder.query({
      query: (params: { page: number | undefined }) => ({
        url: "movie/popular",
        params,
      }),
    }),

    getTopRatedMovie: builder.query({
      query: (params: { page?: number | undefined }) => ({
        url: "movie/top_rated",
        params,
      }),
    }),

    getUpComingMovie: builder.query({
      query: (params: { page?: number | undefined }) => ({
        url: "movie/upcoming",
        params,
      }),
    }),

    getMovieDetail: builder.query<MovieDetail, string>({
      query: (id: string) => ({
        url: `movie/${id}`,
        params: {id},
      }),
    }),

    getMovieCredits: builder.query<Credits, string>({
      query: (id: string) => ({
        url: `movie/${id}/credits`,
        params: {id},
      }),
    }),

    getMovieTrailer: builder.query<MovieVideo, string>({
      query: (id: string) => ({
        url: `movie/${id}/videos`,
        params: {id}
      })
    }),

    getMovieSimilar: builder.query<Movie, string>({
      query: (id: string) => ({
        url: `movie/${id}/similar`,
        params: {id}
      })
    }),

    getMovieGenres: builder.query<Genres, null>({
      query: () => ({
        url: `genre/movie/list`,
      })
    }),
  })
});

export const {
  useGetMovieQuery,
  useDiscoverMovieQuery,
  useLazyDiscoverMovieQuery,
  useLazyGetMovieQuery,
  useGetPopularMovieQuery,
  useGetTopRatedMovieQuery,
  useGetUpComingMovieQuery,
  useGetMovieDetailQuery,
  useGetMovieCreditsQuery,
  useGetMovieTrailerQuery,
  useGetMovieSimilarQuery,
  useGetMovieGenresQuery
} = movieApi;
export default movieApi;
