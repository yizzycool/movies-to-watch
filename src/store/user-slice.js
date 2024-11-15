import { createSlice } from '@reduxjs/toolkit';
import _defaultsDeep from 'lodash/defaultsDeep';

const initialState = {
  isSignInUser: false,
  uid: null,
  email: null,
  displayName: null,
  accessToken: null,
  photoUrl: null,
  watchlist: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser: (_state) => {
      return initialState;
    },
    updateUser: (state, action) => {
      return _defaultsDeep(action.payload, state);
    },
    updateWatchlist: (state, action) => {
      const { watchlist = [] } = action.payload;
      state.watchlist = watchlist;
    },
  },
});

export const { initUser, updateUser, updateWatchlist } = userSlice.actions;

export default userSlice.reducer;
