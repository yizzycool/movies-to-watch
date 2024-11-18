import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSignInModal: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setShowSignInModal: (state, action) => {
      state.showSignInModal = action.payload || false;
    },
  },
});

export const { setShowSignInModal } = modalSlice.actions;

export default modalSlice.reducer;
