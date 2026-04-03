import { useEffect, useState } from 'react';
import {
    Alert,
    Box,
    CircularProgress,
    Paper,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAdminInvoicesAPI } from '../../services/adminService';

const panelStyles = {
    p: 3,
    borderRadius: '24px',
    background: 'rgba(255,255,255,0.82)',
    border: '1px solid rgba(255,255,255,0.72)',
    boxShadow: '0 22px 60px rgba(15,23,42,0.08)',
};

const AdminInvoicesPage = () => {
    const [tab, setTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [invoices, setInvoices] = useState<any[]>([]);

    const loadInvoices = async () => {
        try {
            setLoading(true);
            setError('');
            const { data } = await getAdminInvoicesAPI({ search });
            setInvoices(data.items || []);
        } catch (err: any) {
            setError(err?.message || 'Failed to load invoices');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInvoices();
    }, []);

    useEffect(() => {
        const timer = setTimeout(loadInvoices, 300);
        return () => clearTimeout(timer);
    }, [search]);

    return (
        <AdminLayout
            title="Invoices"
            subtitle="Audit invoice generation, review billing history, and keep order-linked financial records visible inside the admin panel."
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
                                {invoices.length}
                            </Typography>
                            <Typography sx={{ color: 'rgba(17,24,39,0.56)' }}>
                                Invoices currently visible in the billing feed
                            </Typography>
                        </Paper>
                    ) : (
                        <Paper elevation={0} sx={panelStyles}>
                            <Stack spacing={2.25}>
                                <TextField
                                    fullWidth
                                    placeholder="Search by invoice number, customer, order id, or email"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                                {invoices.map((invoice) => (
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
                        </Paper>
                    )}
                </Stack>
            )}
        </AdminLayout>
    );
};

export default AdminInvoicesPage;
