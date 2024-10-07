import React, { useState } from 'react';
import css from './CalorieCalculatorForm.module.css';
import { Modal } from '../Modal/Modal';

const CalorieCalculatorForm = () => {
  const [height, setHeight] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('');
  const [age, setAge] = useState('');
  const [blood, setBlood] = useState('1');
  const [currentWeight, setCurrentWeight] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const calorieIntake = 2800;

  const handleSubmit = e => {
    e.preventDefault();
    if (!height || !desiredWeight || !age || !blood || !currentWeight) {
      alert('Please fill out all fields');
      return;
    }

    setIsModalOpen(true);

    setHeight('');
    setDesiredWeight('');
    setAge('');
    setBlood('1');
    setCurrentWeight('');
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        calorieIntake={calorieIntake}
      />
    </div>
  );
};

export default CalorieCalculatorForm;
