import axios from 'axios';

export const registerUser = userData => async dispatch => {
  try {
    const response = await axios.post('/api/register', userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
  }
};
