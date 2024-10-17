import React, { useEffect, useState } from 'react';
import css from './Navigation.module.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import HamburgerMenu from 'components/hamburger/Hamburger';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import backBtn from '../../assets/images/backBtn.svg';

axios.defaults.baseURL = 'https://slim-mom-fullstack.onrender.com';

export default function Navigation({ isLoggedIn, onLogout }) {
  const [userData, setUserData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const pathname = location.pathname;

  const navigate = useNavigate();
  const showBackButton = location.pathname === '/diary';

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');

        if (!token) return; // Prevent fetching if not logged in

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
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [isLoggedIn]); // Rerun effect when login status changes

  const handleLogout = () => {
    localStorage.removeItem('token');
    try {
      axios.post('/api/users/logout');
      onLogout();
    } catch (error) {
      console.error(error);
    }
  };

  const dynamicNav = () => {
    if (pathname === '/diary' || pathname === '/calculator') {
      return (
        <div className={css.userExit}>
          {isLoading ? (
            <RotatingLines
              visible={true}
              height="24"
              width="24"
              color="white"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          ) : (
            <>
              {showBackButton && (
                <button onClick={() => navigate(-1)} className={css.backBtn}>
                  <img
                    src={backBtn}
                    alt="Back"
                    style={{ width: '12px', height: '7px' }}
                  />
                </button>
              )}
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
    if (pathname === '/login' || pathname === '/register' || pathname === '/') {
      return (
        <nav className={css.navAuth}>
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
        <>
          <HamburgerMenu />
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
        </>
      );
    }
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <img src={logo} alt="slim mom logo"></img>

        <div className={css.dividerOne}></div>
        {dynamicLink()}
      </div>
      {dynamicNav()}
    </header>
  );
}
