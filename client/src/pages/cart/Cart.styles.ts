import { SxProps, Theme } from '@mui/material';

/**
 * The main page wrapper for the Cart.
 * Combines heights from all previous responsive versions.
 */
export const pageContainerSx: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'center',
    bgcolor: 'var(--containerPinkBackground)',
    minHeight: { xs: '100vh', md: '85vh', lg: '83.4vh' },
    py: 4
};

/**
 * Responsive stack for a single cart item.
 */
export const cartItemSx: SxProps<Theme> = {
    p: 2,
    borderBottom: '1px solid #eee',
    flexDirection: { xs: 'column', sm: 'row' },
    textAlign: { xs: 'center', sm: 'left' }
};

/**
 * The Summary side-card configuration.
 */
export const summaryPaperSx: SxProps<Theme> = {
    p: 3,
    bgcolor: '#f9f9f9',
    borderRadius: 2,
    position: 'sticky',
    top: '20px'
};

/**
 * Reusable checkout button styling.
 */
export const checkoutBtnSx: SxProps<Theme> = {
    mt: 1,
    height: '50px',
    color: 'var(--white)',
    bgcolor: 'var(--cartBtnDarkGrey)',
    '&:hover': { color: 'var(--black)', bgcolor: 'var(--cartBtnBrightGreen)' }
};