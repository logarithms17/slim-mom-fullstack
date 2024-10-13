// import React from 'react';
// import css from './Modal.module.css';
// import { NavLink } from 'react-router-dom';

// export const Modal = ({
//   isOpen,
//   onClose,
//   calorieIntake,
//   foodsNotRecommended,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className={css.modal}>
//       <div className={css.modalContent}>
//         <button className={css.modalClose} onClick={onClose}>
//           &times;
//         </button>
//         <h2>Your recommended daily calorie intake is</h2>
//         <div className={css.calories}>
//           <span className={css.caloriesVal}>{calorieIntake}</span> GRAMS
//         </div>
//         <p className={css.modalFood}>Foods you should not eat</p>
//         <ol className={css.modalList}>
//           {foodsNotRecommended.map((food, index) => (
//             <li key={index}>{food}</li>
//           ))}
//         </ol>

//         <NavLink to="/login" className={css.modalButton} onClick={onClose}>
//           Start losing weight
//         </NavLink>
//       </div>
//     </div>
//   );
// };
import React from 'react';
import css from './Modal.module.css';
import { useNavigate } from 'react-router-dom';

export const Modal = ({
  isOpen,
  onClose,
  calorieIntake,
  foodsNotRecommended,
  modalValidation,
}) => {
  const navigate = useNavigate(); // Get the navigate function

  if (!isOpen) return null;

  const handleStartLosingWeight = () => {
    onClose(); // Close the modal
    if (modalValidation === 1) {
      navigate('/diary'); // Redirect to Diary page if logged in
    } else {
      navigate('/login'); // Redirect to Login page if not logged in
    }
  };

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

        <button className={css.modalButton} onClick={handleStartLosingWeight}>
          Start losing weight
        </button>
      </div>
    </div>
  );
};
