import { React, lazy, Suspense } from 'react';
import { useRoutes } from "react-router-dom";

const ProtectedRoute = lazy(() => import('./ProtectedRoute'));
const Loading = lazy(() => import('../components/Loading'));
const Navbar = lazy(() => import('../components/Navbar'));
const Login = lazy(() => import('../pages/Login/Login'));
const NotFound = lazy(() => import('../pages/404/NotFound'));
const Gatnasyk = lazy(() => import('../pages/Gatnasyk/Gatnasyk'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const Hasabat = lazy(() => import('../pages/Hasabat/Hasabat'));
const Talyplar = lazy(() => import('../pages/Admin/components/Talyplar'));
const Ulanyjylar = lazy(() => import('../pages/Admin/components/Ulanyjylar'));

function Router() {
    let routes = useRoutes([
        {
            element: <Suspense fallback={<Loading size='60px' />}><Login /></Suspense>,
            path: '/'
        },
        {
            element: <ProtectedRoute><Navbar /></ProtectedRoute>,
            children: [
                { path: "gatnasyk", element: <Suspense fallback={<Loading size='50px' />}><Gatnasyk /></Suspense> },
                { path: "hasabat", element: <Suspense fallback={<Loading size='50px' />}><Hasabat /></Suspense> },
                {
                    path: "admin",
                    element: <Suspense fallback={<Loading size='50px' />}><Admin /></Suspense>,
                    children: [
                        {
                            path: 'ulanyjylar',
                            element: <Suspense fallback={<Loading size='50px' />}><Ulanyjylar /></Suspense>
                        },
                        {
                            path: 'talyplar',
                            element: <Suspense fallback={<Loading size='50px' />}><Talyplar /></Suspense>
                        }
                    ]
                },
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