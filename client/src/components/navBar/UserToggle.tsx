import { FC, useState, MouseEvent } from "react";
import { IconButton, Menu, MenuItem, Divider, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { loggedOut } from "../../features/userSlice";
import { resetOnLogOut } from "../../features/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export const UserToggle: FC = () => {
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const { user } = useAppSelector((state) => state.user);
	const isLogged = window.sessionStorage.getItem("isLogged") === "true";

	const handleMenuOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

	const handleLogOut = () => {
		window.sessionStorage.removeItem("logoutIndicator");
		dispatch(loggedOut());
		dispatch(resetOnLogOut());
		handleMenuClose();
	};

	const menuPaperStyles = {
		elevation: 0,
		sx: {
			width: 180,
			bgcolor: "rgba(255, 255, 255, 0.72)",
			backdropFilter: "blur(18px) saturate(150%)",
			color: "#111827",
			border: "1px solid rgba(255,255,255,0.42)",
			boxShadow: "0 20px 40px rgba(15,23,42,0.10)",
			mt: 1.5,
			"& .MuiMenuItem-root": {
				fontSize: "0.9rem",
				fontWeight: 300,
				"&:hover": { bgcolor: "rgba(255,255,255,0.40)" },
			},
			"& .MuiDivider-root": { borderColor: "rgba(17,24,39,0.08)" },
		},
	};

	return (
		<>
			<IconButton onClick={handleMenuOpen} sx={{ color: "#111827" }}>
				{user && isLogged ? (
					<Avatar
						sx={{
							width: 28,
							height: 28,
							bgcolor: "rgba(99,102,241,0.14)",
							color: "#4f46e5",
							fontSize: "0.9rem",
						}}
					>
						U
					</Avatar>
				) : (
					<PermIdentityOutlinedIcon fontSize="small" />
				)}
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleMenuClose}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				PaperProps={menuPaperStyles}
			>
				{user && isLogged ? (
					<MenuItem onClick={handleLogOut}>Logout</MenuItem>
				) : (
					[
						<MenuItem key="login" component={Link} to="/login" onClick={handleMenuClose}>
							Login
						</MenuItem>,
						<Divider key="divider" />,
						<MenuItem key="register" component={Link} to="/register" onClick={handleMenuClose}>
							Register
						</MenuItem>,
					]
				)}
			</Menu>
		</>
	);
};
