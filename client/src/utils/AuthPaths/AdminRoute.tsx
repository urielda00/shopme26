import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAppSelector } from '../../app/hooks';

interface AdminRouteProps {
    children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
    const { user, isAdmin, initialized } = useAppSelector((state) => state.user);

    if (!initialized) {
        return null;
    }

    if (!user || !isAdmin) {
        return <Navigate to='/login' replace />;
    }

    return <>{children}</>;
};

export default AdminRoute;