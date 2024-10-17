import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation/Navigation';

const SharedLayout = ({ isLoggedIn, onLogout }) => {
  return (
    <div>
      <Navigation isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
