import React from 'react';
import * as Mui from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { authDialogPaperStyle } from '../../styles/authStyles';

interface DialogProps {
    open: boolean;
    onClose: () => void;
}

const passwordRules = [
    'Password must have at least 1 UpperCase.',
    'Password must have at least 1 LowerCase.',
    'Password must have at least 1 Digit.',
    'Password must have at least 4 Characters.',
];

const PasswordDialog: React.FC<DialogProps> = ({ open, onClose }) => {
    return (
        <Mui.Dialog
            open={open}
            onClose={onClose}
            PaperProps={{ sx: authDialogPaperStyle }}
        >
            <Mui.DialogTitle sx={{ pb: 1, fontWeight: 700, color: '#2a3954' }}>
                To set a strong password, follow these steps:
            </Mui.DialogTitle>

            <Mui.DialogContent sx={{ pt: 1 }}>
                <Mui.Stack spacing={1.4}>
                    {passwordRules.map((rule) => (
                        <Mui.Stack
                            key={rule}
                            direction='row'
                            spacing={1.25}
                            alignItems='center'
                            sx={{
                                p: 1.2,
                                borderRadius: '14px',
                                backgroundColor: 'rgba(245,248,253,0.92)',
                            }}
                        >
                            <CheckCircleOutlineRoundedIcon sx={{ color: '#7184b7' }} />
                            <Mui.Typography sx={{ color: '#34425f' }}>{rule}</Mui.Typography>
                        </Mui.Stack>
                    ))}
                </Mui.Stack>
            </Mui.DialogContent>

            <Mui.DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Mui.Button
                    onClick={onClose}
                    variant='contained'
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        background: 'linear-gradient(135deg, #6173a5 0%, #8295ca 100%)',
                    }}
                >
                    Close
                </Mui.Button>
            </Mui.DialogActions>
        </Mui.Dialog>
    );
};

export default PasswordDialog;