import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, description, image, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ id, name, price, description, image, quantity });
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        if (quantity > 0) {
          existingItem.quantity = quantity;
        } else {
          state.cart = state.cart.filter((item) => item.id !== id);
        }
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
