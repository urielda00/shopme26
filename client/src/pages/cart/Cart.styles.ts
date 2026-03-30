import { SxProps, Theme } from '@mui/material';

// The main page wrapper
export const pageContainerSx: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'center',
    bgcolor: 'var(--containerPinkBackground)',
    minHeight: { xs: '100vh', md: '85vh', lg: '83.4vh' }, // Merged from all files
    py: 4
};

// Cart Item Stack
export const cartItemSx: SxProps<Theme> = {
    p: 2,
    borderBottom: '1px solid #eee',
    flexDirection: { xs: 'column', sm: 'row' },
    textAlign: { xs: 'center', sm: 'left' }
};

// Summary Card
export const summaryPaperSx: SxProps<Theme> = {
    p: 3,
    bgcolor: '#f9f9f9',
    borderRadius: 2,
    position: 'sticky',
    top: '20px'
};

// Shared Checkout Button Style
export const checkoutBtnSx: SxProps<Theme> = {
    mt: 1,
    height: '50px',
    color: 'var(--white)',
    bgcolor: 'var(--cartBtnDarkGrey)',
    '&:hover': { color: 'var(--black)', bgcolor: 'var(--cartBtnBrightGreen)' }
};