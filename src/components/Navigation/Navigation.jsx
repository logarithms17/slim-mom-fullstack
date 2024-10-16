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
  const [isLoading, setIsLoading] = useState(true); // New loading state

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    setIsLoading(true);
    console.log(isLoading);
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('/api/users/getUserData', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data.user.name);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchUser();
  }, []);
  console.log(isLoading);

  const handleLogout = () => {
    localStorage.removeItem('token');
    try {
      axios.post('/api/users/logout');
    } catch (error) {
      console.error(error);
    }
  };

  const dynamicNav = () => {
    if (pathname === '/diary' || pathname === '/calculator') {
      return (
        <div className={css.userExit}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p className={css.userName}>{userData}</p>
              <div className={css.divider}></div>
              <NavLink to="/login" className={css.exit} onClick={handleLogout}>
                Exit
              </NavLink>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  const dynamicLink = () => {
    // Render different links based on the path
    if (pathname === '/login' || pathname === '/register') {
      return (
        <nav className={css.nav}>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${isActive ? css.active : css.inactive}`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `${isActive ? css.active : css.inactive} `
            }
          >
            Register
          </NavLink>
        </nav>
      );
    }
    if (pathname === '/diary' || pathname === '/calculator') {
      return (
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
      );
    }
  };

  console.log(userData);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <HamburgerMenu />
        <img src={logo} alt="slim mom logo"></img>

        <div className={css.dividerOne}></div>
        {dynamicLink()}
      </div>
      {dynamicNav()}
    </header>
  );
}
