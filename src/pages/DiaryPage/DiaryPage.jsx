import React, { useState } from 'react';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import css from './DiaryPage.module.css';
import DiaryProductsList from 'components/DiaryProductsList/DiaryProductList';
import Calendar from 'components/calendar/Calendar';
import MobileDiaryBtn from '../../components/MobileDiaryBtn/MobileDiaryBtn';
import { useMediaQuery } from 'react-responsive';
import { Summary } from 'components/Summary/Summary';

const DiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFormVisible, setIsFormVisible] = useState(false); // State variable for form visibility

  const isMobile = useMediaQuery({ query: '(max-width: 703px)' }); // Media query for mobile devices

  const handleDateChange = date => {
    console.log('Date selected:', date); // Log selected date
    setSelectedDate(date);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(prev => !prev); // Toggle the visibility
  };

  return (
    <div className={css.pageContainer}>
      <div className={css.leftSideContainer}>
        {isMobile &&
          !isFormVisible && ( // Show Calendar and DiaryProductsList only on mobile
            <>
              <Calendar
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
              <DiaryProductsList selectedDate={selectedDate} />
            </>
          )}
        {isMobile &&
          isFormVisible && ( // Show DiaryAddProductForm if isFormVisible is true
            <DiaryAddProductForm selectedDate={selectedDate} />
          )}
        {isMobile &&
          !isFormVisible && ( // Show the button only when the form is not visible
            <MobileDiaryBtn toggleFormVisibility={toggleFormVisibility} />
          )}
        {!isMobile && ( // On larger screens, show all components
          <>
            <Calendar
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />
            <DiaryAddProductForm selectedDate={selectedDate} />
            <DiaryProductsList selectedDate={selectedDate} />
          </>
        )}
      </div>
      {/* Always show rightSideContainer on tablet and desktop, hide on mobile when form is visible */}
      <div
        className={css.rightSideContainer}
        style={{ display: isMobile && isFormVisible ? 'none' : 'block' }}
      >
        <div className={css.summarySection}>
          <Summary selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
