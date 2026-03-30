import { FC, memo } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Copyright = memo(() => (
    <Box sx={{ color: 'text.secondary', textAlign: 'center', mt: 1 }}>
        {'Copyright © '}
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            SHOPME
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Box>
));

const Footer: FC = () => {
    return (
        <Box 
            component="footer" 
            sx={{ 
                mt: 'auto', 
                py: 4, 
                bgcolor: 'var(--white)', 
                textAlign: 'center', 
                borderTop: '1px solid #eee' 
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1">Here is the sticky footer</Typography>
                <Copyright />
            </Container>
        </Box>
    );
};

export default Footer;