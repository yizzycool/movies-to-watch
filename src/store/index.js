import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tmdbApi } from './apis/tmdb';
import { firebaseApi } from './apis/firebase';
import { geminiApi } from './apis/gemini';
import persistedReducer, { reducers } from './reducers';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(tmdbApi.middleware)
      .concat(firebaseApi.middleware)
      .concat(geminiApi.middleware);
  },
  devTools: true,
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

// For (Jest) testing purpose
export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(tmdbApi.middleware)
        .concat(firebaseApi.middleware)
        .concat(geminiApi.middleware);
    },
    ...preloadedState,
  });
};
