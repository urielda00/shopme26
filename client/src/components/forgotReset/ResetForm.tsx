import { FC, useState } from 'react';
import {
	Alert,
	Box,
	Button,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useResetPass } from '../../hooks/useResetPass';
import { passwordRegex } from '../../utils/regexUtils';

const fieldSx = {
	'& .MuiOutlinedInput-root': {
		height: 54,
		borderRadius: '16px',
		background: 'rgba(255,255,255,0.55)',
		backdropFilter: 'blur(8px)',
		transition: 'all 0.2s ease',
		'& fieldset': {
			borderColor: 'rgba(20, 28, 40, 0.08)',
		},
		'&:hover fieldset': {
			borderColor: 'rgba(20, 28, 40, 0.18)',
		},
		'&.Mui-focused fieldset': {
			borderColor: 'rgba(32, 41, 56, 0.38)',
			boxShadow: '0 0 0 3px rgba(80, 97, 122, 0.08)',
		},
	},
	'& .MuiInputLabel-root': {
		color: 'rgba(25, 32, 45, 0.62)',
	},
	'& .MuiInputBase-input': {
		color: 'rgba(17, 24, 39, 0.92)',
	},
	'& .MuiFormHelperText-root': {
		marginLeft: '2px',
		marginTop: '8px',
	},
};

const ResetForm: FC = () => {
	const {
		register,
		handleSubmit,
		errors,
		isValid,
		isDirty,
		onSubmit,
		loading,
		showPassword,
		setShowPassword,
		passwordValue,
		successMessage,
		submitError,
	} = useResetPass();

	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	return (
		<Box
			sx={{
				width: '100%',
				maxWidth: '460px',
				borderRadius: '28px',
				p: { xs: 3, sm: 4 },
				background: 'rgba(255,255,255,0.46)',
				backdropFilter: 'blur(18px)',
				border: '1px solid rgba(255,255,255,0.52)',
				boxShadow: '0 24px 80px rgba(31, 41, 55, 0.10)',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
					mb: 3,
				}}
			>
				<Box
					sx={{
						width: 64,
						height: 64,
						borderRadius: '18px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						mb: 2,
						background:
							'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(234,239,245,0.7) 100%)',
						border: '1px solid rgba(255,255,255,0.75)',
						boxShadow: '0 10px 30px rgba(31, 41, 55, 0.10)',
					}}
				>
					<LockResetIcon sx={{ color: 'rgba(31, 41, 55, 0.82)', fontSize: 28 }} />
				</Box>

				<Typography
					sx={{
						fontSize: { xs: '1.6rem', sm: '1.9rem' },
						fontWeight: 700,
						color: 'rgba(16, 24, 40, 0.92)',
						letterSpacing: '0.01em',
						lineHeight: 1.1,
					}}
				>
					Set New Password
				</Typography>

				<Typography
					sx={{
						mt: 1.2,
						fontSize: '0.97rem',
						color: 'rgba(25, 32, 45, 0.60)',
						maxWidth: '320px',
						lineHeight: 1.6,
					}}
				>
					Choose a strong new password to keep your account secure.
				</Typography>
			</Box>

			<Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					{submitError && (
						<Alert
							severity='error'
							sx={{
								borderRadius: '14px',
								background: 'rgba(255, 239, 239, 0.82)',
								border: '1px solid rgba(244, 67, 54, 0.14)',
							}}
						>
							{submitError}
						</Alert>
					)}

					{successMessage && (
						<Alert
							severity='success'
							sx={{
								borderRadius: '14px',
								background: 'rgba(237, 247, 237, 0.88)',
								border: '1px solid rgba(76, 175, 80, 0.12)',
							}}
						>
							{successMessage}
						</Alert>
					)}

					<TextField
						fullWidth
						label='New Password'
						type={showPassword ? 'text' : 'password'}
						{...register('password', {
							required: 'Password is required',
							pattern: {
								value: passwordRegex.digit,
								message: 'Password must contain at least one digit',
							},
							minLength: {
								value: 6,
								message: 'Minimum 6 characters',
							},
						})}
						error={!!errors.password}
						helperText={errors.password?.message}
						sx={fieldSx}
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											onClick={() => setShowPassword(!showPassword)}
											edge='end'
											sx={{ color: 'rgba(25, 32, 45, 0.62)' }}
										>
											{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
					/>

					<TextField
						fullWidth
						label='Confirm Password'
						type={showConfirmPassword ? 'text' : 'password'}
						{...register('confirmPassword', {
							required: 'Please confirm your password',
							validate: (value) =>
								value === passwordValue || 'Passwords do not match',
						})}
						error={!!errors.confirmPassword}
						helperText={errors.confirmPassword?.message}
						sx={fieldSx}
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
											edge='end'
											sx={{ color: 'rgba(25, 32, 45, 0.62)' }}
										>
											{showConfirmPassword ? (
												<VisibilityIcon />
											) : (
												<VisibilityOffIcon />
											)}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
					/>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						disabled={!isDirty || !isValid || loading}
						sx={{
							mt: 1,
							height: '52px',
							borderRadius: '16px',
							textTransform: 'none',
							fontSize: '1rem',
							fontWeight: 600,
							letterSpacing: '0.01em',
							background:
								'linear-gradient(135deg, rgba(34,41,52,0.96) 0%, rgba(58,69,88,0.92) 100%)',
							boxShadow: '0 12px 28px rgba(31, 41, 55, 0.18)',
							'&:hover': {
								background:
									'linear-gradient(135deg, rgba(24,30,40,0.98) 0%, rgba(45,55,72,0.96) 100%)',
							},
							'&.Mui-disabled': {
								background: 'rgba(120, 130, 145, 0.38)',
								color: 'rgba(255,255,255,0.8)',
							},
						}}
					>
						{loading ? 'Updating...' : 'Update Password'}
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default ResetForm;