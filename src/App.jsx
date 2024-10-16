import HomePage from 'pages/HomePage/HomePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import DiaryPage from 'pages/DiaryPage/DiaryPage';
import CalculatorPage from 'pages/CalculatorPage/CalculatorPage';
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';
import SharedLayout from 'components/SharedLayout';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import { RestrictedRoute } from 'components/RestrictedRoute/RestrictedRoute';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'scroll',
      }}
    >
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* Restricted Routes */}
          <Route
            path="/"
            element={
              <RestrictedRoute redirectTo="/calculator">
                <HomePage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/calculator">
                <RegistrationPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/calculator">
                <LoginPage />
              </RestrictedRoute>
            }
          />

          {/* Pivate Routes: Only accessible to logged in users */}
          <Route
            path="/diary"
            element={
              <PrivateRoute redirectTo="/login">
                <DiaryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/calculator"
            element={
              <PrivateRoute redirectTo="/login">
                <CalculatorPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};
