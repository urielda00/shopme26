import { SxProps, Theme } from '@mui/material';

export const pageContainerSx: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: { xs: 'flex-start', md: 'center' },
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f5f7fb 0%, #eef1f7 40%, #f9fafc 100%)',
    minHeight: '100vh',
    height: 'auto',
    overflowY: 'auto',
    overflowX: 'hidden',
    pt: { xs: '96px', md: '88px' },
    pb: { xs: 4, md: 2 },
    px: { xs: 2, md: 4 },
    color: '#1d1d1f',
    boxSizing: 'border-box'
};


export const cartContentWrapperSx: SxProps<Theme> = {
    bgcolor: 'rgba(255, 255, 255, 0.42)',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.46) 0%, rgba(255,255,255,0.30) 100%)',
    backdropFilter: 'blur(30px) saturate(165%)',
    WebkitBackdropFilter: 'blur(30px) saturate(165%)',
    width: '100%',
    maxWidth: 'lg',
    borderRadius: 4,
    border: '1px solid rgba(255, 255, 255, 0.45)',
    boxShadow: '0 20px 60px rgba(31, 38, 135, 0.10)',
    p: { xs: 3, md: 5 },
    display: 'flex',
    flexDirection: 'column',
    height: { xs: 'auto', lg: 'calc(100vh - 120px)' },
    overflow: 'hidden',
    boxSizing: 'border-box'
};

export const summaryPaperSx: SxProps<Theme> = {
    p: { xs: 3, md: 4 },
    bgcolor: 'rgba(255,255,255,0.36)',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.24) 100%)',
    color: '#1d1d1f',
    borderRadius: 4,
    position: { xs: 'static', lg: 'sticky' },
    mt: 0,
    mr: 0,
    top: { lg: '96px' },
    border: '1px solid rgba(255,255,255,0.45)',
    boxShadow: '0 20px 40px rgba(31,38,135,0.08)',
    width: '100%',
    boxSizing: 'border-box'
};

export const cartItemSx: SxProps<Theme> = {
    p: { xs: 1.5, sm: 2.5 },
    mb: 2,
    bgcolor: 'rgba(255,255,255,0.34)',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.22) 100%)',
    borderRadius: 3,
    border: '1px solid rgba(255,255,255,0.42)',
    boxShadow: '0 10px 30px rgba(31,38,135,0.06)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'left',
    transition: 'all 0.3s ease',
    '&:hover': {
        bgcolor: 'rgba(255,255,255,0.42)',
        border: '1px solid rgba(255,255,255,0.55)',
        transform: { xs: 'none', sm: 'translateY(-2px)' }
    }
};

export const quantityStackSx: SxProps<Theme> = {
    bgcolor: 'rgba(0,0,0,0.03)',
    borderRadius: 2,
    p: 0.5,
    border: '1px solid rgba(0,0,0,0.04)',
    width: 'fit-content'
};

export const quantityBtnSx: SxProps<Theme> = {
    p: 0.8,
    color: '#1d1d1f',
    borderRadius: 1.5,
    '&:hover': {
        bgcolor: 'rgba(0,0,0,0.05)'
    },
    '&.Mui-disabled': {
        color: 'rgba(0,0,0,0.2)'
    }
};


export const summaryTextFieldSx: SxProps<Theme> = {
    input: { color: '#1d1d1f' },
    fieldset: {
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: '12px'
    },
    '&:hover fieldset': {
        borderColor: 'rgba(0,0,0,0.2) !important'
    },
    '&.Mui-focused fieldset': {
        borderColor: '#6366f1 !important'
    }
};

export const checkoutBtnSx: SxProps<Theme> = {
    mt: 1,
    height: '46px',
    color: '#fff',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '0.9rem',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 8px 20px rgba(99,102,241,0.25)'
    }
};

export const registerBtnSx: SxProps<Theme> = {
    ...checkoutBtnSx,
    background: 'transparent',
    color: '#1d1d1f',
    border: '1px solid rgba(0,0,0,0.2)',
    '&:hover': {
        bgcolor: 'rgba(0,0,0,0.04)',
        transform: 'scale(1.02)'
    }
};

export const secondaryInfoBtnSx: SxProps<Theme> = {
    color: '#86868b', 
    borderRadius: 2,
    textTransform: 'none',
    fontWeight: 500,
    transition: 'color 0.3s ease',
    '&:hover': {
        bgcolor: 'transparent',
        color: '#1d1d1f' // Updated hover color
    }
};