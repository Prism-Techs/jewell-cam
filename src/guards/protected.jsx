import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { isLoggedIn } from '../services/authenticate';
import "../pages/dashboard/dashboard.scss"
// import '../pages/css/dashboard.scss'
// import {toast} from 'react-toastify'

const Protected = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isAuthChecked, setIsAuthChecked] = useState(false);     
    useEffect(() => {

        const checkAuthentication = async () => {
            const isAuthenticated = await isLoggedIn();
            setIsAuthChecked(true);
            
            if (!isAuthenticated) {
                navigate('/auth', { replace: true })
            } else {
                console.log("already logged in");
                
                const currentRoute = location.pathname;
                if (currentRoute === '/') {
                    navigate('/dashboard', { replace: true });
                }
            }
        };
        // Only check authentication if it hasn't been done before
        if (!isAuthChecked) {
            checkAuthentication();
        }

    }, [isAuthChecked, navigate, location])

    // Render the header and outlet only after the authentication check
    if (!isAuthChecked) {
        return null; // You can also render a loading spinner here
    }

    return <>
        {/* Display header only on protected routes */}
        <div className='main-container'>

            <Outlet />

        </div>
    </>
};

export default Protected