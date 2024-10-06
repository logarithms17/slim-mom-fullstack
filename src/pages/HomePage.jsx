import React from 'react'
import styles from '../components/PageStyles/HomePageStyle.css'

const HomePage = () => {
  return (
<div>



<div className='calculateForm'>
  <heading>
  <h2 className='heading'>Calculate your daily calorie intake right now</h2>
</heading>

<input name='heightInput' className='inputStyle' placeholder='Height*'/>    

<input name='desiredWeightInput' className='inputStyle' placeholder='Desired Weight*'/>  

<input name='ageInput' className='inputStyle' placeholder='Age*'/>  

<input name='bloodTypeInput' className='inputStyle' placeholder='Blood Type*'/>  

<input name='currentWeightInput' className='inputStyle' placeholder='Current Weight*'/>  


</div>


    </div>
  )
}

export default HomePage