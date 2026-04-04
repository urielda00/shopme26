import { useEffect, useState } from "react";
import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import axiosInstance from "../utils/axiosInstance";

const RENDER_NOTICE_STORAGE_KEY = "render-wakeup-notice-seen";

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "min(92vw, 460px)",
	bgcolor: "background.paper",
	borderRadius: 3,
	boxShadow: 24,
	p: 4,
	outline: "none",
	textAlign: "center",
};

const RenderWakeupNotice = () => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const hasSeenNotice = localStorage.getItem(RENDER_NOTICE_STORAGE_KEY);

		if (!hasSeenNotice) {
			setOpen(true);
		}

		const wakeUpServer = async () => {
			try {
				await axiosInstance.get("/product/readProducts?page=1&per_page=1");
			} catch (error) {
				console.error("Render wake-up request failed:", error);
			}
		};

		void wakeUpServer();
	}, []);

	const handleClose = () => {
		localStorage.setItem(RENDER_NOTICE_STORAGE_KEY, "true");
		setOpen(false);
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{ backdrop: { timeout: 250 } }}
			aria-labelledby="render-wakeup-notice-title"
			aria-describedby="render-wakeup-notice-description"
		>
			<Fade in={open}>
				<Box sx={modalStyle}>
					<Typography
						id="render-wakeup-notice-title"
						variant="h6"
						component="h2"
						sx={{ mb: 2, fontWeight: 700 }}
					>
						Please note
					</Typography>

					<Typography
						id="render-wakeup-notice-description"
						variant="body1"
						sx={{ mb: 3, lineHeight: 1.8 }}
					>
						This app uses Render&apos;s free tier. The first server response may
						take up to a minute while products are loading.
					</Typography>

					<Button variant="contained" onClick={handleClose}>
						Got it
					</Button>
				</Box>
			</Fade>
		</Modal>
	);
};

export default RenderWakeupNotice;