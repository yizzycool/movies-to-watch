import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import configReducer from './config-slice';
import userReducer from './user-slice';
import toastReducer from './toast-slice';
import { tmdbApi } from './apis/tmdb';
import { firebaseApi } from './apis/firebase';

const reducers = combineReducers({
  config: configReducer,
  user: userReducer,
  toast: toastReducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
  [firebaseApi.reducerPath]: firebaseApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;
