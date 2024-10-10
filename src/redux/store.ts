import { configureStore } from "@reduxjs/toolkit";
import movieApi from "./api/movie.api";
import tvSeriesApi from "./api/tv.api";

const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    [tvSeriesApi.reducerPath]: tvSeriesApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      movieApi.middleware,
      tvSeriesApi.middleware,
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
