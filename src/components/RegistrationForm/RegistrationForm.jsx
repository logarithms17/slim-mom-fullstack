import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Replaced useHistory with useNavigate
import { registerUser } from '../../redux/Auth/authActions.js';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate replaces useHistory

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form field validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters long';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(registerUser(formData))
      .then(() => {
        navigate('/login'); // Redirect to login after successful registration
      })
      .catch(error => {
        console.error('Registration error:', error);
      });
  };

  // Navigate to LoginPage on clicking "Log in"
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.registrationWrapper}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <img src="/static/logo.png" alt="SlimMom" />
        </div>
        <div className={styles.formHeading}>
          <span className={styles.link} onClick={handleLoginClick}>
            LOG IN
          </span>{' '}
          | <span className={styles.active}>REGISTRATION</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Register</h2>
          <label>
            Name *
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`${styles.input} ${errors.name && styles.inputError}`}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </label>
          <label>
            Email *
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`${styles.input} ${errors.email && styles.inputError}`}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </label>
          <label>
            Password *
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`${styles.input} ${
                errors.password && styles.inputError
              }`}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </label>
          <button className={styles.buttonPrimary} type="submit">
            Register
          </button>
          <button
            className={styles.buttonSecondary}
            type="button"
            onClick={handleLoginClick}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
