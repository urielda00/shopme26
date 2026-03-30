import { FC, useState } from 'react';
import { Container, Box, Avatar, Typography, TextField, Button, IconButton, InputAdornment, Grid2 as Grid } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useResetPass } from '../../hooks/useResetPass';
import { passwordRegex } from '../../utils/regexUtils';

const ResetForm: FC = () => {
    const { register, handleSubmit, errors, isValid, isDirty, onSubmit, loading, showPassword, setShowPassword, passwordValue } = useResetPass();
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <Container maxWidth="xs" sx={{ p: 4, bgcolor: 'white', borderRadius: 3, boxShadow: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'error.main' }}><LockResetIcon /></Avatar>
                <Typography variant="h5" sx={{ mb: 3 }}>Set New Password</Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="New Password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', {
                                    required: 'Password is required',
                                    pattern: {
                                        value: passwordRegex.digit,
                                        message: 'Password must contain at least one digit'
                                    },
                                    minLength: { value: 4, message: 'Minimum 4 characters' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: (value) => value === passwordValue || 'Passwords do not match'
                                })}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                    {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={!isDirty || !isValid || loading}
                        sx={{ mt: 3, height: '45px', bgcolor: 'var(--cartBtnDarkGrey)', '&:hover': { bgcolor: 'black' } }}
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ResetForm;