import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import configReducer from './config-slice';
import userReducer from './user-slice';
import toastReducer from './toast-slice';
import { tmdbApi } from './apis/tmdb';
import { firebaseApi } from './apis/firebase';

export const store = configureStore({
  reducer: {
    config: configReducer,
    user: userReducer,
    toast: toastReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(tmdbApi.middleware)
      .concat(firebaseApi.middleware);
  },
  devTools: true,
});

setupListeners(store.dispatch);
