import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import DiaryPage from 'pages/DiaryPage';
import CalculatorPage from 'pages/CalculatorPage';
import RegistrationPage from 'pages/RegistrationPage';
import SharedLayout from 'components/SharedLayout';

import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
