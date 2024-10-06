import React from 'react';
import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Register</h1>
      <form className={styles.form}>
        <input 
          type="text" 
          placeholder="Username" 
          className={styles.input} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          className={styles.input} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className={styles.input} 
        />
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
