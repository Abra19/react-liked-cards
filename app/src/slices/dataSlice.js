/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import fetchData from './fetchData.js';

const cardAdapter = createEntityAdapter();

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
    likedCard: (state, action) => (
      {
        ...state,
        data: state.data
          .map((card) => (card.id === action.payload ? { ...card, liked: !card.liked } : card)),
      }),
    showLiked: (state) => {
      state.unliked = [...state.data.filter((card) => !card.liked)];
      state.data = [...state.data.filter((card) => card.liked)];
      state.show = true;
    },
    showAll: (state) => ({ ...state, data: [...state.data, ...state.unliked] }),
    deleteCard: cardAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.errMessage = action.payload.err;
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
