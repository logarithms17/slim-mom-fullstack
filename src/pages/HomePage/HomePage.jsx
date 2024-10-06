import React, { useState } from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
  // States to capture form inputs
  const [formData, setFormData] = useState({
    age: '',
    desiredWeight: '',
    height: '',
    currentWeight: '',
    bloodType: '',
  });

  // Handle form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add functionality for starting weight loss
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculate your daily calorie intake right now</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="desiredWeight">Desired Weight (kg)</label>
          <input
            type="number"
            id="desiredWeight"
            name="desiredWeight"
            value={formData.desiredWeight}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="height">Height (cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="currentWeight">Current Weight (kg)</label>
          <input
            type="number"
            id="currentWeight"
            name="currentWeight"
            value={formData.currentWeight}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="bloodType">Blood Type</label>
          <select
            id="bloodType"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            required
          >
            <option value="">Select your blood type</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>Start Losing Weight</button>
      </form>
    </div>
  );
};

export default HomePage;
