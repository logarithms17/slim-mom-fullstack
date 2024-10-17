import React, { useState } from 'react';
import css from './Hamburger.module.css';
import { NavLink } from 'react-router-dom';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={css.hamburgerCtn}>
      <div
        className={`${css.hamburger} ${isOpen ? css.active : ''}`}
        onClick={toggleMenu}
      >
        <div className={css.bar}></div>
        <div className={css.bar}></div>
        <div className={css.bar}></div>
      </div>
      <nav className={`${css.menu} ${isOpen ? css.active : ''}`}>
        <NavLink
          to="/diary"
          className={({ isActive }) =>
            `${isActive ? css.active : css.inactive} ${css.menuLink}`
          }
        >
          Diary
        </NavLink>
        <NavLink
          to="/calculator"
          className={({ isActive }) =>
            `${isActive ? css.active : css.inactive} ${css.menuLink} `
          }
        >
          Calculator
        </NavLink>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
