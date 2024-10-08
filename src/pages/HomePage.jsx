import React from 'react';
import styles from '../components/PageStyles/HomePageStyle.css';
import { DailyCaloriesForm } from 'components/DailyCaloriesForm/DailyCaloriesForm';

const HomePage = () => {
  return (
    <div>
      <DailyCaloriesForm />
    </div>
  );
};

export default HomePage;
