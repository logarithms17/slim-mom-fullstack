import React from 'react';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import css from './DiaryPage.module.css';
import DiaryProductsList from 'components/DiaryProductsList/DiaryProductList';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

const DiaryPage = () => {
  return (
    <Provider store={store}>
      <div className={css.backgroundContainer}>
        <DiaryAddProductForm />
        <DiaryProductsList />
      </div>
    </Provider>
  );
};

export default DiaryPage;
