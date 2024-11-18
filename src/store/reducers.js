import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import configReducer from './config-slice';
import userReducer from './user-slice';
import toastReducer from './toast-slice';
import modalReducer from './modal-slice';
import searchHistoryReducer from './search-history-slice';
import { tmdbApi } from './apis/tmdb';
import { firebaseApi } from './apis/firebase';
import { geminiApi } from './apis/gemini';

const reducers = combineReducers({
  config: configReducer,
  user: userReducer,
  toast: toastReducer,
  modal: modalReducer,
  searchHistory: searchHistoryReducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
  [firebaseApi.reducerPath]: firebaseApi.reducer,
  [geminiApi.reducerPath]: geminiApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'searchHistory'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;
