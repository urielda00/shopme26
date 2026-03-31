import React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { authSuccessAlertStyle } from '../../styles/authStyles';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const RegisterSuccess: React.FC = () => {
    return (
        <Stack spacing={2} sx={authSuccessAlertStyle}>
            <Alert severity='success' sx={{ width: '100%', borderRadius: '14px' }}>
                Registration successful! Welcome aboard!
            </Alert>
        </Stack>
    );
};

export default RegisterSuccess;