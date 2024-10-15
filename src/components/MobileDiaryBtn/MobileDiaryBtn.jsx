import React from 'react';
import styles from './MobileDiaryBtn.module.css';
import AddButtonIcon from '../images/AddButton.png';

const MobileDiaryBtn = ({ toggleFormVisibility }) => {
  // Accept the prop
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.submitButton} onClick={toggleFormVisibility}>
        {' '}
        {/* Call the function on click */}
        <img
          className={styles.submitButtonImg}
          loading="lazy"
          src={AddButtonIcon}
          alt="Submit"
        />
      </button>
    </div>
  );
};

export default MobileDiaryBtn;
