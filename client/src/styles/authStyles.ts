import { SxProps, Theme } from '@mui/material/styles';

export const authPageBackgroundStyle: SxProps<Theme> = {
    minHeight: '100vh',
    width: '100%',
    pt: { xs: '92px', sm: '102px', md: '110px' }, // מתחת ל-navbar
    pb: { xs: 4, md: 6 },
    px: { xs: 2, sm: 3, md: 4 },
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    background: `
        radial-gradient(circle at top left, rgba(157, 180, 255, 0.18), transparent 30%),
        radial-gradient(circle at top right, rgba(255, 255, 255, 0.65), transparent 25%),
        linear-gradient(180deg, #f6f8fc 0%, #eef2f9 55%, #e9eef7 100%)
    `,
    overflowX: 'hidden',
};

export const authShellStyle: SxProps<Theme> = {
    width: '100%',
    maxWidth: '1200px',
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
    gap: { xs: 2, md: 3 },
    alignItems: 'stretch',
};

export const authHeroPanelStyle: SxProps<Theme> = {
    display: { xs: 'none', md: 'flex' },
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100%',
    p: 4,
    borderRadius: '28px',
    color: '#f8fbff',
    position: 'relative',
    overflow: 'hidden',
    background: `
        linear-gradient(145deg, rgba(34, 48, 74, 0.88), rgba(73, 89, 125, 0.78)),
        radial-gradient(circle at top right, rgba(255,255,255,0.16), transparent 28%)
    `,
    border: '1px solid rgba(255,255,255,0.14)',
    boxShadow: '0 30px 80px rgba(47, 61, 93, 0.22)',
    backdropFilter: 'blur(14px)',
    '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01))',
        pointerEvents: 'none',
    },
};

export const authCardStyle: SxProps<Theme> = {
    width: '100%',
    borderRadius: '28px',
    px: { xs: 2.25, sm: 3.5, md: 4 },
    py: { xs: 3, sm: 3.5, md: 4 },
    background: 'rgba(255,255,255,0.68)',
    border: '1px solid rgba(255,255,255,0.75)',
    boxShadow: '0 24px 70px rgba(77, 92, 130, 0.16)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
};

export const authFormInnerStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

export const authHeaderIconStyle: SxProps<Theme> = {
    width: 58,
    height: 58,
    mb: 1.25,
    color: '#f5f8ff',
    background: 'linear-gradient(135deg, #6677a8 0%, #8da1d4 100%)',
    boxShadow: '0 12px 30px rgba(101, 121, 171, 0.32)',
};

export const authTitleStyle: SxProps<Theme> = {
    fontWeight: 700,
    letterSpacing: 0.4,
    color: '#24324a',
    textAlign: 'center',
};


export const authTextFieldStyle: SxProps<Theme> = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '16px',
        backgroundColor: 'rgba(255,255,255,0.55)',
        transition: 'all 0.2s ease',
        '& fieldset': {
            borderColor: 'rgba(124, 140, 174, 0.22)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(96, 117, 160, 0.45)',
        },
        '&.Mui-focused': {
            backgroundColor: 'rgba(255,255,255,0.82)',
            boxShadow: '0 0 0 4px rgba(126, 149, 206, 0.12)',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#7b8fc2',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(36, 50, 74, 0.72)',
    },
    '& .MuiFormHelperText-root': {
        ml: 0.5,
    },
};

export const authPrimaryButtonStyle: SxProps<Theme> = {
    mt: 3,
    py: 1.35,
    borderRadius: '16px',
    fontWeight: 700,
    letterSpacing: 0.35,
    textTransform: 'none',
    color: '#f8fbff',
    background: 'linear-gradient(135deg, #6173a5 0%, #8295ca 100%)',
    boxShadow: '0 14px 30px rgba(97, 115, 165, 0.28)',
    '&:hover': {
        background: 'linear-gradient(135deg, #566895 0%, #788cc0 100%)',
        boxShadow: '0 16px 34px rgba(97, 115, 165, 0.34)',
    },
    '&.Mui-disabled': {
        color: 'rgba(255,255,255,0.75)',
        background: 'rgba(134, 149, 184, 0.55)',
    },
};

export const authSecondaryButtonStyle: SxProps<Theme> = {
    mt: 1.5,
    mb: 2,
    py: 1.2,
    borderRadius: '16px',
    fontWeight: 700,
    textTransform: 'none',
    color: '#33405f',
    background: 'rgba(255,255,255,0.74)',
    border: '1px solid rgba(118, 134, 170, 0.22)',
    boxShadow: '0 12px 26px rgba(83, 96, 129, 0.08)',
    '&:hover': {
        background: 'rgba(255,255,255,0.9)',
    },
};

export const authLinksRowStyle: SxProps<Theme> = {
    mt: 2,
    width: '100%',
    '& a': {
        color: '#5f73a7',
        textDecoration: 'none',
        fontWeight: 600,
    },
    '& a:hover': {
        color: '#46598d',
        textDecoration: 'underline',
    },
};

export const authFloatingAlertStyle: SxProps<Theme> = {
    position: 'fixed',
    top: { xs: '100px', md: '118px' },
    left: { xs: '16px', md: '24px' },
    zIndex: 1400,
    width: 'min(420px, calc(100vw - 32px))',
};

export const authSuccessAlertStyle: SxProps<Theme> = {
    position: 'fixed',
    top: { xs: '100px', md: '118px' },
    left: { xs: '16px', md: '24px' },
    zIndex: 1400,
    width: 'min(460px, calc(100vw - 32px))',
};

export const recaptchaPlaceholderStyle: SxProps<Theme> = {
    mt: 2.25,
    p: 2,
    borderRadius: '18px',
    border: '1px dashed rgba(104, 121, 161, 0.38)',
    background: 'rgba(244, 247, 252, 0.8)',
    color: 'rgba(43, 58, 89, 0.82)',
};

export const authDialogPaperStyle: SxProps<Theme> = {
    borderRadius: '22px',
    background: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.8)',
    boxShadow: '0 24px 60px rgba(66, 80, 117, 0.18)',
};