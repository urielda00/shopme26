import React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { authFloatingAlertStyle } from '../../styles/authStyles';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

interface RegisterErrorProps {
    errors: string | string[] | null;
}

const RegisterError: React.FC<RegisterErrorProps> = ({ errors }) => {
    if (!errors || (Array.isArray(errors) && errors.length === 0)) return null;

    return (
        <Stack spacing={1.25} sx={authFloatingAlertStyle}>
            {Array.isArray(errors) ? (
                errors.map((err, index) => (
                    <Alert key={index} severity='error' sx={{ width: '100%', borderRadius: '14px' }}>
                        {err}
                    </Alert>
                ))
            ) : (
                <Alert severity='error' sx={{ width: '100%', borderRadius: '14px' }}>
                    {errors}
                </Alert>
            )}
        </Stack>
    );
};

export default RegisterError;