import { configureStore } from '@reduxjs/toolkit';
import productSliceReducer from '../slice/product_slice';
import cartSliceReducer from '../slice/cart_slice';
import ordersliceReducer from '../slice/order_slice';

export const store = configureStore({
  reducer: {
    productSlice: productSliceReducer,
    cartSlice: cartSliceReducer,
    orderslice: ordersliceReducer,
  },
});
