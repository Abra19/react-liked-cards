/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: {
    isShown: false,
    targetId: '',
  },
};

const modalSlice = createSlice({
  name: 'modalOnRemove',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.modal.isShown = true;
      state.modal.targetId = payload;
    },
    closeModal: (state) => {
      state.modal.isShown = false;
      state.modal.targetId = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
