import React, { useState } from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
  // State to capture form inputs
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    currentWeight: '',
    desiredWeight: '',
    bloodType: '',
  });

  // Handle form changes
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
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>Calculate Your Daily Calorie Intake Right Now</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* First column */}
        <div className={styles.formColumn}>
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
        </div>

        {/* Second column */}
        <div className={styles.formColumn}>
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
            <label>Blood Type</label>
            <div className={styles.radioGroup}>
              {['A', 'B', 'AB', 'O'].map((type) => (
                <label key={type} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="bloodType"
                    value={type}
                    checked={formData.bloodType === type}
                    onChange={handleChange}
                    required
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>Start Losing Weight</button>
      </form>
    </div>
  );
};

export default HomePage;
