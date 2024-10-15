import React, { useEffect, useState } from 'react';
import css from './Navigation.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import HamburgerMenu from 'components/hamburger/Hamburger';
import axios from 'axios';

axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export default function Navigation() {
  //fetch user data
  const [userData, setUserData] = useState('');

  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);

  const dynamicNav = () => {
    // Check specific paths and render accordingly
    if (pathname === '/diary' || pathname === '/calculator') {
      return (
        <div className={css.userExit}>
          <p className={css.userName}>{userData}</p>
          <div className={css.divider}></div>
          <NavLink to="/login" className={css.exit}>
            Exit
          </NavLink>
        </div>
      );
    }
    if (pathname === '/' || pathname === '/login' || pathname === '/register') {
      return null;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Assuming the token is stored in localStorage
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/getUserData', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.user.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <HamburgerMenu />
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

        {dynamicNav()}
      </div>
    </header>
  );
}
