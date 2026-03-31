import React, { useState } from 'react';
import {
    Box,
    Avatar,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Divider,
    Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import useLogin from '../../hooks/useLogin';
import LoginError from './LoginError';
import {
    authCardStyle,
    authFormInnerStyle,
    authHeaderIconStyle,
    authLinksRowStyle,
    authPrimaryButtonStyle,
    authTextFieldStyle,
    authTitleStyle,
} from '../../styles/authStyles';
import { IFormValues } from '../../interfaces/auth.interface';

import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type LoginValues = Pick<IFormValues, 'userName' | 'password'>;

const LoginForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        reset,
    } = useForm<LoginValues>({ mode: 'onChange' });

    const { handleLoginSubmit } = useLogin();

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const onSubmit = async (data: LoginValues) => {
        await handleLoginSubmit({ email: data.userName, password: data.password } as any);
        reset();
    };

    return (
        <>
            <LoginError />

            <Box sx={authCardStyle}>
                <Box sx={authFormInnerStyle}>
                    <Avatar sx={authHeaderIconStyle}>
                        <PersonIcon />
                    </Avatar>

                    <Typography component='h1' variant='h4' sx={authTitleStyle}>
                        Sign In
                    </Typography>
                    <Box
                        component='form'
                        noValidate
                        sx={{ width: '100%' }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    label='User Name'
                                    {...register('userName', {
                                        required: 'User Name is required',
                                    })}
                                    error={!!errors.userName}
                                    helperText={errors.userName?.message}
                                    sx={authTextFieldStyle}
                                />
                            </Grid>

                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    label='Password'
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete='current-password'
                                    {...register('password', {
                                        required: 'Password is required',
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    sx={authTextFieldStyle}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={togglePasswordVisibility} edge='end'>
                                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            disabled={!isDirty || !isValid}
                            sx={authPrimaryButtonStyle}
                        >
                            Sign In
                        </Button>

                        <Divider sx={{ my: 2.2, opacity: 0.7 }} />

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent='space-between'
                            spacing={1.2}
                            sx={authLinksRowStyle}
                        >
                            <Link to='/forgetPass'>Forgot password?</Link>
                            <Link to='/register'>Don't have an account? Sign Up</Link>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default LoginForm;