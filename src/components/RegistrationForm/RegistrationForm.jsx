import React, { useState } from 'react';
import css from './RegistrationForm.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export const RegistrationForm = () => {
  // State to manage form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Validate the form fields
    if (!name || !email || !password) {
      alert('Please fill out all fields');
      return;
    }

    setIsLoading(true); // Show loading state
    setError(null); // clear previous errors

    try {
      // Make the API call to register the user
      const response = await axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      console.log(response.data);

      // Successful response
      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem('token', token);

        alert('Registration Successful!');
        // Redirect to login page
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }

    // Clear form after successful submission
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <div className={css.formTitle}>
        <h4>REGISTER</h4>

        <form onSubmit={handleSubmit}>
          <div className={css.inputBox}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder=" "
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <label htmlFor="name">Name*</label>
          </div>
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
              {isLoading ? 'Registering...' : 'Register'}
            </button>

            <button
              className={css.button}
              type="button"
              onClick={() => navigate('/login')}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

