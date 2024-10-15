import React, { useState } from 'react';
import css from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export const LoginForm = () => {
  // State to manage form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });
      console.log(response.data);

      // Extract the token from the response
      const { token } = response.data;

      if (token) {
        console.log('Token received:', token);
        localStorage.setItem('token', token);

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        alert('Login successful!');
        navigate('/calculator'); //Redirect to the calculator page
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Login failed. Please check your credentials and try again.');
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

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className={css.buttonContainer}>
            <button className={css.button} type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log in'}
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
      </div>
    </div>
  );
};
