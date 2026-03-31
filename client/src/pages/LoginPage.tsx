import React from 'react';
import { Box } from '@mui/material';
import LoginForm from '../components/Login/LoginForm';
import { authPageBackgroundStyle } from '../styles/authStyles';

const LoginPage: React.FC = () => {
    return (
        <Box
            sx={{
                ...authPageBackgroundStyle,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}
        >
            <Box sx={{ width: '100%', maxWidth: '560px' }}>
                <LoginForm />
            </Box>
        </Box>
    );
};

export default LoginPage;