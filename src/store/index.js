import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import configReducer from './config-slice';
import toastReducer from './toast-slice';
import { tmdbApi } from './apis/tmdb';

export const store = configureStore({
  reducer: {
    config: configReducer,
    toast: toastReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tmdbApi.middleware);
  },
  devTools: true,
});

setupListeners(store.dispatch);
