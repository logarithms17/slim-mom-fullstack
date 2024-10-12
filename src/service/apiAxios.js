import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

const setAuthToken = token => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const res = await instance.post(`/api/users/signup`, {
      name,
      email,
      password,
    });
    toast.success('Registration successful');
    return res;
  } catch (e) {
    if (e.response.status === 409) {
      toast.error(`This email already exists`);
    } else {
      toast.error('Registration error');
    }
  }
};

export const login = async ({ email, password }) => {
  try {
    const res = await instance.post(`/api/users/login`, { email, password });

    console.log('Login API Response:', res);

    if (res.data.code === 200) {
      toast.success(`Welcome, ${res.data.data.user.name}`);

      setAuthToken(res.data.token);
    }

    return res;
  } catch (error) {
    toast.error('Authorization error');
    console.error('Login API Error:', error);
  }
};

export const logout = async () => {
  try {
    const res = await instance.get(`/api/users/logout`);
    return res;
  } catch (error) {
    toast.error('Oops, something went wrong');
    console.error(error.message);
  }
};

export const current = async () => {
  try {
    const res = await instance.get(`/api/users/current`);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductsByQuery = async query => {
  try {
    const { data } = await instance.get(`/api/products/search?query=${query}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const adviceForNoAuthUser = async payload => {
  try {
    const { data } = await instance.post(
      '/api/users/nutrition-advice',
      payload
    );
    return data;
  } catch (error) {
    toast.error('Oops, something went wrong');
    console.log(error.message);
  }
};

export const adviceForLoginUser = async payload => {
  try {
    const { data } = await instance.post(
      '/api/users/logged-nutrition-advice',
      payload
    );
    return data;
  } catch (error) {
    toast.error('Oops, something went wrong');
    console.log(error.message);
  }
};

export const getProductsByDate = async ({ date }) => {
  try {
    const { data } = await instance.get(`/api/dietaries?date=${date}`);
    return data;
  } catch (error) {
    if (error.response.status === 404) {
      return { data: 'Diet for this date has not been created yet' };
    } else {
      console.error('Error in getProductsByDate:', error.message);
      throw error;
    }
  }
};

// export const createProductsListByDate = async ({ date }) => {
//   try {
//     return await instance.post('/api/dietaries', { date });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const createProductsListByDate = async ({ date }) => {
  try {
    console.log('Request to createProductsListByDate:', { date });
    const response = await instance.post('/api/dietaries', { date });
    console.log('Response from createProductsListByDate:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in createProductsListByDate:', error);
    throw error;
  }
};
export const addProductByDate = async ({ date, data }) => {
  try {
    return await instance.patch('/api/dietaries', { date, data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductByDate = async ({ productId, date }) => {
  try {
    return await instance.delete(
      `/api/dietaries/?productId=${productId}&date=${date}`
    );
  } catch (error) {
    console.log(error);
  }
};
