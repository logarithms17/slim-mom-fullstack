import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? <Component /> : <Navigate to={redirectTo} />;
}