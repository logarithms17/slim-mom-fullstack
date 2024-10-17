import React, { useState, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from 'components/SharedLayout';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import { RestrictedRoute } from 'components/RestrictedRoute/RestrictedRoute';
import { RotatingLines } from 'react-loader-spinner';

// Lazy loading components
const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const DiaryPage = lazy(() => import('pages/DiaryPage/DiaryPage'));
const CalculatorPage = lazy(() =>
  import('pages/CalculatorPage/CalculatorPage')
);
const RegistrationPage = lazy(() =>
  import('pages/RegistrationPage/RegistrationPage')
);

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}
    >
      <Suspense
        fallback={
          <RotatingLines
            visible={true}
            height="24"
            width="24"
            color="white"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <SharedLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            }
          >
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
                  <LoginPage onLogin={handleLogin} />
                </RestrictedRoute>
              }
            />

            {/* Private Routes: Only accessible to logged-in users */}
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
      </Suspense>
    </div>
  );
};
