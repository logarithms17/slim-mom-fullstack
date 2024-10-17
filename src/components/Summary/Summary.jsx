import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './summary.module.css';
import { RotatingLines } from 'react-loader-spinner';

axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export const Summary = ({ selectedDate }) => {
  const [userData, setUserData] = useState(null);
  const [consumedProducts, setConsumedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //DATE WILL BE CURRENT DATE
  const date = selectedDate.toISOString().slice(0, 10);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios
        .get('/api/users/getUserData')
        .then(response => {
          const userData = response.data;
          setUserData(userData);

          return axios.get(`/api/products/getConsumedProduct/${date}`);
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
  }, [date]);

  if (loading) {
    return (
      <RotatingLines
        visible={true}
        height="24"
        width="24"
        color="white"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    );
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  // Utility function to capitalize the first letter
  const capitalizeFirstLetter = string =>
    string ? string.charAt(0).toUpperCase() + string.slice(1) : '';

  const totalCalories = consumedProducts.reduce((total, product) => {
    return total + (product.calories || 0);
  }, 0);

  return (
    <div className={style.summaryContainer}>
      <div className={style.summarySection}>
        <h2 className={style.summaryContainerHeader}>Summary for {date}</h2>
        <p>
          Left{' '}
          {isNaN(userData?.user?.usersInfo?.recommendedCalories - totalCalories)
            ? '000'
            : String(
                Math.round(
                  userData?.user?.usersInfo?.recommendedCalories - totalCalories
                )
              ).padStart(3, '0')}{' '}
          kcal
        </p>
        <p>
          Consumed{' '}
          {isNaN(totalCalories)
            ? '000'
            : String(Math.round(totalCalories)).padStart(3, '0')}{' '}
          kcal
        </p>
        <p>
          Daily rate{' '}
          {isNaN(userData?.user?.usersInfo?.recommendedCalories)
            ? '000'
            : String(
                Math.round(userData?.user?.usersInfo?.recommendedCalories || 0)
              ).padStart(3, '0')}{' '}
          kcal
        </p>
        <p>
          % of normal{' '}
          {totalCalories > 0 &&
          userData?.user?.usersInfo?.recommendedCalories > 0
            ? String(
                Math.round(
                  (totalCalories /
                    userData.user.usersInfo.recommendedCalories) *
                    100
                )
              ).padStart(3, '0')
            : '000'}{' '}
          kcal
        </p>
      </div>
      <div className={style.foodsNotRecommendedSection}>
        <h3 className={style.summaryContainerHeader}>Food not recommended</h3>
        {userData?.user?.usersInfo?.foodsNotRecommended?.length > 0 ? (
          <ul>
            {userData.user.usersInfo.foodsNotRecommended.map((food, index) => (
              <li key={index}>{capitalizeFirstLetter(food)}</li>
            ))}
          </ul>
        ) : (
          <li>Your diet will be displayed here</li>
        )}
      </div>
    </div>
  );
};
