import React from 'react';
import css from './Modal.module.css';
import { NavLink } from 'react-router-dom';

export const Modal = ({
  isOpen,
  onClose,
  calorieIntake,
  foodsNotRecommended,
  isLoggedIn,
}) => {
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
          {foodsNotRecommended.map((food, index) => (
            <li key={index}>{food}</li>
          ))}
        </ol>

        {isLoggedIn ? (
          <NavLink to="/diary" className={css.modalButton} onClick={onClose}>
            Start losing weight
          </NavLink>
        ) : (
          <NavLink to="/login" className={css.modalButton} onClick={onClose}>
            Start losing weight
          </NavLink>
        )}
      </div>
    </div>
  );
};
