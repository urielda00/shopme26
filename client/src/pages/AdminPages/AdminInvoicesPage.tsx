import { useState } from 'react';
import {
    Alert,
    Box,
    CircularProgress,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAdminInvoicesAPI } from '../../services/adminService';

const panelStyles = {
    p: 3,
    background: 'rgba(255,255,255,0.82)',
    border: '1px solid rgba(255,255,255,0.72)',
    boxShadow: '0 22px 60px rgba(15,23,42,0.08)',
};

const AdminInvoicesPage = () => {
    const [search, setSearch] = useState('');

    // Fetch invoices
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['adminInvoices', search],
        queryFn: () => getAdminInvoicesAPI({ search }),
    });

    const invoices = data?.data?.items || [];

    return (
        <AdminLayout
            title="Invoices"
            subtitle="View all generated billing documents"
        >
            {isError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '16px' }}>
                    {error instanceof Error ? error.message : 'Failed to load invoices'}
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
                            All Invoices
                        </Typography>
                        <TextField
                            size="small"
                            placeholder="Search invoices..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ width: { xs: '100%', md: '300px' } }}
                        />
                    </Stack>

                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : invoices.length === 0 ? (
                        <Typography sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                            No invoices found.
                        </Typography>
                    ) : (
                        <Stack spacing={2}>
                            {invoices.map((invoice: any) => (
                                <Box
                                    key={invoice._id}
                                    sx={{
                                        p: 2,
                                        borderRadius: '20px',
                                        border: '1px solid rgba(148,163,184,0.14)',
                                        background: 'rgba(248,250,252,0.92)',
                                    }}
                                >
                                    <Typography sx={{ color: '#111827', fontWeight: 600 }}>
                                        {invoice.invoiceNumber}
                                    </Typography>
                                    <Typography sx={{ color: 'rgba(17,24,39,0.56)', mt: 0.5 }}>
                                        {invoice.user?.firstName} {invoice.user?.lastName} - {invoice.user?.email}
                                    </Typography>
                                    <Typography sx={{ color: '#4f46e5', mt: 0.5, fontSize: '0.92rem' }}>
                                        ${Number(invoice.totalAmount || 0).toLocaleString()} - {invoice.order?.status || 'no status'}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    )}
                </Paper>
            </Stack>
        </AdminLayout>
    );
};

export default AdminInvoicesPage;