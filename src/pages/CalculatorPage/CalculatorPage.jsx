import React from 'react';
import { DailyCaloriesForm } from '../../components/DailyCaloriesForm/DailyCaloriesForm';
import { Summary } from '../../components/Summary/Summary';
import style from './CalculatorPage.module.css';

const CalculatorPage = () => {
  return (
    <div className={style.container}>
      <div className={style.dailyCaloriesSection}>
        <DailyCaloriesForm />
      </div>
      <div className={style.summarySection}>
        <Summary />
      </div>
    </div>
  );
};

export default CalculatorPage;
