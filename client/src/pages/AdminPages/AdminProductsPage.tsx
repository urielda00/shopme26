import { useState } from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import { deleteProductAPI, getAdminProductsAPI } from '../../services/adminService';
import { getImageUrl } from '../../utils/getImageUrl';

const statCardStyles = {
    p: 3,
    borderRadius: '24px',
    background: 'rgba(255,255,255,0.82)',
    border: '1px solid rgba(255,255,255,0.72)',
    boxShadow: '0 22px 60px rgba(15,23,42,0.08)',
};

const AdminProductsPage = () => {
    const [search, setSearch] = useState('');
    const queryClient = useQueryClient();

    // Fetch Products using React Query
    const { 
        data, 
        isLoading, 
        isError, 
        error 
    } = useQuery({
        queryKey: ['adminProducts', search],
        queryFn: () => getAdminProductsAPI({ search }),
    });

    // Delete Product Mutation
    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteProductAPI(id),
        onSuccess: () => {
            // Refetch products after successful deletion
            queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
        },
    });

    const products = data?.data?.items || [];

    const handleDelete = (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <AdminLayout
            title="Products Management"
            subtitle="View, edit, and manage your store inventory"
            primaryAction={{ label: 'Add Product', to: '/admin/products/create' }}
        >
            {isError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '16px' }}>
                    {error instanceof Error ? error.message : 'Failed to load products'}
                </Alert>
            )}

            {deleteMutation.isError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '16px' }}>
                    Failed to delete product.
                </Alert>
            )}

            <Stack spacing={4}>
                <Paper sx={statCardStyles}>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'stretch', md: 'center' }}
                        spacing={2}
                        sx={{ mb: 3 }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
                            All Products
                        </Typography>
                        <TextField
                            size="small"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ width: { xs: '100%', md: '300px' } }}
                        />
                    </Stack>

                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : products.length === 0 ? (
                        <Typography sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                            No products found.
                        </Typography>
                    ) : (
                        <Stack spacing={2}>
                            {products.map((product: any) => (
                                <Box
                                    key={product._id}
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
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar
                                            src={getImageUrl(product.images?.[0])}
                                            variant="rounded"
                                            sx={{ width: 64, height: 64, borderRadius: '12px' }}
                                        />
                                        <Box>
                                            <Typography sx={{ color: '#111827', fontWeight: 600 }}>
                                                {product.productName}
                                            </Typography>
                                            <Typography sx={{ color: 'rgba(17,24,39,0.56)', fontSize: '0.9rem', mt: 0.4 }}>
                                                {product.category} • ${product.price} • Stock: {product.quantity}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Stack direction="row" spacing={1.25}>
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
                                            disabled={deleteMutation.isPending && deleteMutation.variables === product._id}
                                            onClick={() => handleDelete(product._id, product.productName)}
                                            sx={{ borderRadius: '14px', textTransform: 'none' }}
                                        >
                                            {deleteMutation.isPending && deleteMutation.variables === product._id ? 'Deleting...' : 'Delete'}
                                        </Button>
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    )}
                </Paper>
            </Stack>
        </AdminLayout>
    );
};

export default AdminProductsPage;