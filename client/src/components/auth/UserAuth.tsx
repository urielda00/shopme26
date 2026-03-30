import { FC, ReactNode } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
    children: ReactNode;
}

const UserAuth: FC<Props> = ({ children }) => {
    const location = useLocation();
    // Use Redux state directly - it's persisted and reliable
    const { user } = useAppSelector((state) => state.user);

    if (!user) {
        // Redirect to login and save the current location for a better UX after login
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default UserAuth;