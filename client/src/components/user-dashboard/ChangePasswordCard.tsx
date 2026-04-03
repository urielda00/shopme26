import { useMemo, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

import PasswordDialog from '../Register/PasswordDialog';
import { passwordRegex } from '../../utils/regexUtils';

interface PasswordFormState {
    insertPrePassword: string;
    password: string;
    verifyPass: string;
}

interface ChangePasswordCardProps {
    form: PasswordFormState;
    loading: boolean;
    successMessage: string;
    errorMessage: string;
    glassCardSx: object;
    sectionTitleSx: object;
    inputSx: object;
    onChange: (field: keyof PasswordFormState, value: string) => void;
    onSubmit: () => void;
}

const feedbackAlertSx = {
    borderRadius: '16px',
    boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
};

const passwordHintCardSx = {
    p: 1.4,
    borderRadius: 3,
    border: '1px solid rgba(17,24,39,0.08)',
    background: 'rgba(255,255,255,0.52)',
};

const ChangePasswordCard = ({
    form,
    loading,
    successMessage,
    errorMessage,
    glassCardSx,
    sectionTitleSx,
    inputSx,
    onChange,
    onSubmit,
}: ChangePasswordCardProps) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);
    const [openPassHelp, setOpenPassHelp] = useState(false);

    const passwordChecks = useMemo(() => {
        return [
            {
                key: 'upper',
                label: 'At least 1 uppercase letter',
                valid: passwordRegex.upperCase.test(form.password),
            },
            {
                key: 'lower',
                label: 'At least 1 lowercase letter',
                valid: passwordRegex.lowerCase.test(form.password),
            },
            {
                key: 'digit',
                label: 'At least 1 digit',
                valid: passwordRegex.digit.test(form.password),
            },
            {
                key: 'min',
                label: 'At least 4 characters',
                valid: passwordRegex.min4.test(form.password),
            },
        ];
    }, [form.password]);

    const isPasswordStrong = useMemo(() => {
        return passwordChecks.every((rule) => rule.valid);
    }, [passwordChecks]);

    const confirmError = useMemo(() => {
        if (!form.verifyPass) return '';
        return form.verifyPass === form.password ? '' : 'Passwords do not match';
    }, [form.password, form.verifyPass]);

    const currentPasswordError = useMemo(() => {
        if (!form.insertPrePassword) return '';
        return form.insertPrePassword.trim() ? '' : 'Current password is required';
    }, [form.insertPrePassword]);

    const newPasswordError = useMemo(() => {
        if (!form.password) return '';
        return isPasswordStrong ? '' : 'Password does not meet all requirements';
    }, [form.password, isPasswordStrong]);

    return (
        <Card sx={glassCardSx}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 2 }}
                >
                    <Typography sx={{ ...sectionTitleSx, mb: 0 }}>
                        Change Password
                    </Typography>

                    <IconButton
                        aria-label="password rules"
                        onClick={() => setOpenPassHelp(true)}
                        sx={{
                            color: '#5b6b91',
                            border: '1px solid rgba(17,24,39,0.08)',
                            background: 'rgba(255,255,255,0.55)',
                        }}
                    >
                        <HelpOutlineIcon />
                    </IconButton>
                </Stack>

                <Typography
                    sx={{
                        mb: 2,
                        color: 'rgba(17,24,39,0.64)',
                        fontSize: '0.93rem',
                        lineHeight: 1.6,
                    }}
                >
                    Your new password should follow the same security rules used during registration.
                </Typography>

                <PasswordDialog open={openPassHelp} onClose={() => setOpenPassHelp(false)} />

                <Stack spacing={2}>
                    {(errorMessage || successMessage) && (
                        <Stack spacing={1}>
                            {errorMessage ? (
                                <Alert severity="error" sx={feedbackAlertSx}>
                                    {errorMessage}
                                </Alert>
                            ) : null}

                            {successMessage ? (
                                <Alert severity="success" sx={feedbackAlertSx}>
                                    {successMessage}
                                </Alert>
                            ) : null}
                        </Stack>
                    )}

                    <TextField
                        label="Current password"
                        type={showCurrentPassword ? 'text' : 'password'}
                        fullWidth
                        value={form.insertPrePassword}
                        onChange={(e) => onChange('insertPrePassword', e.target.value)}
                        sx={inputSx}
                        error={Boolean(currentPasswordError)}
                        helperText={currentPasswordError || ' '}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                                    >
                                        {showCurrentPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="New password"
                        type={showNewPassword ? 'text' : 'password'}
                        fullWidth
                        value={form.password}
                        onChange={(e) => onChange('password', e.target.value)}
                        sx={inputSx}
                        error={Boolean(newPasswordError)}
                        helperText={form.password ? newPasswordError || 'Strong password' : ' '}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={() => setShowNewPassword((prev) => !prev)}
                                    >
                                        {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Box sx={passwordHintCardSx}>
                        <Stack spacing={1}>
                            {passwordChecks.map((rule) => (
                                <Stack
                                    key={rule.key}
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    {rule.valid ? (
                                        <CheckCircleOutlineRoundedIcon
                                            sx={{ color: '#16a34a', fontSize: 19 }}
                                        />
                                    ) : (
                                        <RadioButtonUncheckedRoundedIcon
                                            sx={{ color: 'rgba(17,24,39,0.30)', fontSize: 19 }}
                                        />
                                    )}

                                    <Typography
                                        sx={{
                                            fontSize: '0.92rem',
                                            color: rule.valid ? '#166534' : 'rgba(17,24,39,0.68)',
                                        }}
                                    >
                                        {rule.label}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Box>

                    <TextField
                        label="Confirm new password"
                        type={showVerifyPassword ? 'text' : 'password'}
                        fullWidth
                        value={form.verifyPass}
                        onChange={(e) => onChange('verifyPass', e.target.value)}
                        sx={inputSx}
                        error={Boolean(confirmError)}
                        helperText={confirmError || ' '}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={() => setShowVerifyPassword((prev) => !prev)}
                                    >
                                        {showVerifyPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        variant="contained"
                        onClick={onSubmit}
                        disabled={loading}
                        sx={{
                            mt: 1,
                            height: 48,
                            borderRadius: 999,
                            textTransform: 'none',
                            boxShadow: 'none',
                            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                            '&:hover': {
                                boxShadow: 'none',
                                background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                            },
                        }}
                    >
                        {loading ? 'Updating...' : 'Update password'}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ChangePasswordCard;