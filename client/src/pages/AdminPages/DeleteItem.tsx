import { useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { deleteProductAPI } from '../../services/adminService';

const DeleteItem = () => {
    const [productId, setProductId] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSuccessMessage('');
        setErrorMessage('');

        if (!productId.trim()) {
            setErrorMessage('Product ID is required');
            return;
        }

        try {
            setLoading(true);
            await deleteProductAPI(productId.trim());
            setSuccessMessage('Product deleted successfully');
            setProductId('');
        } catch (error: any) {
            setErrorMessage(error.message || 'Failed to delete product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                pt: '112px',
                pb: 8,
                background:
                    'radial-gradient(circle at top, rgba(99,102,241,0.08), transparent 30%), linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
            }}
        >
            <Container maxWidth='sm'>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2.25, sm: 3.5 },
                        borderRadius: '32px',
                        background: 'rgba(255,255,255,0.74)',
                        backdropFilter: 'blur(18px) saturate(140%)',
                        border: '1px solid rgba(255,255,255,0.62)',
                        boxShadow: '0 30px 80px rgba(15,23,42,0.10)',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 3,
                        }}
                    >
                        <Box
                            sx={{
                                width: 52,
                                height: 52,
                                borderRadius: '18px',
                                display: 'grid',
                                placeItems: 'center',
                                background: 'linear-gradient(135deg, #ef4444 0%, #db2777 100%)',
                                color: '#fff',
                                boxShadow: '0 16px 34px rgba(239,68,68,0.22)',
                            }}
                        >
                            <DeleteOutlineRoundedIcon />
                        </Box>

                        <Box>
                            <Typography
                                variant='overline'
                                sx={{
                                    display: 'block',
                                    color: 'rgba(17,24,39,0.56)',
                                    letterSpacing: '0.24rem',
                                    lineHeight: 1.2,
                                }}
                            >
                                ADMIN PRODUCT FLOW
                            </Typography>

                            <Typography
                                component='h1'
                                variant='h4'
                                sx={{
                                    color: '#111827',
                                    fontWeight: 300,
                                    letterSpacing: '-0.03em',
                                }}
                            >
                                Delete Product
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            mb: 3,
                            p: 2,
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 1.5,
                            background: 'rgba(239,68,68,0.06)',
                            border: '1px solid rgba(239,68,68,0.16)',
                        }}
                    >
                        <WarningAmberRoundedIcon sx={{ color: '#dc2626', mt: '2px' }} />
                        <Box>
                            <Typography sx={{ color: '#111827', fontWeight: 500, mb: 0.5 }}>
                                Permanent action
                            </Typography>
                            <Typography sx={{ color: 'rgba(17,24,39,0.68)', lineHeight: 1.7 }}>
                                Deleting a product removes it from the catalog immediately. Make sure the selected ID is correct before confirming.
                            </Typography>
                        </Box>
                    </Box>

                    {successMessage ? (
                        <Alert severity='success' sx={{ mb: 2, borderRadius: '16px' }}>
                            {successMessage}
                        </Alert>
                    ) : null}

                    {errorMessage ? (
                        <Alert severity='error' sx={{ mb: 2, borderRadius: '16px' }}>
                            {errorMessage}
                        </Alert>
                    ) : null}

                    <Box component='form' onSubmit={handleDelete}>
                        <TextField
                            fullWidth
                            label='Product ID'
                            value={productId}
                            onChange={(event) => setProductId(event.target.value)}
                            placeholder='Enter the product ID to delete'
                            sx={{ mb: 2.5 }}
                        />

                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            disabled={loading}
                            sx={{
                                minHeight: '54px',
                                borderRadius: '16px',
                                textTransform: 'none',
                                fontSize: '0.98rem',
                                fontWeight: 500,
                                background: 'linear-gradient(135deg, #ef4444 0%, #db2777 100%)',
                                boxShadow: '0 20px 40px rgba(239,68,68,0.24)',
                                '&:hover': {
                                    boxShadow: '0 24px 46px rgba(239,68,68,0.30)',
                                },
                            }}
                        >
                            {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Delete Product'}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default DeleteItem;