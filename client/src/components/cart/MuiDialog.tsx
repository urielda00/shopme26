import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IMuiDialogProps {
	open: boolean;
	onClose: () => void;
	type: "empty" | "auth";
}

const MuiDialog: React.FC<IMuiDialogProps> = ({ open, onClose, type }) => {
	const navigate = useNavigate();

	const handleLogin = () => {
		onClose();
		navigate("/login");
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				sx: {
					borderRadius: 3,
					backdropFilter: "blur(18px)",
					background: "rgba(255, 255, 255, 0.65)",
					border: "1px solid rgba(255,255,255,0.3)",
					boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
					px: 2,
					py: 1,
				},
			}}
		>
			<DialogTitle
				sx={{
					fontWeight: 600,
					fontSize: "1.1rem",
					textAlign: "center",
					color: "#1a1a1a",
				}}
			>
				{type === "empty"
					? "Cannot check out while the cart is empty!"
					: "You must be a registered user to place an order."}
			</DialogTitle>

			<DialogActions
				sx={{
					justifyContent: "center",
					pb: 2,
					gap: 1,
				}}
			>
				<Button
					onClick={onClose}
					sx={{
						borderRadius: 2,
						px: 3,
						py: 1,
						textTransform: "none",
						fontWeight: 500,
						color: "#1a1a1a",
						border: "1px solid #1a1a1a",
						"&:hover": {
							background: "rgba(0,0,0,0.05)",
						},
					}}
				>
					{type === "empty" ? "Close" : "Cancel"}
				</Button>

				{type === "auth" && (
					<Button
						onClick={handleLogin}
						sx={{
							borderRadius: 2,
							px: 3,
							py: 1,
							textTransform: "none",
							fontWeight: 500,
							background: "linear-gradient(135deg, #2c2c2c, #4a4a4a)",
							color: "#fff",
							boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
							"&:hover": {
								background: "linear-gradient(135deg, #3a3a3a, #5a5a5a)",
							},
						}}
					>
						Login
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default MuiDialog;