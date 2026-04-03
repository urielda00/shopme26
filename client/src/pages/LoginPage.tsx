import React from 'react';
import { Box } from '@mui/material';
import LoginForm from '../components/Login/LoginForm';
import { authPageBackgroundStyle } from '../styles/authStyles';
import { useTitle } from '../hooks/useTitle';   
const LoginPage: React.FC = () => {
	useTitle('Login');
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