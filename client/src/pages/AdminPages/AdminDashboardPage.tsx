import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const cards = [
    {
        title: 'Create Product',
        description: 'Add a new item with images, metadata, and pricing.',
        icon: <AddBoxOutlinedIcon fontSize='large' />,
        to: '/admin/products/create',
    },
    {
        title: 'Update Product',
        description: 'Edit product details, stock, media, and attributes.',
        icon: <EditOutlinedIcon fontSize='large' />,
        to: '/admin/products/update',
    },
    {
        title: 'Delete Product',
        description: 'Remove outdated or invalid products from the catalog.',
        icon: <DeleteOutlineOutlinedIcon fontSize='large' />,
        to: '/admin/products/delete',
    },
];

const AdminDashboardPage = () => {
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
            <Container maxWidth='lg'>
                <Box sx={{ mb: 5 }}>
                    <Typography
                        variant='overline'
                        sx={{
                            color: 'rgba(17,24,39,0.56)',
                            letterSpacing: '0.28rem',
                        }}
                    >
                        ADMIN CONTROL
                    </Typography>

                    <Typography
                        variant='h3'
                        sx={{
                            mt: 1,
                            mb: 1,
                            color: '#111827',
                            fontWeight: 300,
                            letterSpacing: '-0.03em',
                        }}
                    >
                        Dashboard
                    </Typography>

                    <Typography
                        sx={{
                            maxWidth: 720,
                            color: 'rgba(17,24,39,0.72)',
                            fontSize: '1rem',
                            lineHeight: 1.8,
                        }}
                    >
                        Manage inventory through a clean admin workspace designed to match the premium visual language of the store.
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {cards.map((card) => (
                        <Grid item xs={12} md={4} key={card.title}>
                            <Paper
                                component={Link}
                                to={card.to}
                                elevation={0}
                                sx={{
                                    display: 'block',
                                    p: 3,
                                    minHeight: 230,
                                    textDecoration: 'none',
                                    color: '#111827',
                                    borderRadius: '28px',
                                    background: 'rgba(255,255,255,0.72)',
                                    backdropFilter: 'blur(18px) saturate(140%)',
                                    border: '1px solid rgba(255,255,255,0.6)',
                                    boxShadow: '0 24px 60px rgba(15,23,42,0.08)',
                                    transition: 'transform 0.28s ease, box-shadow 0.28s ease',
                                    '&:hover': {
                                        transform: 'translateY(-6px)',
                                        boxShadow: '0 32px 70px rgba(15,23,42,0.12)',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: '18px',
                                        display: 'grid',
                                        placeItems: 'center',
                                        mb: 3,
                                        background: 'rgba(99,102,241,0.10)',
                                        color: '#4f46e5',
                                    }}
                                >
                                    {card.icon}
                                </Box>

                                <Typography variant='h5' sx={{ mb: 1.5, fontWeight: 400 }}>
                                    {card.title}
                                </Typography>

                                <Typography sx={{ color: 'rgba(17,24,39,0.68)', lineHeight: 1.8 }}>
                                    {card.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default AdminDashboardPage;