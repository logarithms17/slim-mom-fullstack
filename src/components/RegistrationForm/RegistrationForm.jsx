import React, { useState } from 'react'
import css from './RegistrationForm.module.css';


export const RegistrationForm = () => {
     // State to manage form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();

  // Validate the form fields
  if (!name || !email || !password) {
    alert('Please fill out all fields');
    return;
  } 

//   Log the form data (this is where the API call would be made)
console.log('Name:', name);
console.log('Email:', email);
console.log('Password:', password);

// Mock success message after validation
alert('Registration Successful!');

// Clear form after successful submission
setName('');
setEmail('');
setPassword('');
};

  return (
    // <div className={css.backgroundContainer}>
    <div className={css.backgroundContainer}>   
        <div className={css.formTitle}>
            <h4>REGISTER</h4>

        <form onSubmit={handleSubmit}>
        <div className={css.inputBox}>
            <input 
                type="text" 
                name="name"
                id="name" 
                placeholder=" " 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
            />
            <label htmlFor="name">Name*</label>
            </div>
            <div className={css.inputBox}>
            <input 
                type="email" 
                name="email"
                id="email" 
                placeholder=" " 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
            />
            <label htmlFor="email">Email*</label>
            </div>
            <div className={css.inputBox}>
            <input 
                type="password" 
                name="password"
                id="password" 
                placeholder=" " 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
            />
            <label htmlFor="password">Password*</label>
            </div>
        

            <div className={css.buttonContainer}>
                <button className={css.button} type="submit">Register</button>
                <button className={css.button} type="button" onClick={() => alert('Redirect to Login page')}>Log in</button>
            </div>
        </form>
    </div>
</div>
  );
};
