import { useState } from 'react';
import {
    Alert,
    Box,
    CircularProgress,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAdminOrdersAPI, updateAdminOrderStatusAPI } from '../../services/adminService';

const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const panelStyles = {
    p: 3,
    background: 'rgba(255,255,255,0.82)',
    border: '1px solid rgba(255,255,255,0.72)',
    boxShadow: '0 22px 60px rgba(15,23,42,0.08)',
};

const AdminOrdersPage = () => {
    const [search, setSearch] = useState('');
    const queryClient = useQueryClient();

    // Fetch orders
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['adminOrders', search],
        queryFn: () => getAdminOrdersAPI({ search }),
    });

    // Update order status
    const updateMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => updateAdminOrderStatusAPI(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
        },
    });

    const orders = data?.data?.items || [];

    const handleStatusChange = (id: string, newStatus: string) => {
        updateMutation.mutate({ id, status: newStatus });
    };

    return (
        <AdminLayout
            title="Orders Management"
            subtitle="Track and update customer orders"
        >
            {isError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '16px' }}>
                    {error instanceof Error ? error.message : 'Failed to load orders'}
                </Alert>
            )}

            {updateMutation.isError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '16px' }}>
                    Failed to update order status.
                </Alert>
            )}

            <Stack spacing={4}>
                <Paper sx={panelStyles}>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'stretch', md: 'center' }}
                        spacing={2}
                        sx={{ mb: 3 }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
                            Recent Orders
                        </Typography>
                        <TextField
                            size="small"
                            placeholder="Search orders..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ width: { xs: '100%', md: '300px' } }}
                        />
                    </Stack>

                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : orders.length === 0 ? (
                        <Typography sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                            No orders found.
                        </Typography>
                    ) : (
                        <Stack spacing={2}>
                            {orders.map((order: any) => (
                                <Box
                                    key={order._id}
                                    sx={{
                                        p: 2,
                                        borderRadius: '20px',
                                        border: '1px solid rgba(148,163,184,0.14)',
                                        background: 'rgba(248,250,252,0.92)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                        gap: 2,
                                    }}
                                >
                                    <Box>
                                        <Typography sx={{ color: '#111827', fontWeight: 600 }}>
                                            Order ID: {order._id}
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(17,24,39,0.56)', mt: 0.5 }}>
                                            {order.user?.firstName} {order.user?.lastName} - {order.user?.email}
                                        </Typography>
                                        <Typography sx={{ color: '#4f46e5', mt: 0.5, fontSize: '0.92rem' }}>
                                            ${Number(order.totalPrice || 0).toLocaleString()} - {order.productsCount} items
                                        </Typography>
                                    </Box>
                                    <Select
                                        size="small"
                                        value={order.status}
                                        onChange={(event) => handleStatusChange(order._id, String(event.target.value))}
                                        disabled={updateMutation.isPending && updateMutation.variables?.id === order._id}
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
                    )}
                </Paper>
            </Stack>
        </AdminLayout>
    );
};

export default AdminOrdersPage;