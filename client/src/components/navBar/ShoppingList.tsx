import { FC } from "react";
import { Link } from "react-router-dom";
import { IconButton, Box } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAppSelector } from "../../app/hooks";

const ShoppingList: FC = () => {
	const { totalQuantity } = useAppSelector((state) => state.cart);
	console.log("ShoppingList totalQuantity", totalQuantity);
	return (
		<Box
			component={Link}
			to="/cart"
			sx={{ position: "relative", display: "flex", textDecoration: "none" }}
		>
			<IconButton sx={{ color: "#111827" }}>
				<ShoppingCartOutlinedIcon fontSize="small" />
			</IconButton>

			{totalQuantity > 0 && (
				<Box
					component="span"
					sx={{
						width: "18px",
						height: "18px",
						borderRadius: "50%",
						background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
						position: "absolute",
						top: "2px",
						right: "2px",
						color: "#fff",
						fontSize: "0.7rem",
						fontWeight: "bold",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						boxShadow: "0 8px 16px rgba(99,102,241,0.28)",
					}}
				>
					{totalQuantity}
				</Box>
			)}
		</Box>
	);
};

export default ShoppingList;
