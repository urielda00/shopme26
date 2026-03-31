import { FC } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backHero from '../../assets/Home/background.jpg';

const HeroSection: FC = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundImage: `url(${backHero})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `
                        linear-gradient(
                            180deg,
                            rgba(248,250,252,0.26) 0%,
                            rgba(238,242,247,0.18) 18%,
                            rgba(15,23,42,0.22) 55%,
                            rgba(15,23,42,0.52) 100%
                        )
                    `
                }}
            />

            <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                sx={{
                    textAlign: 'center',
                    color: 'white',
                    zIndex: 2,
                    px: 3
                }}
            >
                <Typography
    variant="overline"
    sx={{
        letterSpacing: 6,
        color: 'rgba(15,23,42,0.85)',
        fontWeight: 600,
        textShadow: '0 2px 8px rgba(255,255,255,0.4)'
    }}
>
    The Future of Technology
</Typography>

                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '2.5rem', md: '4rem' },
                        fontWeight: 200,
                        letterSpacing: -1,
                        mt: 1,
                        mb: 2,
                        color: '#f8fafc',
                        textShadow: '0 10px 30px rgba(15,23,42,0.18)'
                    }}
                >
                    Next-Gen Tech
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        mb: 6,
                        fontWeight: 300,
                        opacity: 1,
                        color: 'rgba(34, 26, 26, 0.82)',
                        maxWidth: '600px',
                        fontweight: 700,
                        mx: 'auto',
                        fontSize: '1rem',
                        textShadow: '0 10px 30px rgba(15,23,42,0.18)'
                    }}
                >
                    Seamless integration of art and performance. Designed for those who demand excellence.
                </Typography>

                <Button
                    component={Link}
                    to="/productsList"
                    variant="outlined"
                    sx={{
                        color: '#ffffff',
                        borderColor: 'rgba(255,255,255,0.42)',
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        px: 5,
                        py: 1.5,
                        borderRadius: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        transition: '0.3s',
                        '&:hover': {
                            borderColor: 'rgba(255,255,255,0.72)',
                            bgcolor: 'rgba(255,255,255,0.14)',
                            transform: 'translateY(-3px)'
                        }
                    }}
                >
                    Explore Collection
                </Button>
            </Box>
        </Box>
    );
};

export default HeroSection;