import React, {useState} from 'react';
import heightConversionImage from '../components/images/measurementReference/heightConversion.jpg';
import styles from '../components/PageStyles/Modal-Style.css';


const HomePage = () => {
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};
  
  return (
<div>
Need reference for your height measurement? 
Click <a href="#!" onClick={openModal}>
  here
</a>

{isModalOpen && (
<div className='modalHeight'>
  <div className='modalHeight-Content'>
    <span className='close' onClick={closeModal}>
      Close
    </span>
<img src={heightConversionImage} alt="Height Measurement Reference"/>
  </div>
</div>
)}





</div>
  )
}

export default HomePage