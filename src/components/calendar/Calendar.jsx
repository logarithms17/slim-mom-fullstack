// import React, { useState } from 'react';
// import 'react-datepicker/dist/react-datepicker.css';
// import { ReactComponent as CalendarIcon } from '../../images/calendar 1.svg';
// import DatePicker from 'react-datepicker';
// import css from './calendar.module.css';

// export default function Calendar() {
//   const [startDate, setStartDate] = useState(new Date());
//   const [isOpen, setIsOpen] = useState(false);

//   const handleCalendarClick = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleDateChange = date => {
//     setStartDate(date);
//     setIsOpen(false);
//   };

//   const formatDate = date => {
//     if (!date) return '';
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}.${month}.${year}`;
//   };

//   const formattedDate = formatDate(startDate);

//   return (
//     <div className={css.appContainer}>
//       <p className={css.selectedDate}>{formattedDate}</p>
//       <div className={css.datePickerContainer}>
//         <CalendarIcon
//           width="30"
//           height="30"
//           className={css.calendarButton}
//           onClick={handleCalendarClick}
//         />
//         {isOpen && (
//           <div className={css.datePickerWrapper}>
//             <DatePicker
//               selected={startDate}
//               onChange={handleDateChange}
//               inline
//               onClickOutside={() => setIsOpen(false)}
//               className={css.datePicker}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React from 'react';

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
    />
  );
};

export default Calendar;
