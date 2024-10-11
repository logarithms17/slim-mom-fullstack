import React from 'react';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import css from './RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <div className={css.backgroundContainer}>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
