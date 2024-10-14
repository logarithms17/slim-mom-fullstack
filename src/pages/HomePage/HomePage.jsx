import React from 'react';
import css from './HomePage.module.css';
import { DailyCaloriesForm } from 'components/DailyCaloriesForm/DailyCaloriesForm';

const HomePage = () => {
  return (
    <div className={css.backgroundContainer}>
      <DailyCaloriesForm isLoggedIn={false} />
    </div>
  );
};

export default HomePage;
