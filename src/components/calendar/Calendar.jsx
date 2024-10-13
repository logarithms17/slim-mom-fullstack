import React from 'react';
import css from './calendar.module.css';

const Calendar = ({ selectedDate, onDateChange }) => {
  const handleChange = event => {
    const newDate = new Date(event.target.value);
    console.log('Date input value:', event.target.value); // Log input value
    onDateChange(newDate);
  };

  return (
    <input
      type="date"
      value={selectedDate.toISOString().substring(0, 10)}
      onChange={handleChange}
      className={css.dateInputField}
    />
  );
};

export default Calendar;
