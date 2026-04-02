import React from "react";
import {
	Avatar,
	Box,
	Button,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";

import useRegister from "../../hooks/useRegister";
import { passwordRegex } from "../../utils/regexUtils";
import axiosInstance from "../../utils/axiosInstance";

import PasswordDialog from "./PasswordDialog";
import RegisterError from "./RegisterError";
import RegisterSuccess from "./RegisterSuccess";

import VisibilityIcon from "@mui/icons-material/Visibility";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

import {
	authCardStyle,
	authFormInnerStyle,
	authHeaderIconStyle,
	authLinksRowStyle,
	authPrimaryButtonStyle,
	authSecondaryButtonStyle,
	authTextFieldStyle,
	authTitleStyle,
	recaptchaPlaceholderStyle,
} from "../../styles/authStyles";

const RegisterForm: React.FC = () => {
	const {
		reset,
		errors,
		isDirty,
		isValid,
		passwordErrors,
		onSubmit,
		password,
		register,
		passwordEye,
		fetchErrors,
		openPassHelp,
		successFetch,
		setOpenPassHelp,
		passwordEyeVerify,
		handleChangeEyeVerify,
		handleChangeEyePassword,
	} = useRegister();

	return (
		<Box sx={authCardStyle}>
			{successFetch && <RegisterSuccess />}

			<Box sx={authFormInnerStyle}>
				<Avatar sx={{ ...authHeaderIconStyle, mb: 0.75 }}>
					<LockOutlinedIcon />
				</Avatar>

				<Typography component="h1" variant="h4" sx={{ ...authTitleStyle, mb: 0.5 }}>
					Sign Up
				</Typography>

				<Box component="form" noValidate sx={{ width: "100%" }} onSubmit={onSubmit}>
					<Grid container spacing={{ xs: 1.5, sm: 2 }}>
						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								autoComplete="given-name"
								fullWidth
								label="First Name"
								type="text"
								{...register("firstName", {
									required: "First Name Is Required",
								})}
								error={!!errors.firstName}
								helperText={errors.firstName?.message}
								sx={authTextFieldStyle}
							/>
						</Grid>

						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								fullWidth
								label="Last Name"
								autoComplete="family-name"
								type="text"
								{...register("lastName", {
									required: "Last Name Is Required",
								})}
								error={!!errors.lastName}
								helperText={errors.lastName?.message}
								sx={authTextFieldStyle}
							/>
						</Grid>

						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								fullWidth
								label="Email Address"
								autoComplete="email"
								type="email"
								{...register("email", {
									required: "Email Is Required",
									pattern: {
										value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
										message: "Invalid Email format",
									},
									validate: {
										emailAvailable: async (fieldValue) => {
											if (fieldValue.length >= 3 && fieldValue.includes("@")) {
												try {
													const res = await axiosInstance.get(`/auth/checkIfExist/${fieldValue}`);
													return !res.data.exists || "Email Already Exist";
												} catch (err) {
													return "Error checking email";
												}
											}
										},
									},
								})}
								error={!!errors.email}
								helperText={errors.email?.message}
								sx={authTextFieldStyle}
							/>
						</Grid>

						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								fullWidth
								label="User Name"
								type="text"
								{...register("userName", {
									required: "User Name Is Required",
									validate: {
										userAvailable: async (fieldValue) => {
											if (fieldValue.length >= 4) {
												try {
													const res = await axiosInstance.get(`/auth/checkIfExist/${fieldValue}`);
													return !res.data.exists || "User Name Already Exist";
												} catch (err) {
													return "Error checking username";
												}
											}
										},
										has4Characters: (value) =>
											passwordRegex.min4.test(value) || "Must have at least 4 Characters",
									},
								})}
								error={!!errors.userName}
								helperText={errors.userName?.message}
								sx={authTextFieldStyle}
							/>
						</Grid>

						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								fullWidth
								label="Password"
								type={passwordEye ? "text" : "password"}
								autoComplete="new-password"
								{...register("password", {
									required: "Password Is Required",
									validate: {
										hasUpperCase: (value) =>
											passwordRegex.upperCase.test(value) || "Must have at least 1 UpperCase",
										hasLowerCase: (value) =>
											passwordRegex.lowerCase.test(value) || "Must have at least 1 LowerCase",
										hasDigitCase: (value) =>
											passwordRegex.digit.test(value) || "Must have at least 1 Digit",
										has4Characters: (value) =>
											passwordRegex.min4.test(value) || "Must have at least 4 Characters",
									},
								})}
								error={!!errors.password}
								helperText={errors.password?.message}
								sx={authTextFieldStyle}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Tooltip title="More Info">
												<IconButton
													aria-label="password rules"
													onClick={() => {
														setOpenPassHelp(true);
													}}
												>
													<HelpOutlineIcon />
												</IconButton>
											</Tooltip>

											<Tooltip title="Show Password">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleChangeEyePassword}
												>
													{passwordEye ? <VisibilityIcon /> : <VisibilityOffIcon />}
												</IconButton>
											</Tooltip>
										</InputAdornment>
									),
								}}
							/>

							<PasswordDialog open={openPassHelp} onClose={() => setOpenPassHelp(false)} />
						</Grid>

						<Grid size={{ xs: 12, sm: 6 }}>
							<TextField
								fullWidth
								label="Verify Password"
								type={passwordEyeVerify ? "text" : "password"}
								{...register("verifyPass", {
									required: "Verify Password Is Required",
									validate: (value) => {
										return value === password || "The passwords do not match";
									},
								})}
								error={!!errors.verifyPass}
								helperText={errors.verifyPass?.message}
								sx={authTextFieldStyle}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Tooltip title="Show Password">
												<IconButton
													aria-label="toggle verify password visibility"
													onClick={handleChangeEyeVerify}
												>
													{passwordEyeVerify ? <VisibilityIcon /> : <VisibilityOffIcon />}
												</IconButton>
											</Tooltip>
										</InputAdornment>
									),
								}}
							/>
						</Grid>

						<Grid size={12}>
							<TextField
								fullWidth
								label="Phone Number"
								type="tel"
								autoComplete="tel"
								{...register("phoneNumber", {
									required: "Phone Number Is Required",
								})}
								error={!!errors.phoneNumber}
								helperText={errors.phoneNumber?.message}
								sx={authTextFieldStyle}
							/>
						</Grid>

						<Grid size={12}>
							<Box
								sx={{
									...recaptchaPlaceholderStyle,
									mt: 1.5,
									p: { xs: 1.35, sm: 1.75 },
									borderRadius: { xs: "16px", sm: "18px" },
								}}
							>
								<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									<ShieldOutlinedIcon sx={{ color: "#6f82b7", fontSize: 22 }} />
									<Typography
										sx={{
											fontWeight: 700,
											color: "#31405e",
											fontSize: { xs: "0.95rem", sm: "1rem" },
										}}
									>
										reCAPTCHA placeholder
									</Typography>
								</Box>
							</Box>
						</Grid>
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={!isDirty || !isValid}
						sx={authPrimaryButtonStyle}
					>
						Sign Up
					</Button>

					<Button
						type="button"
						fullWidth
						onClick={() => reset()}
						variant="contained"
						sx={authSecondaryButtonStyle}
					>
						Reset Form
					</Button>

					<Box sx={authLinksRowStyle}>
						<Box sx={{ textAlign: "right" }}>
							<Link to="/login">Already have an account? Sign in</Link>
						</Box>
					</Box>
				</Box>

				{fetchErrors ? (
					<RegisterError errors="Internal Server Error, please try again later" />
				) : (
					<RegisterError errors={passwordErrors} />
				)}
			</Box>
		</Box>
	);
};

export default RegisterForm;
