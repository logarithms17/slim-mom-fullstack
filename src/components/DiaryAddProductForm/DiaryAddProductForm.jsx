import React, { useState } from 'react';
import styles from './DiaryAddProductForm.module.css';
import AddButtonIcon from '../images/AddButton.png';

function DiaryAddProductForm() {
  // State for product name and grams
  const [productName, setProductName] = useState('');
  const [grams, setGrams] = useState('');

  // Handle input changes
  const handleProductNameChange = e => setProductName(e.target.value);
  const handleGramsChange = e => setGrams(e.target.value);

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    const data = { productName, grams };

    try {
      // Send data to the backend API
      const response = await fetch(
        'https://slim-mom-fullstack.onrender.com/api/products',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log('Product added successfully');
        // Clear input fields after successful submission
        setProductName('');
        setGrams('');
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className={styles.AddProductFormContainer}>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <div className={styles.productNameContainer}>
          <input
            type="text"
            id="productName"
            className={styles.productNameInput}
            placeholder="Enter product name"
            aria-label="Enter product name"
            value={productName}
            onChange={handleProductNameChange}
          />
        </div>
        <div className={styles.gramsContainer}>
          <input
            type="number"
            id="grams"
            className={styles.gramsInput}
            placeholder="Grams"
            aria-label="Grams"
            value={grams}
            onChange={handleGramsChange}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          aria-label="Submit"
        >
          <img
            className={styles.submitButtonImg}
            loading="lazy"
            src={AddButtonIcon}
            alt="Submit"
          />
        </button>
        <button
          type="submit"
          className={styles.AddMobileButton}
          aria-label="Submit"
        >
          Add
        </button>
      </form>
    </main>
  );
}

export default DiaryAddProductForm;
