import { createSlice } from '@reduxjs/toolkit';
import _isNull from 'lodash/isNull';

// position: {
//   x: ['left', 'center', 'right' ],
//   y: ['top' , 'middle', 'bottom'],
// }

const initialState = {
  show: false,
  title: '',
  content: '',
  position: {
    x: 'right',
    y: 'bottom',
  },
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setShowToast: (state, action) => {
      const { show, title, content, position = null } = action.payload || {};
      state.show = show || initialState.show;
      state.title = title || initialState.title;
      state.content = content || initialState.content;
      // Optional. Keep same if position is not given
      if (!_isNull(position)) {
        state.position = position;
      }
    },
  },
});

export const { setShowToast } = toastSlice.actions;

export default toastSlice.reducer;
