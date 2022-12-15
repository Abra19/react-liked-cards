/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import fetchData from './fetchData.js';

const channelsAdapter = createEntityAdapter();

const initialState = {
  cards: [],
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
        state.cards = action.payload;
      });
  },
});

export const { deleteCard } = dataSlice.actions;
export default dataSlice.reducer;