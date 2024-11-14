import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignInUser: false,
  uid: null,
  email: null,
  displayName: null,
  accessToken: null,
  photoUrl: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser: (_state) => {
      return initialState;
    },
    updateUser: (_state, action) => {
      return action.payload;
    },
  },
});

export const { initUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
