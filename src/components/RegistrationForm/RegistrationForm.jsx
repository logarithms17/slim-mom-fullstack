import React, { useState } from 'react';
import css from './RegistrationForm.module.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export const RegistrationForm = () => {
  // State to manage form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isRegistrationPage = location.pathname === '/register';

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Validate the form fields
    if (!name || !email || !password) {
      toast.error('Please fill out all fields');
      return;
    }

    setIsLoading(true); // Show loading state

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
        toast.success('Registration Successful!');
        // Redirect to login page
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className={css.backgroundContainer}>
    <div className={css.backgroundContainer}>
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

          <div className={css.buttonContainer}>
            <button 
              className={`${css.button} ${isRegistrationPage ? css.active : ''}`} 
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
              ) : 'Register'}
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

        {/* Toast Container to show notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};
