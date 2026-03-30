import { FC, ReactNode } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
    children: ReactNode;
}

const AdminAuth: FC<Props> = ({ children }) => {
    const location = useLocation();
    const { user, isAdmin } = useAppSelector((state) => state.user);

    // First check if logged in
    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    // Then check if admin
    if (!isAdmin) {
        return <Navigate to='/' replace />;
    }

    return <>{children}</>;
};

export default AdminAuth;