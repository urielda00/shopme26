import React from 'react';
import { Box } from '@mui/material';
import RegisterForm from '../components/Register/RegisterForm';
import {
    authPageBackgroundStyle,
    authSingleColumnWrapStyle,
    registerCardViewportStyle,
    registerCardScrollAreaStyle,
} from '../styles/authStyles';
import { useTitle } from '../hooks/useTitle';
const RegisterPage: React.FC = () => {
	useTitle('Register');
    return (
        <Box sx={authPageBackgroundStyle}>
            <Box sx={authSingleColumnWrapStyle}>
                <Box sx={registerCardViewportStyle}>
                    <Box sx={registerCardScrollAreaStyle}>
                        <RegisterForm />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default RegisterPage;