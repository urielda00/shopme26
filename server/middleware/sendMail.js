import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Initialize the transporter once outside the function to reuse the connection pool
 */
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS,
	},
});

export const sendMail = async (email, subject, text) => {
	if (!process.env.EMAIL || !process.env.EMAIL_PASS) {
		throw new Error('Missing EMAIL or EMAIL_PASS environment variables');
	}

	const mailOptions = {
		from: process.env.EMAIL,
		to: email,
		subject,
		text,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log(`Email sent successfully: ${info.response}`);
		return { success: true, info };
	} catch (error) {
		console.error('Failed to send email:', error.message);
		throw new Error('Email delivery failed');
	}
};