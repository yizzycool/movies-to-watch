import { createSlice } from '@reduxjs/toolkit';
import _xor from 'lodash/xor';
import _slice from 'lodash/slice';

const MAX_HISTORY_RECORDS = 10;

const initialState = {
  [-1]: [],
};

export const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    udpateSearchHistory: (state, action) => {
      const { uid = -1, query = '' } = action.payload || {};
      if (!query) return;
      state[uid] = _slice(_xor([query], state[uid]), 0, MAX_HISTORY_RECORDS);
    },
  },
});

export const { udpateSearchHistory } = searchHistorySlice.actions;

export default searchHistorySlice.reducer;
