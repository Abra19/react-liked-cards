import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice.js';

export default configureStore({
  reducer: {
    cardData: dataReducer,
  },
});
