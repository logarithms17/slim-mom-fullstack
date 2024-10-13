import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage'; // Adjust the path if needed

export const App = () => {
  console.log("App component is rendering");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <p>If you see this, Router is working!</p>
    </Router>
  );
};

export default App;
