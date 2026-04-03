import UserDashboardView from '../components/user-dashboard/UserDashboardView';
import { useUserDashboard } from '../hooks/useUserDashboard';
import { useTitle } from '../hooks/useTitle';

const UserDashboardPage = () => {
    useTitle('Dashboard');
    const dashboard = useUserDashboard();

    return <UserDashboardView {...dashboard} />;
};

export default UserDashboardPage;