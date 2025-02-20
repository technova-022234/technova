import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  story: true,
  level1: true,
  level2: true,
  level3: false,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    completeLevel: (state, action) => {
      if (action.payload === 'story') {
        state.level1 = true;
      } else if (action.payload === 'level1') {
        state.level2 = true;
      } else if (action.payload === 'level2') {
        state.level3 = true;
      }
    },
  },
});

export const { completeLevel } = progressSlice.actions;
export default progressSlice.reducer;
