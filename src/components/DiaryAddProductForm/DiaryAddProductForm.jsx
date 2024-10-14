import React, { useState } from 'react';
import styles from './DiaryAddProductForm.module.css';
import axios from 'axios';
import AddButtonIcon from '../images/AddButton.png';

axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export const DiaryAddProductForm = ({ selectedDate, onAddProduct }) => {
  const [consumedProduct, setConsumedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!consumedProduct || !quantity) {
      alert('Please fill out all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authorization token is missing. Please log in.');
        setIsLoading(false);
        return;
      }

      console.log('Adding product:', {
        consumedProduct,
        quantity,
        date: selectedDate.toISOString().substring(0, 10),
      });

      const response = await axios.post(
        '/api/products/addConsumedProduct',
        {
          consumedProduct,
          quantity: Number(quantity),
          date: selectedDate.toISOString().substring(0, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const newProduct = response.data; // Ensure this structure matches your API response
        console.log('Product successfully added:', newProduct);
        onAddProduct(newProduct); // Notify DiaryPage that a new product was added
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

    setConsumedProduct('');
    setQuantity('');
  };

  return (
    <main className={styles.AddProductFormContainer}>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <div className={styles.productNameContainer}>
          <input
            type="text"
            name="consumedProduct"
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
            name="quantity"
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
