import React,{ useEffect, useState } from 'react';
import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import HamburgerMenu from 'components/hamburger/Hamburger';

export default function Navigation() {
  const [userName, setUserName] = useState('');

  // Fetch user data from the backend API
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch('/api/user'); // Replace with your actual API endpoint
        const data = await response.json();
        setUserName(data.name); // Assuming the response has a 'name' field
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <header className={css.header}>
      
      <div className={css.container}>
      <HamburgerMenu/>
        <img src={logo} alt="slim mom logo"></img>

        <div className={css.dividerOne}></div>
        <nav className={css.nav}>
          <NavLink
            to="/diary"
            className={({ isActive }) =>
              `${isActive ? css.active : css.inactive}`
            }
          >
            Diary
          </NavLink>
          <NavLink
            to="/calculator"
            className={({ isActive }) =>
              `${isActive ? css.active : css.inactive} `
            }
          >
            Calculator
          </NavLink>
        </nav>

        <div className={css.userExit}>
        <p className={css.userName}>{userName}</p>
          <div className={css.divider}></div>
          <NavLink to="/login" className={css.exit}>
            Exit
          </NavLink>
        </div>
      </div>
     
    </header>
  );
}
