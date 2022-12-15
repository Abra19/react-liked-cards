/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import fetchData from './fetchData.js';

const channelsAdapter = createEntityAdapter();

const initialState = {
  data: [],
  errMessage: null,
};

const dataSlice = createSlice({
  name: 'cardData',
  initialState,
  reducers: {
    deleteCard: channelsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.errMessage = action.payload.err;
      });
  },
});

export const { deleteCard } = dataSlice.actions;
export default dataSlice.reducer;
