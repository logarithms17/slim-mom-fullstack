import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ReactComponent as CalendarIcon } from '../../assets/images/calendar 1.svg';
import DatePicker from 'react-datepicker';
import css from './calendar.module.css';

const Calendar = ({ selectedDate, onDateChange }) => {
  const handleChange = event => {
    const newDate = new Date(event.target.value);
    console.log('Date input value:', event.target.value); // Log input value
    onDateChange(newDate);
  };

  const handleDateChange = date => {
    setStartDate(date);
    setIsOpen(false);
  };

  console.log(startDate);

  const formatDate = date => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formattedDate = formatDate(startDate);

  return (
    <div className={css.appContainer}>
      <p className={css.selectedDate}>{formattedDate}</p>
      <div className={css.datePickerContainer}>
        <CalendarIcon
          width="30"
          height="30"
          className={css.calendarButton}
          onClick={handleCalendarClick}
        />
        {isOpen && (
          <div className={css.datePickerWrapper}>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              inline
              onClickOutside={() => setIsOpen(false)}
              className={css.datePicker}
            />
          </div>
        )}
      </div>
    </div>
  );
}
