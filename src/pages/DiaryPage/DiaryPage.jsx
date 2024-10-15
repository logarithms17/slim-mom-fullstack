import React, { useState } from 'react';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import css from './DiaryPage.module.css';
import DiaryProductsList from 'components/DiaryProductsList/DiaryProductList';
import Calendar from 'components/calendar/Calendar';
import { Summary } from '../../components/Summary/Summary';

const DiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    console.log('Date selected:', date); // Log selected date
    setSelectedDate(date);
  };

  return (
    <div className={css.backgroundContainer}>
      <div className={css.leftSideContainer}>
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
        {/* Pass selectedDate as a prop to DiaryAddProductForm */}
        <DiaryAddProductForm selectedDate={selectedDate} />
        <DiaryProductsList selectedDate={selectedDate} />
      </div>
      <div className={css.summarySection}>
        <Summary />
      </div>
    </div>
  );
};

export default DiaryPage;
