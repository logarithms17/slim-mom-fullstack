import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export const Summary = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios
        .get('/api/users/getUserData')
        .then(response => {
          const userData = response.data;
          const dailyConsumed = Array.isArray(userData.dailyConsumedProducts)
            ? userData.dailyConsumedProducts.reduce(
                (total, product) => total + product.quantity,
                0
              )
            : 0;

          setUserData({
            ...userData,
            dailyRate: userData?.usersInfo?.recommendedCalories || 0,
            dailyConsumed,
          });
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setError('Failed to fetch user data. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  const consumedProductsCount = userData?.dailyConsumedProducts?.length || 0;

  const formattedDate = `${String(new Date().getDate()).padStart(
    2,
    '0'
  )}.${String(new Date().getMonth() + 1).padStart(
    2,
    '0'
  )}.${new Date().getFullYear()}`;

  const padToThreeDigits = num => String(num).padStart(3, '0');

  const leftKcal = padToThreeDigits(
    (userData?.dailyRate || 0) - (userData?.dailyConsumed || 0)
  );
  const consumedKcal = padToThreeDigits(consumedProductsCount);
  const dailyRateKcal = padToThreeDigits(userData?.dailyRate || 0);
  const percentageNormal = padToThreeDigits(
    ((userData?.dailyConsumed / userData?.dailyRate) * 100 || 0).toFixed(0)
  );

  return (
    <div className="summary">
      <h2>Summary for {formattedDate}</h2>
      <p>Left {leftKcal} kcal</p>
      <p>Consumed {consumedKcal} kcal</p>
      <p>Daily rate {dailyRateKcal} kcal</p>
      <p>% of normal {percentageNormal} %</p>
      <p>User Height: {userData?.usersInfo?.height} cm</p>{' '}
      {/* Display user height */}
      <h3>Food not recommended</h3>
      <ul>
        {userData?.foodsNotRecommended?.map((food, index) => (
          <li key={index}>{food}</li>
        )) || <li>Your diet will be display here</li>}
      </ul>
    </div>
  );
};
