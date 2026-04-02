import { FC, useState, MouseEvent, useMemo } from "react";
import { IconButton, Menu, MenuItem, Divider, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearAuthUser } from "../../features/userSlice";
import { resetOnLogOut } from "../../features/cartSlice";
import { logoutAPI } from "../../services/authService";

export const UserToggle: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const { user, isAdmin, userName } = useAppSelector((state) => state.user);

	const initials = useMemo(() => {
		return userName ? userName.slice(0, 1).toUpperCase() : "U";
	}, [userName]);

	const handleMenuOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

	const handleLogOut = async () => {
		try {
			await logoutAPI();
		} catch (error) {
			// Intentionally ignored to allow client cleanup
		} finally {
			window.sessionStorage.removeItem("isLogged");
			window.sessionStorage.removeItem("userName");

			dispatch(clearAuthUser());
			dispatch(resetOnLogOut());

			handleMenuClose();
			navigate("/login");
		}
	};

	const menuPaperStyles = {
		elevation: 0,
		sx: {
			width: 200,
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
				{user ? (
					<Avatar
						sx={{
							width: 28,
							height: 28,
							bgcolor: "rgba(99,102,241,0.14)",
							color: "#4f46e5",
							fontSize: "0.9rem",
						}}
					>
						{initials}
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
				{/* Replaced Fragments with arrays to satisfy MUI Menu requirements */}
				{user
					? [
							isAdmin ? (
								<MenuItem
									key="dashboard"
									component={Link}
									to="/admin/dashboard"
									onClick={handleMenuClose}
								>
									Dashboard
								</MenuItem>
							) : null,
							<MenuItem key="account" component={Link} to="/user" onClick={handleMenuClose}>
								Account
							</MenuItem>,
							<Divider key="divider-1" />,
							<MenuItem key="logout" onClick={handleLogOut}>
								Logout
							</MenuItem>,
						]
					: [
							<MenuItem key="login" component={Link} to="/login" onClick={handleMenuClose}>
								Login
							</MenuItem>,
							<Divider key="divider-2" />,
							<MenuItem key="register" component={Link} to="/register" onClick={handleMenuClose}>
								Register
							</MenuItem>,
						]}
			</Menu>
		</>
	);
};
