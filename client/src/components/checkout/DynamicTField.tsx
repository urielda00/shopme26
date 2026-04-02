import { FC } from "react";
import Grid from "@mui/material/Grid2";
import { TextField, FormControlLabel, Checkbox, Box, Typography } from "@mui/material";
import { ICheckoutField } from "../../interfaces";

interface Props {
	formData: ICheckoutField[];
	showConfirmation?: boolean;
}

const DynamicTField: FC<Props> = ({ formData, showConfirmation = true }) => {
	return (
		<Grid container spacing={2}>
			{formData.map((field) => (
				<Grid key={field.id} size={{ xs: 12, sm: 6 }}>
					<TextField
						fullWidth
						id={field.id}
						name={field.name}
						label={field.label}
						autoComplete={field.autoComplete}
						required={field.required ?? false}
						variant="outlined"
						size="medium"
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: 3,
								backgroundColor: "rgba(255,255,255,0.05)",
								backdropFilter: "blur(10px)",
								transition: "all 0.2s ease",
								"& fieldset": {
									borderColor: "rgba(255,255,255,0.12)",
								},
								"&:hover fieldset": {
									borderColor: "rgba(255,255,255,0.22)",
								},
								"&.Mui-focused fieldset": {
									borderColor: "rgba(160,174,255,0.9)",
									boxShadow: "0 0 0 4px rgba(160,174,255,0.08)",
								},
							},
							"& .MuiInputLabel-root": {
								color: "text.secondary",
							},
						}}
					/>
				</Grid>
			))}

			{showConfirmation && (
				<Grid size={12}>
					<Box
						sx={{
							mt: 0.5,
							px: 1,
							py: 1.25,
							borderRadius: 3,
							border: "1px solid rgba(255,255,255,0.08)",
							background:
								"linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))",
						}}
					>
						<FormControlLabel
							sx={{
								m: 0,
								px: 1.2,
								py: 0.6,
								borderRadius: 2,
								border: "1px solid rgba(255,255,255,0.08)",
								background: "rgba(255,255,255,0.02)",
							}}
							control={
								<Checkbox
									name="saveAddress"
									value="yes"
									sx={{
										color: "rgba(120, 130, 160, 0.9)",
										"& .MuiSvgIcon-root": {
											fontSize: 24,
										},
										"&.Mui-checked": {
											color: "#8b5cf6",
										},
										"&:hover": {
											backgroundColor: "transparent",
										},
									}}
								/>
							}
							label={
								<Typography
									variant="body2"
									sx={{
										color: "rgba(35, 35, 45, 0.88)",
										fontWeight: 500,
									}}
								>
									I confirm the shipping details are correct
								</Typography>
							}
						/>
					</Box>
				</Grid>
			)}
		</Grid>
	);
};

export default DynamicTField;
