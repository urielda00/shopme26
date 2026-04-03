import { useEffect, useMemo, useState } from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Grid,
    Paper,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { deleteProductAPI, getAdminOverviewAPI, getAdminProductsAPI } from '../../services/adminService';
import { getImageUrl } from '../../utils/getImageUrl';

const statCardStyles = {
    p: 3,
    borderRadius: '24px',
    background: 'rgba(255,255,255,0.82)',
    border: '1px solid rgba(255,255,255,0.72)',
    boxShadow: '0 22px 60px rgba(15,23,42,0.08)',
};

const AdminProductsPage = () => {
    const [tab, setTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [overview, setOverview] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [actionId, setActionId] = useState('');

    const loadPage = async () => {
        try {
            setLoading(true);
            setError('');
            const [overviewResponse, productsResponse] = await Promise.all([
                getAdminOverviewAPI(),
                getAdminProductsAPI({ search }),
            ]);
            setOverview(overviewResponse.data.overview);
            setProducts(productsResponse.data.items || []);
        } catch (err: any) {
            setError(err?.message || 'Failed to load product workspace');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPage();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            loadPage();
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const stats = useMemo(
        () => [
            {
                label: 'Catalog items',
                value: overview?.totals?.products || 0,
                helper: 'Total products in the store',
                icon: <Inventory2RoundedIcon />,
            },
            {
                label: 'Inventory value',
                value: `$${Number(overview?.totals?.inventoryValue || 0).toLocaleString()}`,
                helper: 'Estimated stock value',
                icon: <TrendingUpRoundedIcon />,
            },
            {
                label: 'Low stock',
                value: overview?.products?.lowStock || 0,
                helper: 'Products that need attention',
                icon: <WarningAmberRoundedIcon />,
            },
        ],
        [overview]
    );

    const handleDelete = async (productId: string, productName: string) => {
        const confirmed = window.confirm(`Delete \"${productName}\"? This action cannot be undone.`);
        if (!confirmed) return;

        try {
            setActionId(productId);
            await deleteProductAPI(productId);
            setProducts((prev) => prev.filter((item) => item._id !== productId));
        } catch (err: any) {
            setError(err?.message || 'Failed to delete product');
        } finally {
            setActionId('');
        }
    };

    return (
        <AdminLayout
            title="Products"
            subtitle="Keep the catalog sharp with a dedicated overview and a focused management workflow for editing, searching, and removing products."
            primaryAction={{ label: 'New product', to: '/admin/products/create' }}
        >
            {loading ? (
                <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '40vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Stack spacing={3}>
                    {error ? (
                        <Alert severity="error" sx={{ borderRadius: '18px' }}>
                            {error}
                        </Alert>
                    ) : null}

                    <Paper elevation={0} sx={{ p: 1, borderRadius: '20px', background: 'rgba(255,255,255,0.72)' }}>
                        <Tabs value={tab} onChange={(_, value) => setTab(value)}>
                            <Tab label="Overview" />
                            <Tab label="Management" />
                        </Tabs>
                    </Paper>

                    {tab === 0 ? (
                        <Grid container spacing={2.5}>
                            {stats.map((item) => (
                                <Grid item xs={12} md={4} key={item.label}>
                                    <Paper elevation={0} sx={statCardStyles}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                            <Typography sx={{ color: 'rgba(17,24,39,0.62)' }}>{item.label}</Typography>
                                            <Box sx={{ color: '#4f46e5' }}>{item.icon}</Box>
                                        </Box>
                                        <Typography sx={{ color: '#111827', fontSize: '1.8rem', fontWeight: 600, mb: 1 }}>
                                            {item.value}
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(17,24,39,0.56)' }}>{item.helper}</Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Paper elevation={0} sx={statCardStyles}>
                            <Stack spacing={2.25}>
                                <TextField
                                    fullWidth
                                    placeholder="Search by name, brand, category, company, or operating system"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />

                                <Stack spacing={1.5}>
                                    {products.map((product) => (
                                        <Box
                                            key={product._id}
                                            sx={{
                                                p: 2,
                                                borderRadius: '20px',
                                                border: '1px solid rgba(148,163,184,0.14)',
                                                background: 'rgba(248,250,252,0.92)',
                                                display: 'flex',
                                                gap: 2,
                                                justifyContent: 'space-between',
                                                alignItems: { xs: 'flex-start', md: 'center' },
                                                flexDirection: { xs: 'column', md: 'row' },
                                            }}
                                        >
                                            <Stack direction="row" spacing={1.5} sx={{ minWidth: 0, flex: 1 }}>
                                                <Avatar
                                                    variant="rounded"
                                                    src={getImageUrl(product.image)}
                                                    sx={{ width: 68, height: 68, borderRadius: '18px' }}
                                                />
                                                <Box sx={{ minWidth: 0 }}>
                                                    <Typography sx={{ color: '#111827', fontWeight: 600 }}>
                                                        {product.productName}
                                                    </Typography>
                                                    <Typography sx={{ color: 'rgba(17,24,39,0.56)', fontSize: '0.92rem', mt: 0.5 }}>
                                                        {[product.brand, product.category, product.company].filter(Boolean).join(' • ')}
                                                    </Typography>
                                                    <Typography sx={{ color: '#4f46e5', fontSize: '0.92rem', mt: 0.5 }}>
                                                        ${Number(product.price || 0).toLocaleString()} - {product.quantity || 0} in stock
                                                    </Typography>
                                                </Box>
                                            </Stack>

                                            <Stack direction="row" spacing={1}>
                                                <Button
                                                    component={Link}
                                                    to={`/admin/products/update?productId=${product._id}`}
                                                    variant="outlined"
                                                    startIcon={<EditOutlinedIcon />}
                                                    sx={{ borderRadius: '14px', textTransform: 'none' }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    color="error"
                                                    variant="outlined"
                                                    startIcon={<DeleteOutlineRoundedIcon />}
                                                    disabled={actionId === product._id}
                                                    onClick={() => handleDelete(product._id, product.productName)}
                                                    sx={{ borderRadius: '14px', textTransform: 'none' }}
                                                >
                                                    {actionId === product._id ? 'Deleting...' : 'Delete'}
                                                </Button>
                                            </Stack>
                                        </Box>
                                    ))}
                                </Stack>
                            </Stack>
                        </Paper>
                    )}
                </Stack>
            )}
        </AdminLayout>
    );
};

export default AdminProductsPage;
