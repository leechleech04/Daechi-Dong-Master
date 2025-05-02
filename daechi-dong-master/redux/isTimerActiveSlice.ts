import { createSlice } from '@reduxjs/toolkit';

export const isTimerActiveSlice = createSlice({
  name: 'isTimerActive',
  initialState: false,
  reducers: {
    toggleTimerActive: (state) => !state,
  },
});

export const { toggleTimerActive } = isTimerActiveSlice.actions;
