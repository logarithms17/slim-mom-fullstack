import React from 'react';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

const LoginPage = ({ onLogin }) => {
  return (
    <div className={css.backgroundContainer}>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
