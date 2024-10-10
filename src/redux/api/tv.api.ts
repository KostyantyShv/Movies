import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TvDetail } from "../../types/interfaces/TvDetail";
import { Credits } from "../../types/interfaces/Credits";
import { Movie } from "../../types/interfaces/Movie";
import { SeasonsDetail } from "../../types/interfaces/SeasonsDetail";

const baseUrl = "https://api.themoviedb.org/3";

const tvSeriesApi = createApi({
  reducerPath: "tv/api",

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.append("accept", "application/json");
      headers.append(
        "Authorization",
        import.meta.env.VITE_API_HEADER
      );
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTopRatedTV: builder.query<Movie, {}>({
      query: (params: { page?: number | undefined }) => ({
        url: "tv/top_rated",
        params,
      }),
    }),

    getPopularTV: builder.query<Movie, {}>({
      query: (params: { page?: number | undefined }) => ({
        url: "tv/popular",
        params,
      }),
    }),

    getTVDetail: builder.query<TvDetail, string>({
      query: (id: string) => ({
        url: `tv/${id}`,
        params: { id },
      }),
    }),

    getTVCredits: builder.query<Credits, string>({
      query: (id: string) => ({
        url: `tv/${id}/credits`,
        params: { id },
      }),
    }),

    getTVSimilar: builder.query<any, string>({
      query: (id: string) => ({
        url: `tv/${id}/similar`,
        params: { id },
      }),
    }),

    getSeasonsDetail: builder.query<SeasonsDetail, {series_id: number; season_number: number}>({
      query: (params: { series_id: number; season_number: number }) => ({
        url: `tv/${params.series_id}/season/${params.season_number}`,
        params,
      }),
    }),
  }),
});

export const {
  useGetTopRatedTVQuery,
  useGetPopularTVQuery,
  useGetTVDetailQuery,
  useGetTVCreditsQuery,
  useGetTVSimilarQuery,
  useLazyGetSeasonsDetailQuery
} = tvSeriesApi;
export default tvSeriesApi;
