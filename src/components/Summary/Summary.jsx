import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export const Summary = () => {
  const [userData, setUserData] = useState(null);
  const [consumedProducts, setConsumedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //DATE WILL BE CURRENT DATE
  const date = new Date().toISOString().slice(0, 10);

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  const totalCalories = consumedProducts.reduce((total, product) => {
    return total + (product.calories || 0);
  }, 0);

  return (
    <div className="summary">
      <h2>Summary for {date}</h2>
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
        {totalCalories > 0 && userData?.user?.usersInfo?.recommendedCalories > 0
          ? String(
              Math.round(
                (totalCalories / userData.user.usersInfo.recommendedCalories) *
                  100
              )
            ).padStart(3, '0')
          : '000'}
        % of normal xxx %
      </p>
      <h3>Food not recommended</h3>
      <ul>
        {userData?.user?.usersInfo?.foodsNotRecommended.map((food, index) => (
          <li key={index}>{food}</li>
        ))}
      </ul>
    </div>
  );
};
