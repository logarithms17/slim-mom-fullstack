import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import DailyCaloriesForm from '../components/DailyCaloriesForm/DailyCaloriesForm';
import Summary from '../components/Summary/Summary';
import style from './CalculatorPage.module.css';

const CalculatorPage = () => {
  // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  // if (!isLoggedIn) {
  //   return <Navigate to="/login" />;
  // }

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
