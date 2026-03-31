import React from 'react';
import { Box } from '@mui/material';
import RegisterForm from '../components/Register/RegisterForm';
import { authPageBackgroundStyle } from '../styles/authStyles';

const RegisterPage: React.FC = () => {
    return (
        <Box
            sx={{
                ...authPageBackgroundStyle,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}
        >
            <Box sx={{ width: '100%', maxWidth: '760px' }}>
                <RegisterForm />
            </Box>
        </Box>
    );
};

export default RegisterPage;