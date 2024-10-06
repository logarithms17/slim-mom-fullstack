import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = userData => async dispatch => {
  try {
    const response = await axios.post('/api/register', userData);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.user = action.payload;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { registerSuccess, registerFailure } = authSlice.actions;
export default authSlice.reducer;
