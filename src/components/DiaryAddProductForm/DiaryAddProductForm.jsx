import React from 'react';
import styles from './DiaryAddProductForm.module.css';
import AddButtonIcon from '../images/AddButton.png';

function DiaryAddProductForm() {
  return (
    <main className={styles.AddProductFormContainer}>
      <form className={styles.inputContainer}>
        <div className={styles.productNameContainer}>
          <input
            type="text"
            id="productName"
            className={styles.productNameInput}
            placeholder="Enter product name"
            aria-label="Enter product name"
          />
        </div>
        <div className={styles.gramsContainer}>
          <input
            type="number"
            id="grams"
            className={styles.gramsInput}
            placeholder="Grams"
            aria-label="Grams"
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
            alt=""
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
