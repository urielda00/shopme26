import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import backImg from '../assets/construction.jpg'; // Fixed Vite import

const Construction: FC = () => {
    return (
        <Box sx={{ width: '100%', height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ 
                height: '60vh', 
                minWidth: '400px', 
                backgroundSize: 'contain', 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'center',
                backgroundImage: `url(${backImg})` 
            }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
                This Page Is Under Construction
            </Typography>
        </Box>
    );
};

export default Construction;