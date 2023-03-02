import { React, lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { isLogin } from '../utils/index';

const Navbar = lazy(() => import('../components/Navbar'));

function NavbarRoutes({ path, element }) {
    const location = useLocation();

    if (!isLogin()) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path={path} element={element} />
            </Routes>
        </>
    );
}

export default NavbarRoutes;