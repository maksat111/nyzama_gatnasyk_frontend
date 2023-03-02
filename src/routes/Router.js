import { React, lazy } from 'react';
import { useRoutes } from "react-router-dom";

// const NavbarRoutes = lazy(() => import('./routes/NavbarRoutes'));
const Navbar = lazy(() => import('../components/Navbar'));
const Login = lazy(() => import('../pages/Login/Login'));
const NotFound = lazy(() => import('../pages/404/NotFound'));
const Gatnasyk = lazy(() => import('../pages/Gatnasyk/Gatnasyk'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const Hasabat = lazy(() => import('../pages/Hasabat/Hasabat'));

function Router() {
    let routes = useRoutes([
        {
            element: <Login />,
            path: '/'
        },
        {
            element: <Navbar />,
            children: [
                { path: "gatnasyk", element: <Gatnasyk /> },
                { path: "hasabat", element: <Hasabat /> },
                { path: "admin", element: <Admin /> },
            ],
        },
        {
            element: <NotFound />,
            path: '*'
        }
    ]);
    return routes;
}

export default Router;