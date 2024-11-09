import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  colorMode: 'dark',
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setColorMode: (state, action) => {
      state.colorMode = action.payload;
    },
  },
});

export const { setColorMode } = configSlice.actions;

export default configSlice.reducer;
