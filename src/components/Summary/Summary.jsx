import React from 'react';
import style from './Summary.module.css';

const Summary = () => {
  // Dummy data, replace with real data from Redux or API
  const summaryData = {
    date: '13.08.2023',
    left: '000 kcal',
    consumed: '000 kcal',
    dailyRate: '000 kcal',
    normalPercentage: '000%',
    foodNotRecommended: 'Your diet will be displayed here',
  };

  return (
    <div className={style.summaryContainer}>
      {/* Summary Section */}
      <div className={style.summarySection}>
        <h2>Summary for {summaryData.date}</h2>
        <ul>
          <li>Left: {summaryData.left}</li>
          <li>Consumed: {summaryData.consumed}</li>
          <li>Daily rate: {summaryData.dailyRate}</li>
          <li>% of normal: {summaryData.normalPercentage}</li>
        </ul>
      </div>

      {/* Food Not Recommended Section */}
      <div className={style.foodSection}>
        <h2>Food not recommended</h2>
        <ul>
          <li>{summaryData.foodNotRecommended}</li>
        </ul>
      </div>
    </div>
  );
};

export default Summary;
