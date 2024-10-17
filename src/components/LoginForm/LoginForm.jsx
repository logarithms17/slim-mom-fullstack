import React, { useState } from 'react';
import css from './LoginForm.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export const LoginForm = ({ onLogin }) => {
  // State to manage form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });

      // Extract the token from the response
      console.log(response.data);

      // const { token } = response.data;
      const { token, name, dailyConsumedProducts } = response.data;

      if (token) {
        // console.log('Token received:', token);
        localStorage.setItem('token', token);

        localStorage.setItem('userName', name); // Store user name
        localStorage.setItem(
          'dailyConsumedProducts',
          JSON.stringify(dailyConsumedProducts)
        ); // Store other user data as needed

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        toast.success('Login successful!');
        onLogin();
        navigate('/calculator'); //Redirect to the calculator page
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          'Login failed. Please check your credentials and try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className={css.formTitle}>
        <h4>LOG IN</h4>

        <form onSubmit={handleSubmit}>
          <div className={css.inputBox}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder=" "
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email*</label>
          </div>
          <div className={css.inputBox}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=" "
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password*</label>
          </div>

          <div className={css.buttonContainer}>
            <button
              className={`${css.button} ${isLoginPage ? css.active : ''}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <RotatingLines
                  visible={true}
                  height="24"
                  width="24"
                  color="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              ) : (
                'Log in'
              )}
            </button>

            <button
              className={css.button}
              type="button"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};
