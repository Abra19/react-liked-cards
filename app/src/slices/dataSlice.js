/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import fetchData from './fetchData.js';

const initialState = {
  data: [],
  unliked: [],
  liked: [],
  errMessage: null,
  show: false,
};

const dataSlice = createSlice({
  name: 'cardData',
  initialState,
  reducers: {
    likedCard: (state, { payload }) => (
      {
        ...state,
        data: state.data
          .map((card) => (card.id === payload ? { ...card, liked: !card.liked } : card)),
      }),
    showLiked: (state) => {
      state.unliked = [...state.data.filter((card) => !card.liked)];
      state.data = [...state.data.filter((card) => card.liked)];
      state.show = true;
    },
    showAll: (state) => ({ ...state, data: [...state.data, ...state.unliked] }),
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
