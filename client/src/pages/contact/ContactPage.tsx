import { FC, use } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ContactFormFields from "./ContactFormFields";
import { IContactField } from "../../interfaces/contact.interface";
import { useTitle } from "../../hooks/useTitle";

const MotionBox = motion.create(Box);
const contactFields: IContactField[] = [
	{ id: "email", name: "email", label: "Email Address", autoComplete: "email", type: "email" },
	{ id: "phone", name: "phone", label: "Phone Number", autoComplete: "phone", type: "tel" },
	{ id: "fName", name: "fName", label: "First Name", autoComplete: "given-name", type: "text" },
	{ id: "lName", name: "lName", label: "Last Name", autoComplete: "family-name", type: "text" },
	{
		id: "moreInfo",
		name: "moreInfo",
		label: "Provide information here...",
		multiline: true,
		rows: 4,
	},
];

const ContactPage: FC = () => {
	const mailLink = import.meta.env.VITE_MAIL_LINK;
	const thankYouLink = `${import.meta.env.VITE_FRONT_URL}/thankYou`;
	useTitle('Contact');
	return (
    <Box
    sx={{
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #f5f7fb 0%, #edf2f8 45%, #f8fafc 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        p: { xs: 1.5, md: 2.5 },
        pt: { xs: '90px', md: '100px' },
        pb: { xs: 1.5, md: 2 }
    }}
>
    <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        sx={{
            width: "100%",
            maxWidth: "760px",
            background:
                "linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.42) 100%)",
            backdropFilter: "blur(24px) saturate(165%)",
            WebkitBackdropFilter: "blur(24px) saturate(165%)",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.62)",
            boxShadow: "0 24px 60px rgba(15,23,42,0.10)",
            p: { xs: 2, md: 3 },
            color: "#111827",
        }}
    >
				<Typography
					component="h1"
					variant="h4"
					sx={{
						mb: 1.5,
						fontWeight: 300,
						textAlign: "center",
						letterSpacing: "3px",
						textTransform: "uppercase",
						color: "#111827",
					}}
				>
					Contact Us
				</Typography>

				<Typography
					sx={{
						mb: 5,
						textAlign: "center",
						color: "rgba(17,24,39,0.62)",
						fontSize: "0.98rem",
						maxWidth: "520px",
						mx: "auto",
						lineHeight: 1.7,
					}}
				>
					We’d love to hear from you. Send us your details and we’ll get back to you as soon as
					possible.
				</Typography>

				<Box
					component="form"
					action={mailLink}
					method="POST"
					id="contactForm"
					sx={{ width: "100%" }}
				>
					<input type="hidden" name="_next" value={thankYouLink} />
					<input type="hidden" name="_subject" value="New Contact From SHOPME" />
					<input type="hidden" name="_template" value="table" />

					<ContactFormFields fields={contactFields} />
				</Box>
			</MotionBox>
		</Box>
	);
};

export default ContactPage;
