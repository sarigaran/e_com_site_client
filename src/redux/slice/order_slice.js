import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orderslice',
  initialState: {
    orders: [],
  },
  reducers: {
    placeOrder: (state, action) => {
      const { cart, totalPrice } = action.payload;
      const newOrder = {
        id: `ORD-${Date.now()}`,
        items: cart,
        total: totalPrice,
        date: new Date().toLocaleString(),
      };

      state.orders.push(newOrder);
    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
