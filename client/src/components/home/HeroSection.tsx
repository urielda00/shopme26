import { FC } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backHero from '../../assets/Home/background.jpg';

const HeroSection: FC = () => {
    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${backHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {/* Soft sophisticated overlay */}
            <Box sx={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 100%)',
            }} />

            <Box 
                component={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                sx={{ textAlign: 'center', color: 'white', zIndex: 2, px: 3 }}
            >
                <Typography variant="overline" sx={{ letterSpacing: 6, opacity: 0.7 }}>
                    The Future of Technology
                </Typography>
                <Typography variant="h1" sx={{ 
                    fontSize: { xs: '2.5rem', md: '4rem' }, 
                    fontWeight: 200, // Thinner weight for luxury
                    letterSpacing: -1,
                    mt: 1, mb: 2 
                }}>
                    Next-Gen Tech
                </Typography>
                <Typography variant="h6" sx={{ mb: 6, fontWeight: 300, opacity: 0.6, maxWidth: '600px', mx: 'auto', fontSize: '1rem' }}>
                    Seamless integration of art and performance. Designed for those who demand excellence.
                </Typography>
                <Button 
                    component={Link} to="/productsList" 
                    variant="outlined" // Outlined is often perceived as more "premium"
                    sx={{ 
                        color: 'white', borderColor: 'rgba(255,255,255,0.3)',
                        px: 5, py: 1.5, borderRadius: '0', // Sharp edges for modern feel
                        textTransform: 'uppercase', letterSpacing: 2,
                        '&:hover': { borderColor: 'white', bgcolor: 'transparent', transform: 'translateY(-3px)' },
                        transition: '0.3s'
                    }}
                >
                    Explore Collection
                </Button>
            </Box>
        </Box>
    );
};

export default HeroSection;