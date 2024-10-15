import React,{ useEffect, useState } from 'react';
import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import HamburgerMenu from 'components/hamburger/Hamburger';

export default function Navigation() {

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
        <p className={css.userName}></p>
          <div className={css.divider}></div>
          <NavLink to="/login" className={css.exit}>
            Exit
          </NavLink>
        </div>
      </div>
     
    </header>
  );
}
