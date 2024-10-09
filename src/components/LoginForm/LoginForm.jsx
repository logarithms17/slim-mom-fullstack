import React, { useState } from 'react';
import css from './LoginForm.module.css';

export const LoginForm = () => {
  // State to manage form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

  // For API call or other login logic
  if (email && password) {
    alert('Login Successful');
  } else {
    alert('Please enter email and password');
  }

  alert('Login successfully!')
};

  return (
    <div className={css.backgroundContainer}>
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <label htmlFor="password">Password*</label>
          </div>
        </form>

        <div className={css.buttonContainer}>
          <button className={css.button} type="submit">Log in</button>
          <button className={css.button} type="button" onClick={() => alert('Redirect to Login page')}>Register</button>
        </div>
      </div>
    </div>
    
  )
}