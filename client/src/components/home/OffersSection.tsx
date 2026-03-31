import { FC } from 'react';
import { Box, Typography, Card, CardActionArea, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import clickableData from '../../utils/data/clickAbleData';
import bigPhoto from '../../assets/Home/6nd/bigPhoto1.jpg';

const OffersSection: FC = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(110deg, #f7f9fc 55%, #e9eef6 55%)',
                pt: 19,
                pb: 10,
                width: '100%'
            }}
        >
            <Box
                sx={{
                    px: { xs: 2, md: 4 },
                    maxWidth: '1100px',
                    mx: 'auto'
                }}
            >
                <Box
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: '24px',
                        bgcolor: 'rgba(255,255,255,0.46)',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.34) 100%)',
                        backdropFilter: 'blur(28px) saturate(165%)',
                        WebkitBackdropFilter: 'blur(28px) saturate(165%)',
                        border: '1px solid rgba(255,255,255,0.62)',
                        boxShadow: '0 24px 60px rgba(15,23,42,0.10)'
                    }}
                >
                    <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: 'left' }}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: 'rgba(17,24,39,0.62)',
                                fontWeight: 500,
                                letterSpacing: '2px',
                                fontSize: '0.75rem'
                            }}
                        >
                            Limited Time
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 300,
                                letterSpacing: '-0.5px',
                                color: '#111827',
                                fontSize: { xs: '1.6rem', md: '2.4rem' }
                            }}
                        >
                            Exclusive Offers
                        </Typography>

                        <Box
                            sx={{
                                width: '40px',
                                height: '1px',
                                background: 'linear-gradient(90deg, #6366f1, transparent)',
                                mt: 1.5
                            }}
                        />
                    </Box>

                    <Grid container spacing={2} sx={{ height: { md: '340px' } }}>
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Grid container spacing={2} sx={{ height: '100%' }}>
                                {clickableData.slice(0, 4).map((item: any, i: number) => (
                                    <Grid size={{ xs: 6, sm: 6 }} key={i}>
                                        <Card
                                            elevation={0}
                                           sx={{
    borderRadius: '12px',
    bgcolor: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.6)',
    height: '100%',
    boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 16px 32px rgba(15,23,42,0.10)',
    }
}}
                                        >
                                            <CardActionArea
                                                component={Link}
                                                to={item.to}
                                                sx={{ height: '100%', p: 2, display: 'flex', justifyContent: 'center' }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={item.src}
                                                    sx={{
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

                        <Grid size={{ xs: 12, md: 5 }}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    borderRadius: '12px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    minHeight: { xs: '200px', md: '100%' },
                                    border: '1px solid rgba(255,255,255,0.55)',
                                    boxShadow: '0 16px 36px rgba(15,23,42,0.08)'
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

                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            background:
                                                'linear-gradient(to top, rgba(15,23,42,0.66) 0%, rgba(15,23,42,0.22) 50%, rgba(255,255,255,0.04) 100%)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-end',
                                            p: { xs: 2.5, md: 3 }
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            fontWeight="300"
                                            sx={{
                                                color: '#ffffff',
                                                fontSize: { xs: '1.3rem', md: '1.7rem' },
                                                mb: 0.5
                                            }}
                                        >
                                            Premium Selection
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: 'rgba(255,255,255,0.76)',
                                                fontWeight: 300,
                                                fontSize: '0.85rem'
                                            }}
                                        >
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