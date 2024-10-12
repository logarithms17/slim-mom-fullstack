import React from 'react'
import css from './Navigation.module.css'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'

export default function Navigation() {
  return (
    <header className={css.header}>
    <div className={css.container}>
          <img src={logo} alt='slim mom logo'></img>

      <div className={css.dividerOne}></div>
          <nav className={css.nav}>
              <NavLink to="/" className={({isActive}) => `${isActive ? css.active : css.inactive}`}>Diary</NavLink>
              <NavLink to="/" className={({isActive}) => `${isActive ? css.active : css.inactive} `}>Calculator</NavLink>
          </nav>
          <div className={css.userExit}>
          {/* <p className={css.userName}>Nic</p>
          <NavLink to="/" className={css.exit}>exit</NavLink> */}
            <p className={css.userName}>Nic</p>
            <div className={css.divider}></div>
            <NavLink to="/" className={css.exit}>Exit</NavLink>
          </div>
      </div>
</header>
  )
}
