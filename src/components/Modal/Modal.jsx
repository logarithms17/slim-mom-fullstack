import React from 'react';
import css from './Modal.module.css';

export const Modal = ({ isOpen, onClose, calorieIntake }) => {
  if (!isOpen) return null;

  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <button className={css.modalClose} onClick={onClose}>
          &times;
        </button>
        <h2>Your recommended daily calorie intake is</h2>
        <div className={css.calories}>
          <span className={css.caloriesVal}>{calorieIntake}</span> GRAMS
        </div>
        <p className={css.modalFood}>Foods you should not eat</p>
        <ol className={css.modalList}>
          <li>Flour products</li>
          <li>Milk</li>
          <li>Red meat</li>
          <li>Smoked meats</li>
        </ol>
        <button className={css.modalButton} onClick={onClose}>
          Start losing weight
        </button>
      </div>
    </div>
  );
};