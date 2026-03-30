import { FC } from 'react';
import { Box, Typography, Card, CardActionArea, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import clickableData from '../../utils/data/clickAbleData';
import bigPhoto from '../../assets/Home/6nd/bigPhoto1.jpg';

const OffersSection: FC = () => {
    return (
        <Box sx={{ 
            background: 'linear-gradient(110deg, #0f0f11 55%, #d1d1d6 55%)',
            pt: 19, 
            pb: 10,
            width: '100%'
        }}>
            <Box sx={{ 
                px: { xs: 2, md: 4 }, 
                maxWidth: '1100px',
                mx: 'auto'
            }}>
                {/* Main Glass Container */}
                <Box sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: '24px',
                    bgcolor: 'rgba(20, 20, 23, 0.75)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                }}>
                    {/* Header */}
                    <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: 'left' }}>
                        <Typography 
                            variant="overline" 
                            sx={{ color: '#ffffff', opacity: 0.6, fontWeight: 400, letterSpacing: '2px', fontSize: '0.75rem' }}
                        >
                            Limited Time
                        </Typography>
                        <Typography 
                            variant="h3" 
                            sx={{ 
                                fontWeight: 300, 
                                letterSpacing: '-0.5px',
                                color: '#fff',
                                fontSize: { xs: '1.6rem', md: '2.4rem' }
                            }}
                        >
                            Exclusive Offers
                        </Typography>
                        <Box sx={{ 
                            width: '40px', 
                            height: '1px', 
                            background: 'linear-gradient(90deg, #fff, transparent)', 
                            mt: 1.5 
                        }} />
                    </Box>

                    {/* Grid */}
                    <Grid container spacing={2} sx={{ height: { md: '340px' } }}>
                        {/* Left side: Small cards */}
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Grid container spacing={2} sx={{ height: '100%' }}>
                                {clickableData.slice(0, 4).map((item: any, i: number) => (
                                    <Grid size={{ xs: 6, sm: 6 }} key={i}>
                                        <Card 
                                            elevation={0} 
                                            sx={{ 
                                                borderRadius: '12px', 
                                                bgcolor: '#f8f8f8', 
                                                border: '1px solid rgba(255, 255, 255, 0.9)',
                                                height: '100%',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
                                                '&:hover': { 
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                                                } 
                                            }}
                                        >
                                            <CardActionArea component={Link} to={item.to} sx={{ height: '100%', p: 2, display: 'flex', justifyContent: 'center' }}>
                                                <CardMedia 
                                                    component="img" 
                                                    image={item.src} 
                                                    sx={{ 
                                                        // Increased image sizes
                                                        maxHeight: { xs: 85, md: 110 }, 
                                                        width: 'auto',
                                                        objectFit: 'contain',
                                                        transition: 'transform 0.4s ease',
                                                        '&:hover': { transform: 'scale(1.1)' }
                                                    }} 
                                                />
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>

                        {/* Right side: Featured large dark card */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Card 
                                elevation={0} 
                                sx={{ 
                                    height: '100%', 
                                    borderRadius: '12px', 
                                    position: 'relative', 
                                    overflow: 'hidden',
                                    minHeight: { xs: '200px', md: '100%' },
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                <CardActionArea component={Link} to="/productsList?brand=Apple" sx={{ height: '100%' }}>
                                    <CardMedia 
                                        component="img" 
                                        height="100%" 
                                        image={bigPhoto} 
                                        sx={{ 
                                            objectFit: 'cover',
                                            transition: 'transform 1.5s ease',
                                            '&:hover': { transform: 'scale(1.05)' }
                                        }} 
                                    />
                                    {/* Overlay */}
                                    <Box sx={{ 
                                        position: 'absolute', 
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%)', 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        p: { xs: 2.5, md: 3 }
                                    }}>
                                        <Typography variant="h5" fontWeight="300" sx={{ color: '#fff', fontSize: { xs: '1.3rem', md: '1.7rem' }, mb: 0.5 }}>
                                            Premium Selection
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300, fontSize: '0.85rem' }}>
                                            Curated excellence for your digital lifestyle.
                                        </Typography>
                                    </Box>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default OffersSection;