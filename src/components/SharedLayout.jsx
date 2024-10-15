import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation/Navigation';

const SharedLayout = () => {
  return (
    <div>
      <Navigation/>
      <Outlet />
    </div>
  );
};

export default SharedLayout;
