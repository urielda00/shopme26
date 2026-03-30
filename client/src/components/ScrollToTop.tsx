import { FC, useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';

const ScrollToTop: FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!visible) return null;

    return (
        <IconButton 
            onClick={scrollToTop}
            sx={{
                position: 'fixed',
                bottom: 16,
                left: 30, // Kept your original positioning
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                color: 'black',
                boxShadow: 2,
                zIndex: 1000,
                '&:hover': { bgcolor: 'white' }
            }}
        >
            <KeyboardDoubleArrowUpOutlinedIcon fontSize="large" />
        </IconButton>
    );
};

export default ScrollToTop;