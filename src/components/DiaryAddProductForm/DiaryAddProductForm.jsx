import React, { useState } from 'react';
import styles from './DiaryAddProductForm.module.css';
import axios from 'axios';
import AddButtonIcon from '../images/AddButton.png';

axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export const DiaryAddProductForm = ({ selectedDate }) => {
  // State to manage form inputs
  const [consumedProduct, setConsumedProduct] = useState(''); // Changed from productName to consumedProduct
  const [quantity, setQuantity] = useState(''); // Changed from grams to quantity
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Validate the form fields
    if (!consumedProduct || !quantity) {
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

      // Update the request to send the correct field names: consumedProduct and quantity
      const response = await axios.post(
        '/api/products/addConsumedProduct',
        {
          consumedProduct, // corresponds to productName
          quantity: Number(quantity), // corresponds to grams, must be a number
          date: selectedDate.toISOString().substring(0, 10),
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
    setConsumedProduct('');
    setQuantity('');
  };

  return (
    <main className={styles.AddProductFormContainer}>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <div className={styles.productNameContainer}>
          <input
            type="text"
            name="consumedProduct" // Updated name
            className={styles.productNameInput}
            id="consumedProduct"
            placeholder="Enter product name"
            value={consumedProduct}
            onChange={e => setConsumedProduct(e.target.value)}
            required
          />
        </div>
        <div className={styles.gramsContainer}>
          <input
            type="number"
            name="quantity" // Updated name
            id="quantity"
            className={styles.gramsInput}
            placeholder="Grams"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
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
        </button>
        <button
          className={styles.AddMobileButton}
          type="submit"
          disabled={isLoading}
        >
          Add
        </button>
      </form>
    </main>
  );
};

export default DiaryAddProductForm;
