import { createSlice } from '@reduxjs/toolkit';
import { diaryPerDayOperation } from './diaryPerDay-operation';

const currentDate = new Date().toLocaleDateString();

const initialState = {
  isLoading: false,
  isAddProductLoading: false,
  isDeleteProductLoading: false,
  isSuccess: false,
  isError: false,
  date: currentDate,
  products: null,
  message: '',
};

export const diaryPerDaySlice = createSlice({
  name: 'diaryPerDay',
  initialState,
  reducers: {
    updateDate: (state, action) => {
      state.date = action.payload;
      state.products = null;
      state.message = null;
    },
  },
  extraReducers: builder => {
    // get products
    builder
      .addCase(diaryPerDayOperation.actionGetProducts.pending, state => {
        state.isLoading = true;
        state.message = '';
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(
        diaryPerDayOperation.actionGetProducts.fulfilled,
        (state, action) => {
          console.log('Fulfilled action payload:', action.payload);
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;

          if (typeof action.payload === 'string') {
            state.message = action.payload;
          } else {
            state.products = [...action.payload.result.products];
          }
        }
      )
      .addCase(diaryPerDayOperation.actionGetProducts.rejected, state => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });

    // create list products
    builder
      .addCase(diaryPerDayOperation.actionCreateProductsList.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        diaryPerDayOperation.actionCreateProductsList.fulfilled,
        state => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.products = [];
        }
      )
      .addCase(
        diaryPerDayOperation.actionCreateProductsList.rejected,
        state => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
        }
      );

    // update products list
    builder
      .addCase(diaryPerDayOperation.actionAddProduct.pending, state => {
        state.isLoading = true;
        state.isAddProductLoading = true;
      })
      .addCase(
        diaryPerDayOperation.actionAddProduct.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isAddProductLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.products = action.payload;
        }
      )
      .addCase(diaryPerDayOperation.actionAddProduct.rejected, state => {
        state.isLoading = false;
        state.isAddProductLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });

    // delete product from list
    builder
      .addCase(diaryPerDayOperation.actionDeleteProduct.pending, state => {
        state.isLoading = true;
        state.isDeleteProductLoading = true;
      })
      .addCase(
        diaryPerDayOperation.actionDeleteProduct.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isDeleteProductLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.products = action.payload;
        }
      )
      .addCase(diaryPerDayOperation.actionDeleteProduct.rejected, state => {
        state.isLoading = false;
        state.isDeleteProductLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const { updateDate } = diaryPerDaySlice.actions;

export const diaryReducer = diaryPerDaySlice.reducer;
