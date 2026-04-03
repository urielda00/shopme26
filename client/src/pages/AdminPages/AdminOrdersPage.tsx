import { useEffect, useState } from 'react';
import {
    Alert,
    Box,
    CircularProgress,
    MenuItem,
    Paper,
    Select,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAdminOrdersAPI, updateAdminOrderStatusAPI } from '../../services/adminService';

const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const panelStyles = {
    p: 3,
    borderRadius: '24px',
    background: 'rgba(255,255,255,0.82)',
    border: '1px solid rgba(255,255,255,0.72)',
    boxShadow: '0 22px 60px rgba(15,23,42,0.08)',
};

const AdminOrdersPage = () => {
    const [tab, setTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState<any[]>([]);
    const [busyId, setBusyId] = useState('');

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError('');
            const { data } = await getAdminOrdersAPI({ search });
            setOrders(data.items || []);
        } catch (err: any) {
            setError(err?.message || 'Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {
        const timer = setTimeout(loadOrders, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const handleStatusChange = async (orderId: string, status: string) => {
        try {
            setBusyId(orderId);
            await updateAdminOrderStatusAPI(orderId, status);
            setOrders((prev) => prev.map((item) => (item._id === orderId ? { ...item, status } : item)));
        } catch (err: any) {
            setError(err?.message || 'Failed to update order status');
        } finally {
            setBusyId('');
        }
    };

    return (
        <AdminLayout
            title="Orders"
            subtitle="Track the full order pipeline, spot operational bottlenecks, and update fulfillment status without leaving the admin workspace."
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
                            <Typography sx={{ color: '#111827', fontSize: '1.8rem', fontWeight: 600, mb: 1 }}>
                                {orders.length}
                            </Typography>
                            <Typography sx={{ color: 'rgba(17,24,39,0.56)' }}>
                                Orders currently visible in the management feed
                            </Typography>
                        </Paper>
                    ) : (
                        <Paper elevation={0} sx={panelStyles}>
                            <Stack spacing={2.25}>
                                <TextField
                                    fullWidth
                                    placeholder="Search by customer name, email, status, address, or order id"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                                {orders.map((order) => (
                                    <Box
                                        key={order._id}
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
                                                {order.user?.firstName} {order.user?.lastName}
                                            </Typography>
                                            <Typography sx={{ color: 'rgba(17,24,39,0.56)', mt: 0.5 }}>
                                                {order.address}
                                            </Typography>
                                            <Typography sx={{ color: '#4f46e5', mt: 0.5, fontSize: '0.92rem' }}>
                                                ${Number(order.totalPrice || 0).toLocaleString()} - {order.productsCount} items
                                            </Typography>
                                        </Box>
                                        <Select
                                            size="small"
                                            value={order.status}
                                            onChange={(event) => handleStatusChange(order._id, String(event.target.value))}
                                            disabled={busyId === order._id}
                                            sx={{ minWidth: 170, borderRadius: '14px' }}
                                        >
                                            {orderStatuses.map((status) => (
                                                <MenuItem key={status} value={status}>
                                                    {status}
                                                </MenuItem>
                                            ))}
                                        </Select>
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

export default AdminOrdersPage;
