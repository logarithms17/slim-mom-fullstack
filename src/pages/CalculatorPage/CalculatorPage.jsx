import React from 'react';
import { DailyCaloriesForm } from '../../components/DailyCaloriesForm/DailyCaloriesForm';
import { Summary } from '../../components/Summary/Summary';
import style from './CalculatorPage.module.css';

const CalculatorPage = () => {
  //CURRENT DATE
  const currentDate = new Date();
  return (
    <div className={style.container}>
      <div className={style.dailyCaloriesSection}>
        <DailyCaloriesForm isLoggedIn={true} />
      </div>
      <div className={style.summarySection}>
        <Summary selectedDate={currentDate} />
      </div>
    </div>
  );
};

export default CalculatorPage;
