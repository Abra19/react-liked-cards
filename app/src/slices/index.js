import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice.js';
import modalReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    cardData: dataReducer,
    modal: modalReducer,
  },
});
