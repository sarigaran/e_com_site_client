import { configureStore } from '@reduxjs/toolkit';
import productSliceReducer from '../slice/index';

export const store = configureStore({
  reducer: {
    productSlice: productSliceReducer,
  },
});
