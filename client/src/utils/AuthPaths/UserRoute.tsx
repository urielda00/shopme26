import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

interface Props {
    children: ReactNode;
}

const UserRoute: FC<Props> = ({ children }) => {
    const { user } = useAppSelector((state) => state.user);
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default UserRoute;