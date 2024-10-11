import { Navigate, useLocation } from "react-router-dom";

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
    const location = useLocation();

    // Check if user is logged in by looking for a token in local storage
    const isLoggedIn = Boolean(localStorage.getItem('token'));

    const fromRegistration = location.state?.fromRegistration;

    if (isLoggedIn && !fromRegistration) {
        return <Navigate to={redirectTo} />;
    }

    return <Component />;
}