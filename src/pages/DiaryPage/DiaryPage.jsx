import React from 'react';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import css from './DiaryPage.module.css';
import DiaryProductsList from 'components/DiaryProductsList/DiaryProductList';
import Calendar from 'components/calendar/Calendar';

const DiaryPage = () => {
  return (
    <div className={css.backgroundContainer}>
      <Calendar />
      <DiaryAddProductForm />
      <DiaryProductsList />
    </div>
  );
};

export default DiaryPage;
