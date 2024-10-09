import React from 'react';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={css.backgroundContainer}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
