import React, { useState } from 'react';
import styles from './DiaryAddProductForm.module.css';
import axios from 'axios';
import AddButtonIcon from '../images/AddButton.png';

axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export const DiaryAddProductForm = () => {
  // State to manage form inputs
  const [productName, setProductName] = useState('');
  const [grams, setGrams] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Validate the form fields
    if (!productName || !grams) {
      alert('Please fill out all fields');
      return;
    }

    setIsLoading(true); // Show loading state
    setError(null); // Clear previous errors

    try {
      const token = localStorage.getItem('token');
      // Make the API call to save the product
      if (!token) {
        console.log('Token not found');
        setError('Authorization token is missing. Please log in.');
        setIsLoading(false);
        return;
      }
      console.log('Token:', token); // Check if the token is retrieved correctly

      const response = await axios.post(
        '/api/products/addConsumedProduct',
        {
          productName,
          grams,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      // Successful response
      if (response.status === 201) {
        alert('Product added successfully!');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }

    // Clear form after successful submission
    setProductName('');
    setGrams('');
  };

  return (
    <main className={styles.AddProductFormContainer}>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <div className={styles.productNameContainer}>
          <input
            type="text"
            name="productName"
            className={styles.productNameInput}
            id="productName"
            placeholder="Enter product name"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            required
          />
        </div>
        <div className={styles.gramsContainer}>
          <input
            type="number"
            name="grams"
            id="grams"
            className={styles.gramsInput}
            placeholder="Grams"
            value={grams}
            onChange={e => setGrams(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          className={styles.submitButton}
          type="submit"
          disabled={isLoading}
        >
          <img
            className={styles.submitButtonImg}
            loading="lazy"
            src={AddButtonIcon}
            alt="Submit"
          />
          {isLoading ? 'Saving...' : 'Add'}
        </button>
        <button
          className={styles.AddMobileButton}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Add'}
        </button>
      </form>
    </main>
  );
};

export default DiaryAddProductForm;
