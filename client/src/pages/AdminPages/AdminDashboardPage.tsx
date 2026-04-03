import { useEffect, useState } from 'react';
import {
    Alert,
    Box,
    CircularProgress,
    Grid,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAdminOverviewAPI } from '../../services/adminService';
import { useTitle } from '../../hooks/useTitle';
const metricCards = (overview: any) => [
    {
        label: 'Products',
        value: overview?.totals?.products || 0,
        helper: `${overview?.products?.active || 0} active items`,
        icon: <Inventory2RoundedIcon />,
    },
    {
        label: 'Users',
        value: overview?.totals?.users || 0,
        helper: 'Registered customer base',
        icon: <PeopleAltRoundedIcon />,
    },
    {
        label: 'Orders',
        value: overview?.totals?.orders || 0,
        helper: `${overview?.orderStatus?.pending || 0} pending`,
        icon: <ReceiptLongRoundedIcon />,
    },
    {
        label: 'Invoices',
        value: overview?.totals?.invoices || 0,
        helper: 'Issued billing documents',
        icon: <DescriptionRoundedIcon />,
    },
    {
        label: 'Revenue',
        value: `$${Number(overview?.totals?.revenue || 0).toLocaleString()}`,
        helper: 'Captured from all orders',
        icon: <TrendingUpRoundedIcon />,
    },
    {
        label: 'Low stock',
        value: overview?.products?.lowStock || 0,
        helper: 'Products below threshold',
        icon: <WarningAmberRoundedIcon />,
    },
];

const cardStyles = {
    p: 3,
    borderRadius: '28px',
    background: 'rgba(255,255,255,0.78)',
    backdropFilter: 'blur(18px)',
    border: '1px solid rgba(255,255,255,0.68)',
    boxShadow: '0 22px 60px rgba(15,23,42,0.08)',
};

const AdminDashboardPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [overview, setOverview] = useState<any>(null);

    useTitle('Dashboard');
    useEffect(() => {
        const loadOverview = async () => {
            try {
                setLoading(true);
                setError('');
                const { data } = await getAdminOverviewAPI();
                setOverview(data.overview);
            } catch (err: any) {
                setError(err?.message || 'Failed to load admin overview');
            } finally {
                setLoading(false);
            }
        };

        loadOverview();
    }, []);

    return (
        <AdminLayout
            title="Dashboard"
            subtitle="Monitor the store from one polished control center with live operational metrics, recent activity, and fast access to the main admin modules."
            primaryAction={{
                label: 'Create product',
                to: '/admin/products/create',
            }}
        >
            {loading ? (
                <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '40vh' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error" sx={{ borderRadius: '18px' }}>
                    {error}
                </Alert>
            ) : (
                <Stack spacing={3}>
                    <Grid container spacing={2.5}>
                        {metricCards(overview).map((card) => (
                            <Grid item xs={12} sm={6} xl={4} key={card.label}>
                                <Paper elevation={0} sx={cardStyles}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography sx={{ color: 'rgba(17,24,39,0.62)', fontSize: '0.92rem' }}>
                                            {card.label}
                                        </Typography>
                                        <Box
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: '14px',
                                                display: 'grid',
                                                placeItems: 'center',
                                                background: 'rgba(99,102,241,0.10)',
                                                color: '#4f46e5',
                                            }}
                                        >
                                            {card.icon}
                                        </Box>
                                    </Box>
                                    <Typography sx={{ color: '#111827', fontSize: '1.85rem', fontWeight: 600, mb: 1 }}>
                                        {card.value}
                                    </Typography>
                                    <Typography sx={{ color: 'rgba(17,24,39,0.56)' }}>{card.helper}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid container spacing={2.5}>
                        <Grid item xs={12} xl={7}>
                            <Paper elevation={0} sx={cardStyles}>
                                <Typography variant="h6" sx={{ color: '#111827', mb: 2, fontWeight: 500 }}>
                                    Order pipeline
                                </Typography>
                                <Grid container spacing={1.5}>
                                    {Object.entries(overview?.orderStatus || {}).map(([key, value]) => (
                                        <Grid item xs={12} sm={6} md={4} key={key}>
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    borderRadius: '18px',
                                                    background: 'rgba(248,250,252,0.96)',
                                                    border: '1px solid rgba(148,163,184,0.14)',
                                                }}
                                            >
                                                <Typography sx={{ textTransform: 'capitalize', color: 'rgba(17,24,39,0.56)', mb: 0.75 }}>
                                                    {key}
                                                </Typography>
                                                <Typography sx={{ color: '#111827', fontSize: '1.35rem', fontWeight: 600 }}>
                                                    {String(value)}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} xl={5}>
                            <Paper elevation={0} sx={cardStyles}>
                                <Typography variant="h6" sx={{ color: '#111827', mb: 2, fontWeight: 500 }}>
                                    Inventory intelligence
                                </Typography>
                                <Stack spacing={1.5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: 'rgba(17,24,39,0.62)' }}>Units in stock</Typography>
                                        <Typography sx={{ color: '#111827', fontWeight: 600 }}>
                                            {overview?.totals?.totalUnits || 0}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: 'rgba(17,24,39,0.62)' }}>Inventory value</Typography>
                                        <Typography sx={{ color: '#111827', fontWeight: 600 }}>
                                            ${Number(overview?.totals?.inventoryValue || 0).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: 'rgba(17,24,39,0.62)' }}>Out of stock</Typography>
                                        <Typography sx={{ color: '#111827', fontWeight: 600 }}>
                                            {overview?.products?.outOfStock || 0}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2.5}>
                        <Grid item xs={12} xl={6}>
                            <Paper elevation={0} sx={cardStyles}>
                                <Typography variant="h6" sx={{ color: '#111827', mb: 2, fontWeight: 500 }}>
                                    Recent orders
                                </Typography>
                                <Stack spacing={1.5}>
                                    {(overview?.recentOrders || []).map((order: any) => (
                                        <Box
                                            key={order._id}
                                            sx={{
                                                p: 2,
                                                borderRadius: '18px',
                                                border: '1px solid rgba(148,163,184,0.14)',
                                                background: 'rgba(248,250,252,0.96)',
                                            }}
                                        >
                                            <Typography sx={{ color: '#111827', fontWeight: 600 }}>
                                                {order.userId?.firstName} {order.userId?.lastName}
                                            </Typography>
                                            <Typography sx={{ color: 'rgba(17,24,39,0.56)', fontSize: '0.9rem', mt: 0.4 }}>
                                                {order.status} - ${Number(order.totalPrice || 0).toLocaleString()}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} xl={6}>
                            <Paper elevation={0} sx={cardStyles}>
                                <Typography variant="h6" sx={{ color: '#111827', mb: 2, fontWeight: 500 }}>
                                    Recent users
                                </Typography>
                                <Stack spacing={1.5}>
                                    {(overview?.recentUsers || []).map((user: any) => (
                                        <Box
                                            key={user._id}
                                            sx={{
                                                p: 2,
                                                borderRadius: '18px',
                                                border: '1px solid rgba(148,163,184,0.14)',
                                                background: 'rgba(248,250,252,0.96)',
                                            }}
                                        >
                                            <Typography sx={{ color: '#111827', fontWeight: 600 }}>
                                                {user.firstName} {user.lastName}
                                            </Typography>
                                            <Typography sx={{ color: 'rgba(17,24,39,0.56)', fontSize: '0.9rem', mt: 0.4 }}>
                                                @{user.userName} - {user.email}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Stack>
            )}
        </AdminLayout>
    );
};

export default AdminDashboardPage;
