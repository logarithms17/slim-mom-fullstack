import React, { useState } from 'react';
import axios from 'axios';
import css from './Daily.module.css';
import { Modal } from '../Modal/Modal';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export const DailyCaloriesForm = ({ isLoggedIn }) => {
  const [height, setHeight] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('');
  const [age, setAge] = useState('');
  const [blood, setBlood] = useState('1');
  const [currentWeight, setCurrentWeight] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    calorieIntake: null,
    foodsNotRecommended: [],
  });

  const validateInputs = () => {
    if (!height || isNaN(height) || height <= 0) {
      toast.error('Please enter a valid positive number for height..');
      return false;
    }

    if (!age || isNaN(age) || age <= 0 || age > 120) {
      toast.error('Please enter a valid age (1-120).');
      return false;
    }

    if (!currentWeight || isNaN(currentWeight) || currentWeight <= 0) {
      toast.error('Please enter a valid positive number for current weight.');
      return false;
    }

    if (!desiredWeight || isNaN(desiredWeight) || desiredWeight <= 0) {
      toast.error('Please enter a valid positive number for desired weight..');
      return false;
    }

    if (Number(desiredWeight) >= Number(currentWeight)) {
      toast.error('Desired weight should be less than current weight.');
      return false;
    }

    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    const url = isLoggedIn
      ? '/api/users/addCalorieCalculation'
      : '/api/users/addPublicCalorieCalculation';

    try {
      const response = await axios.post(url, {
        height: Number(height),
        desiredWeight: Number(desiredWeight),
        age: Number(age),
        bloodType: blood,
        currentWeight: Number(currentWeight),
      });

      if (response.status === 200) {
        const calorieData = isLoggedIn
          ? response.data.usersInfo
          : response.data.localCalorieIntake;

        if (calorieData) {
          setIsModalOpen(true);
          setModalData({
            calorieIntake: calorieData.recommendedCalories,
            foodsNotRecommended: calorieData.foodsNotRecommended || [],
          });

          setHeight('');
          setDesiredWeight('');
          setAge('');
          setBlood('1');
          setCurrentWeight('');
        } else {
          console.error('usersInfo is undefined:', response.data);
        }
      }
    } catch (error) {
      console.error(
        'Error in API request:',
        error.response?.data || error.message
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.dailyContainer}>
      <div>
        <h1>Calculate your daily calorie intake right now</h1>

        <form onSubmit={handleSubmit} className={css.dailyForm}>
          <div className={css.dailyDiv}>
            <div className={css.inputBox}>
              <input
                type="text"
                name="height"
                id="height"
                value={height}
                onChange={e => setHeight(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="height">Height*</label>
            </div>
            <div className={css.inputBox}>
              <input
                type="text"
                name="age"
                id="age"
                value={age}
                onChange={e => setAge(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="age">Age*</label>
            </div>
            <div className={css.inputBox}>
              <input
                type="text"
                name="currentWeight"
                id="currentWeight"
                value={currentWeight}
                onChange={e => setCurrentWeight(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="currentWeight">Current weight*</label>
            </div>
          </div>

          <div className={css.dailyDiv}>
            <div className={css.inputBox}>
              <input
                type="text"
                name="desiredWeight"
                id="desiredWeight"
                value={desiredWeight}
                onChange={e => setDesiredWeight(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="desiredWeight">Desired weight*</label>
            </div>
            <div className={css.radioGroup}>
              <label className={css.radioGroupLabel}>Blood type*</label>
              <div className={css.radioOptions}>
                <label className={css.radioLabel}>
                  <input
                    type="radio"
                    name="blood"
                    value="1"
                    checked={blood === '1'}
                    onChange={e => setBlood(e.target.value)}
                    required
                  />
                  <span>1</span>
                </label>
                <label className={css.radioLabel}>
                  <input
                    type="radio"
                    name="blood"
                    value="2"
                    checked={blood === '2'}
                    onChange={e => setBlood(e.target.value)}
                    required
                  />
                  <span>2</span>
                </label>
                <label className={css.radioLabel}>
                  <input
                    type="radio"
                    name="blood"
                    value="3"
                    checked={blood === '3'}
                    onChange={e => setBlood(e.target.value)}
                    required
                  />
                  <span>3</span>
                </label>
                <label className={css.radioLabel}>
                  <input
                    type="radio"
                    name="blood"
                    value="4"
                    checked={blood === '4'}
                    onChange={e => setBlood(e.target.value)}
                    required
                  />
                  <span>4</span>
                </label>
              </div>
            </div>
          </div>

          <div className={css.dailyButton}>
            <button className={css.button} type="submit">
              Start losing weight
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        calorieIntake={modalData.calorieIntake}
        foodsNotRecommended={modalData.foodsNotRecommended}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};
