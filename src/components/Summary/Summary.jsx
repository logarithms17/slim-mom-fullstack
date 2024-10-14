import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Summary.module.css';

axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export const Summary = () => {
  const [userData, setUserData] = useState(null);
  const [consumedProducts, setConsumedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const specificDate = '2024-10-14';

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios
        .get('/api/users/getUserData')
        .then(response => {
          const userData = response.data;
          setUserData(userData);

          return axios.get(`/api/products/getConsumedProduct/${specificDate}`);
        })
        .then(response => {
          const products = response.data.dailyConsumedProducts;
          setConsumedProducts(products || []);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError('Failed to fetch data. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [specificDate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  const totalCalories = consumedProducts.reduce((total, product) => {
    return total + (product.calories || 0);
  }, 0);

  return (
    <div className={style.summaryContainer}>
      <div classname={style.summarySection}>
        <h2>Summary for {specificDate}</h2>
        <p>
          Left{' '}
          {isNaN(userData?.user?.usersInfo?.recommendedCalories - totalCalories)
            ? '000'
            : String(
                Math.round(
                  userData?.user?.usersInfo?.recommendedCalories - totalCalories
                ) // Round off
              ).padStart(3, '0')}{' '}
          kcal
        </p>
        <p>
          Consumed{' '}
          {isNaN(totalCalories)
            ? '000'
            : String(Math.round(totalCalories)).padStart(3, '0')}{' '}
        </p>
        <p>
          Daily rate:{' '}
          {isNaN(userData?.user?.usersInfo?.recommendedCalories)
            ? '000'
            : String(
                Math.round(userData?.user?.usersInfo?.recommendedCalories || 0)
              ).padStart(3, '0')}{' '}
        </p>
        <p>
          {totalCalories > 0 &&
          userData?.user?.usersInfo?.recommendedCalories > 0
            ? String(
                Math.round(
                  (totalCalories /
                    userData.user.usersInfo.recommendedCalories) *
                    100
                )
              ).padStart(3, '0')
            : '000'}
          % of normal xxx %
        </p>
      </div>
      <div className={style.foodsNotRecommendedSection}>
        <h3>Food not recommended</h3>
        {userData?.user?.usersInfo?.foodsNotRecommended?.length > 0 ? (
          <ul>
            {userData.user.usersInfo.foodsNotRecommended.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        ) : (
          <li>Your diet will be displayed here</li>
        )}
      </div>
      <div classname={style.consumedProductsSection}>
        <h3>Consumed Products</h3>
        <ul>
          {consumedProducts.length > 0 ? (
            consumedProducts.map((product, index) => (
              <li key={index}>
                {product.product} -{' '}
                {String(Math.round(product.calories)).padStart(3, '0')} kcal
              </li>
            ))
          ) : (
            <li>No products consumed on this date.</li>
          )}
        </ul>
      </div>
    </div>
  );
};
