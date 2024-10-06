import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // If using React Router v6
import styles from './LoginPage.module.css'; // Importing CSS module

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Navigation function from React Router v6

  // Handling the login form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you would normally handle login (e.g., call an API)
    console.log('Logging in with:', email, password);
    // Example logic after login, e.g., navigate to dashboard
  };

  // Navigate to the registration page
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button} type="submit">
              Login
            </button>
            <button
              className={`${styles.button} ${styles.secondaryButton}`}
              type="button"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
