import { FC } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const OrderCompleted: FC = () => {
    return (
        <Box sx={{ 
            textAlign: 'center', 
            py: 6, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 2 
        }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
            <Typography variant="h4" fontWeight="bold">
                We Received Your Order!
            </Typography>
            <Typography variant="body1" color="text.secondary">
                An order confirmation has been sent to your email.
            </Typography>
            <Button 
                component={Link} 
                to="/" 
                variant="outlined" 
                sx={{ mt: 4, color: 'var(--black)', borderColor: 'var(--black)' }}
            >
                Return to Home Page
            </Button>
        </Box>
    );
};

export default OrderCompleted;