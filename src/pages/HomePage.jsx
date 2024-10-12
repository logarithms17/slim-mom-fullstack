import React from 'react'
import Calendar from '../components/calendar/Calendar'
import HamburgerMenu from 'components/hamburger/Hamburger'
import { Header } from 'components/Header/Header'

const HomePage = () => {
  return (
    <div>
      <Header/>
      <HamburgerMenu/>
      <Calendar/>
    </div>
    
  )
}

export default HomePage
