import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProductsByDate,
  createProductsListByDate,
  addProductByDate,
  deleteProductByDate,
} from '../../service/apiAxios';

const actionGetProducts = createAsyncThunk(
  'diaryPerDay/getProducts',
  async (payload, thunkAPI) => {
    try {
      const response = await getProductsByDate(payload);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const actionCreateProductsList = createAsyncThunk(
  'diaryPerDay/createProductsList',
  async (payload, thunkAPI) => {
    try {
      const response = await createProductsListByDate(payload);
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const actionAddProduct = createAsyncThunk(
  'diaryPerDay/addProduct',
  async (payload, thunkAPI) => {
    try {
      const response = await addProductByDate(payload);
      return response.data.data.result.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const actionDeleteProduct = createAsyncThunk(
  'diaryPerDay/deleteProduct',
  async (payload, thunkAPI) => {
    try {
      const response = await deleteProductByDate(payload);
      return response.data.data.result.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const diaryPerDayOperation = {
  actionGetProducts,
  actionCreateProductsList,
  actionAddProduct,
  actionDeleteProduct,
};
