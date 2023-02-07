import { Navigate, useLocation } from 'react-router-dom';
import { isLogin } from '.';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    if (!isLogin()) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;