import LoginPage from './login';
import {Routes, Route } from "react-router-dom";

function AuthRoute() {
    return (
        <>
            <Routes>
                <Route path='/' element={<LoginPage />} />
            </Routes>

        </>
    )
}

export default AuthRoute