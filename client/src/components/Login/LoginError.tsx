import React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setLoginError } from '../../features/userSlice'; // Changed from errorLogged
import { authFloatingAlertStyle } from '../../styles/authStyles';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const LoginError: React.FC = () => {
    const dispatch = useAppDispatch();
    // Accessing loginError from the user state
    const { loginError } = useAppSelector((state) => state.user);

    React.useEffect(() => {
        if (loginError) {
            const timer = setTimeout(() => {
                // Using setLoginError with an empty string to clear the message
                dispatch(setLoginError('')); 
            }, 7000);

            return () => clearTimeout(timer);
        }
    }, [loginError, dispatch]);

    if (!loginError) return null;

    return (
        <Stack spacing={2} sx={authFloatingAlertStyle}>
            <Alert severity='error' sx={{ width: '100%', borderRadius: '14px' }}>
                {loginError}
            </Alert>
        </Stack>
    );
};

export default LoginError;