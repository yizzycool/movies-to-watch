import { configureStore } from '@reduxjs/toolkit';
import configReducer from './config/config-slice';
import { tmdbApi } from './apis/tmdb';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    config: configReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tmdbApi.middleware);
  },
  devTools: true,
});

setupListeners(store.dispatch);
