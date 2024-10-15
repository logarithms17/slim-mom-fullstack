import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";

export const RestrictedRoute = ({ children, redirectTo = '/' }) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        setIsLoading(false);
    }, []);
    
    const fromRegistration = location.state?.fromRegistration;

    if(isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <RotatingLines
              visible={true}
              height="80"
              width="80"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </div>
        );
    }

    if (isLoggedIn && !fromRegistration) {
        return <Navigate to={redirectTo} />;
    }

    return children;
}