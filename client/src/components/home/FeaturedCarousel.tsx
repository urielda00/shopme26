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
        <Box sx={{ 
            // Restored original background
            background: 'linear-gradient(250deg, #0b0b0d 50%, #e0e0e3 50%)',
            position: 'relative', 
            overflow: 'hidden', 
            // Added maxWidth and centering to shrink the overall section
            maxWidth: '1300px',
            mx: 'auto',
            px: { xs: 2, md: 6 },
            py: 2 
        }}>
            {/* Main Glass Container wrapper */}
            <Box sx={{
                borderRadius: '24px',
                background: 'linear-gradient(220deg, rgba(11, 11, 13, 0.9) 0%, rgba(15, 14, 12, 0.85) 100%)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                my: 2 // Reduced vertical margin
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    width: '100%', 
                    transition: 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)', 
                    transform: `translateX(-${index * 100}%)` 
                }}>
                    {items.map((item, i) => (
                        <Box key={i} sx={{ 
                            minWidth: '100%', 
                            display: 'flex', 
                            flexDirection: { xs: 'column-reverse', md: 'row' }, 
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            // Reduced vertical padding
                            py: { xs: 3, md: 2 }
                        }}>
                            {/* Text Area */}
                            <Box sx={{ flex: 1, textAlign: 'left', p: { xs: 2, md: 6 }, zIndex: 2 }}>
                                <Typography variant="overline" sx={{ color: '#d4c4b2', opacity: 0.7, letterSpacing: '4px' }}>
                                    New Arrival
                                </Typography>
                                <Typography 
                                    variant="h2" 
                                    sx={{ 
                                        color: '#f8f0e0', 
                                        fontWeight: 200, 
                                        // Slightly smaller font size
                                        fontSize: { xs: '2rem', md: '3.5rem' }, 
                                        mb: 2, mt: 1 
                                    }}
                                >
                                    {item.h1}
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: 'rgba(212, 196, 178, 0.6)', 
                                        fontWeight: 300, 
                                        mb: 3, maxWidth: '350px', lineHeight: 1.6 
                                    }}
                                >
                                    Experience the peak of mobile engineering with a sleek design and unmatched power.
                                </Typography>
                            </Box>
                            
                            {/* Image Area */}
                            <Box sx={{ 
                                flex: 1, 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                // Reduced heights
                                minHeight: { xs: '250px', md: '420px' } 
                            }}>
                                <Box 
                                    component="img" 
                                    src={item.src} 
                                    sx={{ 
                                        width: { xs: '60%', md: '75%' }, 
                                        maxHeight: '400px', // Reduced from 500px
                                        objectFit: 'contain', 
                                        borderRadius: '24px',
                                        filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.8))' 
                                    }} 
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Navigation Controls */}
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
                        color: '#fff', 
                        border: '1px solid #a48c68', 
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        '&:hover': { bgcolor: 'rgba(212, 196, 178, 0.1)', borderColor: '#d4c4b2' }
                    }}
                >
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton 
                    onClick={next} 
                    sx={{ 
                        color: '#fff', 
                        border: '1px solid #a48c68', 
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        '&:hover': { bgcolor: 'rgba(212, 196, 178, 0.1)', borderColor: '#d4c4b2' }
                    }}
                >
                    <ChevronRightIcon />
                </IconButton>
            </Stack>
        </Box>
    );
};

export default FeaturedCarousel;