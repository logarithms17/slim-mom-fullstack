import { combineReducers } from '@reduxjs/toolkit';
// import { loaderSlice } from './loader/loaderSlice';
// import { authSlice } from './auth/auth-slice';
import { diaryReducer } from './diaryPerDay/diaryPerDay-slice';

export const rootReducer = combineReducers({
  // loader: loaderSlice.reducer,
  // auth: authSlice.reducer,
  diary: diaryReducer,
});
