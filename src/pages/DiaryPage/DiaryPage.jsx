import React, { useState, useEffect } from 'react';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import css from './DiaryPage.module.css';
import DiaryProductsList from 'components/DiaryProductsList/DiaryProductList';
import Calendar from 'components/calendar/Calendar';

const DiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [productsList, setProductsList] = useState([]);

  // Fetch products when the selectedDate changes
  const fetchProducts = async date => {
    const token = localStorage.getItem('token');
    const formattedDate = date.toISOString().substring(0, 10);
    console.log('Fetching products for date:', formattedDate);

    if (!token) {
      console.error('No auth token found');
      return;
    }

    try {
      const response = await fetch(
        `https://slim-mom-fullstack.onrender.com/api/products/getConsumedProduct/${formattedDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch products, status: ${response.status}, message: ${errorData.message}`
        );
      }

      const data = await response.json();
      console.log('Fetched products:', data.dailyConsumedProducts);
      setProductsList(data.dailyConsumedProducts || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch products whenever the date changes
  useEffect(() => {
    console.log('Selected date changed:', selectedDate);
    fetchProducts(selectedDate);
  }, [selectedDate]);

  // Handle adding a product by updating the state
  const handleAddProduct = newProduct => {
    console.log('Adding new product to the list:', newProduct);
    setProductsList(prevProducts => [newProduct, ...prevProducts]);
  };

  const handleDateChange = date => {
    console.log('Date changed to:', date);
    setSelectedDate(date);
  };

  return (
    <div className={css.pageContainer}>
      <div className={css.leftSideContainer}>
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
        <DiaryAddProductForm
          selectedDate={selectedDate}
          onAddProduct={handleAddProduct}
        />
        <DiaryProductsList productsList={productsList} />
      </div>
      <div className={css.rightSideContainer}>Summary</div>
    </div>
  );
};

export default DiaryPage;
