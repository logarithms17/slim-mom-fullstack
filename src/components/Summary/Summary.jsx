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
          setUserData(userData); // Set userData in the state
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

  // Accessing recommendedCalories inside user.usersInfo
  return (
    <div className="summary">
      <h2>Summary for {userData?.user?.name}</h2>
      <p>Left xxx kcal</p>
      <p>Consumed xx kcal</p>
      <p>Daily rate {userData?.user?.usersInfo?.recommendedCalories} kcal</p>
      <p>% of normal xxx %</p>
      <h3>Food not recommended</h3>
      <ul>
        {userData?.user?.usersInfo?.foodsNotRecommended.map((food, index) => (
          <li key={index}>{food}</li>
        ))}
      </ul>
    </div>
  );
};
