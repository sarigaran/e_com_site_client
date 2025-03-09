import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProduct = createAsyncThunk('getProduct', async (value) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/category/${value}`);
    return response.data;
  } catch (err) {
    console.log('error', err);
  }
});

export const getSingleProduct = createAsyncThunk('getSingleProduct', async (value) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${value}`);
    return response.data;
  } catch (err) {
    console.log('error', err);
  }
});

export const getCategory = createAsyncThunk('gecategory', async () => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/categories`);
    return response.data;
  } catch (err) {
    console.log('error', err);
  }
});

const initialState = {
  error: null,
  loading: false,
  productdata: null,
  singleproductdata: null,
  categorydata: null,
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productdata = action.payload;
      })
      .addCase(getProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleproductdata = action.payload;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categorydata = action.payload;
      });
  },
});

export default productSlice.reducer;
