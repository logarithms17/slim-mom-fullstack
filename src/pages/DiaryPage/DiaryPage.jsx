// import React from 'react';
// import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
// import css from './DiaryPage.module.css';
// import DiaryProductsList from 'components/DiaryProductsList/DiaryProductList';
// import Calendar from 'components/calendar/Calendar';

// const DiaryPage = () => {
//   return (
//     <div className={css.backgroundContainer}>
//       <Calendar />
//       <DiaryAddProductForm />
//       <DiaryProductsList />
//     </div>
//   );
// };

// export default DiaryPage;

import React, { useState } from 'react';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import css from './DiaryPage.module.css';
import DiaryProductsList from 'components/DiaryProductsList/DiaryProductList';
import Calendar from 'components/calendar/Calendar';

const DiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    console.log('Date selected:', date); // Log selected date
    setSelectedDate(date);
  };

  return (
    <div className={css.backgroundContainer}>
      <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
      <DiaryAddProductForm />
      <DiaryProductsList selectedDate={selectedDate} />
    </div>
  );
};

export default DiaryPage;
