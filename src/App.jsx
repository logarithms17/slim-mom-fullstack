import HomePage from 'pages/HomePage/HomePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import DiaryPage from 'pages/DiaryPage/DiaryPage';
import CalculatorPage from 'pages/CalculatorPage/CalculatorPage';
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';
import SharedLayout from 'components/SharedLayout';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
      </Route>
    </Routes>
  );
};
