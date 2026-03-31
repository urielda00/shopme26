import { FC, useState } from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { items } from './CarouselData';

const FeaturedCarousel: FC = () => {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((prev) => (prev + 1) % items.length);
    const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

    return (
        <Box
            sx={{
                background: 'linear-gradient(250deg, #edf2f8 50%, #f7f9fc 50%)',
                position: 'relative',
                overflow: 'hidden',
                maxWidth: '1300px',
                mx: 'auto',
                px: { xs: 2, md: 6 },
                py: 2
            }}
        >
            <Box
                sx={{
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.36) 100%)',
                    backdropFilter: 'blur(30px) saturate(170%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(170%)',
                    border: '1px solid rgba(255,255,255,0.65)',
                    boxShadow: '0 28px 60px rgba(15,23,42,0.10)',
                    my: 2
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        transition: 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
                        transform: `translateX(-${index * 100}%)`
                    }}
                >
                    {items.map((item, i) => (
                        <Box
                            key={i}
                            sx={{
                                minWidth: '100%',
                                display: 'flex',
                                flexDirection: { xs: 'column-reverse', md: 'row' },
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                py: { xs: 3, md: 2 }
                            }}
                        >
                            <Box sx={{ flex: 1, textAlign: 'left', p: { xs: 2, md: 6 }, zIndex: 2 }}>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: 'rgba(79,70,229,0.72)',
                                        letterSpacing: '4px',
                                        fontWeight: 600
                                    }}
                                >
                                    New Arrival
                                </Typography>

                                <Typography
                                    variant="h2"
                                    sx={{
                                        color: '#111827',
                                        fontWeight: 200,
                                        fontSize: { xs: '2rem', md: '3.5rem' },
                                        mb: 2,
                                        mt: 1
                                    }}
                                >
                                    {item.h1}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'rgba(17,24,39,0.62)',
                                        fontWeight: 300,
                                        mb: 3,
                                        maxWidth: '350px',
                                        lineHeight: 1.6
                                    }}
                                >
                                    Experience the peak of mobile engineering with a sleek design and unmatched power.
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: { xs: '250px', md: '420px' }
                                }}
                            >
                                <Box
                                    component="img"
                                    src={item.src}
                                    sx={{
                                        width: { xs: '60%', md: '75%' },
                                        maxHeight: '400px',
                                        objectFit: 'contain',
                                        borderRadius: '24px',
                                        filter: 'drop-shadow(0 24px 50px rgba(99,102,241,0.18))'
                                    }}
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Stack
                direction="row"
                spacing={2}
                sx={{
                    position: 'absolute',
                    bottom: { xs: 15, md: 35 },
                    right: { xs: '50%', md: 80 },
                    transform: { xs: 'translateX(50%)', md: 'none' },
                    zIndex: 10
                }}
            >
                <IconButton
                    onClick={prev}
                    sx={{
                        color: '#111827',
                        border: '1px solid rgba(99,102,241,0.24)',
                        background: 'rgba(255,255,255,0.46)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.72)',
                            borderColor: 'rgba(99,102,241,0.46)'
                        }
                    }}
                >
                    <ChevronLeftIcon />
                </IconButton>

                <IconButton
                    onClick={next}
                    sx={{
                        color: '#111827',
                        border: '1px solid rgba(99,102,241,0.24)',
                        background: 'rgba(255,255,255,0.46)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.72)',
                            borderColor: 'rgba(99,102,241,0.46)'
                        }
                    }}
                >
                    <ChevronRightIcon />
                </IconButton>
            </Stack>
        </Box>
    );
};

export default FeaturedCarousel;