/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import fetchData from './fetchData.js';

const initialState = {
  data: [],
  errMessage: null,
  isLoaded: false,
  filter: 'all',
};

const dataSlice = createSlice({
  name: 'cardData',
  initialState,
  reducers: {
    likedCard: (state, { payload }) => (
      {
        ...state,
        data: state.data
          .map((card) => (card.id === payload ? { ...card, isLiked: !card.isLiked } : card)),
      }),
    showLiked: (state) => {
      state.filter = 'liked';
      state.isLoaded = true;
    },
    showAll: (state) => {
      state.filter = 'all';
      state.isLoaded = true;
    },
    deleteCard: (state, { payload }) => (
      {
        ...state,
        data: state.data.filter((card) => card.id !== payload),
      }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.data = payload.data;
        state.errMessage = payload.err;
      })
      .addCase(fetchData.rejected, (state, { payload }) => {
        state.errMessage = payload.err;
      });
  },
});

export const {
  likedCard,
  showLiked,
  showAll,
  deleteCard,
} = dataSlice.actions;
export default dataSlice.reducer;
