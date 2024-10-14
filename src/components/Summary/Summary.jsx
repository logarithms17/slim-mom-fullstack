import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Set the base URL for axios
axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export const Summary = () => {
  // State management
  const [userData, setUserData] = useState(null);
  const [consumedProducts, setConsumedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace this with the actual date you want to fetch products for
  const specificDate = '2024-10-14'; // Example date

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Set token in the Authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch user data
      axios
        .get('/api/users/getUserData')
        .then(response => {
          const userData = response.data;
          setUserData(userData); // Store user data in state

          // Fetch consumed products for the specific date
          return axios.get(`/api/products/getConsumedProduct/${specificDate}`);
        })
        .then(response => {
          const products = response.data.dailyConsumedProducts; // Adjust according to the actual response structure
          setConsumedProducts(products || []); // Store consumed products in state
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError('Failed to fetch data. Please try again.');
        })
        .finally(() => {
          setLoading(false); // Set loading to false once requests are complete
        });
    } else {
      setLoading(false); // Stop loading if no token is found
    }
  }, [specificDate]); // Add specificDate as a dependency if you want to change it dynamically

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>; // Show error state
  }

  // Calculate the sum of calories from consumed products
  const totalCalories = consumedProducts.reduce((total, product) => {
    return total + (product.calories || 0); // Fallback to 0 if calories are not available
  }, 0);

  // Render the summary once userData is available
  return (
    <div className="summary">
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
  );
};
