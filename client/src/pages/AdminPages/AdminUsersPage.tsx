import { useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Stack,
    Switch,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import AdminLayout from '../../components/admin/AdminLayout';
import { deleteAdminUserAPI, getAdminUsersAPI, updateAdminUserAPI } from '../../services/adminService';

const panelStyles = {
    p: 3,
    borderRadius: '24px',
    background: 'rgba(255,255,255,0.82)',
    border: '1px solid rgba(255,255,255,0.72)',
    boxShadow: '0 22px 60px rgba(15,23,42,0.08)',
};

const AdminUsersPage = () => {
    const [tab, setTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [busyId, setBusyId] = useState('');

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError('');
            const { data } = await getAdminUsersAPI({ search });
            setUsers(data.items || []);
        } catch (err: any) {
            setError(err?.message || 'Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        const timer = setTimeout(loadUsers, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const adminCount = users.filter((item) => item.isAdmin).length;

    const handleToggleAdmin = async (user: any) => {
        try {
            setBusyId(user._id);
            await updateAdminUserAPI(user._id, { isAdmin: !user.isAdmin });
            setUsers((prev) => prev.map((item) => (item._id === user._id ? { ...item, isAdmin: !item.isAdmin } : item)));
        } catch (err: any) {
            setError(err?.message || 'Failed to update user role');
        } finally {
            setBusyId('');
        }
    };

    const handleDeleteUser = async (user: any) => {
        const confirmed = window.confirm(`Archive and delete ${user.firstName} ${user.lastName}?`);
        if (!confirmed) return;

        try {
            setBusyId(user._id);
            await deleteAdminUserAPI(user._id);
            setUsers((prev) => prev.filter((item) => item._id !== user._id));
        } catch (err: any) {
            setError(err?.message || 'Failed to delete user');
        } finally {
            setBusyId('');
        }
    };

    return (
        <AdminLayout
            title="Users"
            subtitle="Review your customer base, control elevated access, and keep account management organized from one dedicated admin workspace."
        >
            {loading ? (
                <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '40vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Stack spacing={3}>
                    {error ? <Alert severity="error" sx={{ borderRadius: '18px' }}>{error}</Alert> : null}
                    <Paper elevation={0} sx={{ p: 1, borderRadius: '20px', background: 'rgba(255,255,255,0.72)' }}>
                        <Tabs value={tab} onChange={(_, value) => setTab(value)}>
                            <Tab label="Overview" />
                            <Tab label="Management" />
                        </Tabs>
                    </Paper>

                    {tab === 0 ? (
                        <Paper elevation={0} sx={panelStyles}>
                            <Stack spacing={1.5}>
                                <Typography sx={{ color: '#111827', fontSize: '1.8rem', fontWeight: 600 }}>
                                    {users.length}
                                </Typography>
                                <Typography sx={{ color: 'rgba(17,24,39,0.56)' }}>Users currently loaded from the admin directory</Typography>
                                <Typography sx={{ color: '#111827', fontWeight: 600 }}>Admins: {adminCount}</Typography>
                                <Typography sx={{ color: '#111827', fontWeight: 600 }}>Customers: {users.length - adminCount}</Typography>
                            </Stack>
                        </Paper>
                    ) : (
                        <Paper elevation={0} sx={panelStyles}>
                            <Stack spacing={2.25}>
                                <TextField
                                    fullWidth
                                    placeholder="Search by name, username, email, or phone"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                                {users.map((user) => (
                                    <Box
                                        key={user._id}
                                        sx={{
                                            p: 2,
                                            borderRadius: '20px',
                                            border: '1px solid rgba(148,163,184,0.14)',
                                            background: 'rgba(248,250,252,0.92)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: { xs: 'flex-start', md: 'center' },
                                            flexDirection: { xs: 'column', md: 'row' },
                                            gap: 2,
                                        }}
                                    >
                                        <Box>
                                            <Typography sx={{ color: '#111827', fontWeight: 600 }}>
                                                {user.firstName} {user.lastName}
                                            </Typography>
                                            <Typography sx={{ color: 'rgba(17,24,39,0.56)', mt: 0.5 }}>
                                                @{user.userName} - {user.email}
                                            </Typography>
                                            <Typography sx={{ color: '#4f46e5', mt: 0.5, fontSize: '0.92rem' }}>
                                                {user.ordersCount} orders
                                            </Typography>
                                        </Box>
                                        <Stack direction="row" spacing={1.25} alignItems="center">
                                            <Typography sx={{ color: 'rgba(17,24,39,0.56)' }}>Admin</Typography>
                                            <Switch
                                                checked={Boolean(user.isAdmin)}
                                                onChange={() => handleToggleAdmin(user)}
                                                disabled={busyId === user._id}
                                            />
                                            <Button
                                                color="error"
                                                variant="outlined"
                                                onClick={() => handleDeleteUser(user)}
                                                disabled={busyId === user._id}
                                                sx={{ borderRadius: '14px', textTransform: 'none' }}
                                            >
                                                {busyId === user._id ? 'Working...' : 'Delete'}
                                            </Button>
                                        </Stack>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    )}
                </Stack>
            )}
        </AdminLayout>
    );
};

export default AdminUsersPage;
