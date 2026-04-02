import { FC } from "react";
import {
	Container,
	Paper,
	Stepper,
	Step,
	StepLabel,
	Button,
	Box,
	Typography,
	CircularProgress,
	Alert,
	Stack,
} from "@mui/material";
import { useAppSelector } from "../app/hooks";
import useCheckout from "../hooks/useCheckout";
import CartStep from "../components/checkout/CartStep";
import Delivery from "../components/checkout/Delivery";
import Purchase from "../components/checkout/Purchase";
import { commonContainerSx } from "../styles/common.styles";

const formatPrice = (value: number) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);

const CheckoutPage: FC = () => {
    const { user } = useAppSelector((state) => state.user);
	const {
		steps,
		activeStep,
		items,
		totalPrice,
		isLoading,
		error,
		handleNext,
		handleBack,
		handleFinalSubmit,
	} = useCheckout();

	const renderStepContent = (step: number) => {
		switch (step) {
			case 0:
				return <CartStep cart={items} />;
			case 1:
				return <Delivery />;
			case 2:
				return <Purchase />;
			default:
				return <Typography>Unknown step</Typography>;
		}
	};

	const isLastStep = activeStep === steps.length - 1;

	return (
		<Box
			sx={[
				commonContainerSx,
				{
					minHeight: "100vh",
					pt: { xs: "104px", md: "120px" },
					pb: { xs: 3, md: 5 },
					background:
						"radial-gradient(circle at top, rgba(119,138,255,0.10), transparent 28%), linear-gradient(180deg, rgba(248,249,255,1) 0%, rgba(241,244,255,1) 100%)",
				},
			]}
		>
			<Container maxWidth="md">
				<Paper
					elevation={0}
					sx={{
						overflow: "hidden",
						borderRadius: { xs: 4, md: 5 },
						border: "1px solid rgba(255,255,255,0.7)",
						background: "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.56))",
						backdropFilter: "blur(18px)",
						boxShadow: "0 30px 80px rgba(53, 63, 120, 0.12)",
					}}
				>
					<Box
						sx={{
							px: { xs: 2, sm: 3.5, md: 4.5 },
							py: { xs: 2.5, md: 3.5 },
							borderBottom: "1px solid rgba(15,23,42,0.06)",
							background: "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.22))",
						}}
					>
						<Stack
							direction={{ xs: "column", md: "row" }}
							justifyContent="space-between"
							alignItems={{ xs: "flex-start", md: "center" }}
							spacing={2}
						>
							<Box>
								<Typography
									variant="overline"
									sx={{
										letterSpacing: 3,
										color: "text.secondary",
									}}
								>
									SHOPME CHECKOUT
								</Typography>

								<Typography
									variant="h4"
									sx={{
										fontWeight: 900,
										lineHeight: 1.1,
										mt: 0.5,
									}}
								>
									Secure checkout
								</Typography>
							</Box>

							<Box
								sx={{
									px: 2,
									py: 1.25,
									borderRadius: 999,
									border: "1px solid rgba(15,23,42,0.08)",
									backgroundColor: "rgba(255,255,255,0.42)",
								}}
							>
								<Typography variant="body2" color="text.secondary">
									Order total
								</Typography>
								<Typography variant="h6" sx={{ fontWeight: 900 }}>
									{formatPrice(totalPrice)}
								</Typography>
							</Box>
						</Stack>
					</Box>

					<Box sx={{ px: { xs: 2, sm: 3.5, md: 4.5 }, py: { xs: 2.5, md: 4 } }}>
						<Stepper
							activeStep={activeStep}
							alternativeLabel
							sx={{
								mb: 4,
								"& .MuiStepConnector-line": {
									borderColor: "rgba(15,23,42,0.08)",
								},
								"& .MuiStepLabel-label": {
									mt: 1,
									fontWeight: 700,
									color: "text.secondary",
								},
								"& .Mui-active .MuiStepLabel-label, & .Mui-completed .MuiStepLabel-label": {
									color: "text.primary",
								},
							}}
						>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>

						{error && (
							<Alert
								severity="error"
								sx={{
									mb: 3,
									borderRadius: 3,
								}}
							>
								{error}
							</Alert>
						)}

						<Box
							sx={{
								minHeight: { xs: 320, md: 360 },
								p: { xs: 1.5, sm: 2.5 },
								borderRadius: 4,
								border: "1px solid rgba(15,23,42,0.06)",
								background:
									"linear-gradient(180deg, rgba(255,255,255,0.46), rgba(255,255,255,0.22))",
							}}
						>
							{renderStepContent(activeStep)}
						</Box>

						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							sx={{ pt: 3 }}
						>
							<Button
								disabled={activeStep === 0 || isLoading}
								onClick={handleBack}
								variant="text"
								sx={{
									px: 2,
									borderRadius: 999,
									color: "text.secondary",
									fontWeight: 700,
								}}
							>
								Back
							</Button>

							<Button
								variant="contained"
								disabled={isLoading || (isLastStep && !user)}
								onClick={isLastStep ? handleFinalSubmit : handleNext}
								sx={{
									minWidth: 150,
									px: 3,
									py: 1.2,
									borderRadius: 999,
									fontWeight: 800,
									background:
										"linear-gradient(135deg, rgba(91,111,255,0.98), rgba(131,146,255,0.92))",
									boxShadow: "0 18px 40px rgba(70, 89, 210, 0.28)",
									"&:hover": {
										boxShadow: "0 24px 50px rgba(70, 89, 210, 0.34)",
									},
								}}
							>
								{isLoading ? (
									<CircularProgress size={22} color="inherit" />
								) : isLastStep ? (
									"Place order"
								) : (
									"Continue"
								)}
							</Button>
						</Stack>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
};

export default CheckoutPage;