import React from 'react';
import PropTypes from 'prop-types';

// Sample data: Replace with props or state as necessary
const foodsNotRecommended = [
  'Flour products',
  'Milk',
  'Read meat',
  'Smoked meats',
];

const Summary = ({ selectedDate, consumedCalories, dailyRate }) => {
  // Calculate left calories and percentage of normal
  const leftCalories = dailyRate - consumedCalories;
  const percentageNormal = ((consumedCalories / dailyRate) * 100).toFixed(0);

  return (
    <div className="summary">
      <h2>Summary for {selectedDate}</h2>
      <p>Left: {leftCalories} kcal</p>
      <p>Consumed: {consumedCalories} kcal</p>
      <p>Daily rate: {dailyRate} kcal</p>
      <p>n% of normal: {percentageNormal} %</p>

      <h3>Food not recommended</h3>
      <ul>
        {foodsNotRecommended.map((food, index) => (
          <li key={index}>{food}</li>
        ))}
      </ul>
    </div>
  );
};

// Prop types for validation
Summary.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  consumedCalories: PropTypes.number.isRequired,
  dailyRate: PropTypes.number.isRequired,
};

export default Summary;
