import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import backImg from '../assets/construction.jpg';

const Construction: FC = () => {
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: 'calc(100vh - 80px)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                 pt: { xs: '100px', md: '120px' },
                px: 2,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '420px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    component="img"
                    src={backImg}
                    alt="Under construction"
                    sx={{
                        width: '100%',
                        maxWidth: { xs: '260px', sm: '300px', md: '340px' },
                        height: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                        mb: 2.5,
                        filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.08))',
                        opacity: 0.96,
                    }}
                />

                <Typography
                    sx={{
                        fontSize: { xs: '1.6rem', md: '2rem' },
                        fontWeight: 700,
                        textAlign: 'center',
                        color: 'rgba(25, 32, 45, 0.88)',
                        letterSpacing: '0.04em',
                        lineHeight: 1.1,
                    }}
                >
                    Under Construction
                </Typography>

                <Typography
                    sx={{
                        mt: 1,
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        textAlign: 'center',
                        color: 'rgba(25, 32, 45, 0.55)',
                        maxWidth: '320px',
                    }}
                >
                    This page will be available soon.
                </Typography>
            </Box>
        </Box>
    );
};

export default Construction;