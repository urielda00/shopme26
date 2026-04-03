import User from "../models/UserModel.js";
import ResetToken from "../models/ResetTokenModel.js";
import { sendMail } from "../middleware/sendMail.js";
import { ResetPassInfoLogger, ResetPassErrorLogger } from "../middleware/winston.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

// 1. Send Link - Logic for generating and sending the token
export const sendLink = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			// Security: Don't reveal if user exists, but log it internally
			ResetPassInfoLogger.info(`Reset link requested for non-existent email: ${email}`);
			return res
				.status(200)
				.json({ success: true, message: "If this email exists, a link has been sent." });
		}

		// Delete any existing tokens for this user
		await ResetToken.deleteMany({ userId: user._id });

		// Generate a random token
		const resetToken = crypto.randomBytes(32).toString("hex");

		// Hash the token before saving to DB for security
		const hashedToken = await bcrypt.hash(resetToken, 10);

		await new ResetToken({
			userId: user._id,
			token: hashedToken,
		}).save();

		/**
		 * Sanitize CLIENT_URL to prevent double slashes if it ends with /
		 */
		const baseUrl = process.env.CLIENT_URL.split(",")[0].trim().replace(/\/+$/, "");
		const link = `${baseUrl}/reset-password/${user._id}/${resetToken}`;

		await sendMail(user.email, "Password Reset Request", `Click here: ${link}`);

		ResetPassInfoLogger.info(`Reset link sent to user: ${user._id}`);
		res.status(200).json({ success: true, message: "Reset link sent successfully." });
	} catch (error) {
		ResetPassErrorLogger.error(`Error in sendLink: ${error.message}`);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

// 2. Verify URL - Check if the link is valid without changing anything
export const verifyUrl = async (req, res) => {
	try {
		const { id, token } = req.params;
		const storedToken = await ResetToken.findOne({ userId: id });

		if (!storedToken) {
			return res.status(400).json({ success: false, message: "Invalid or expired link" });
		}

		const isValid = await bcrypt.compare(token, storedToken.token);
		if (!isValid) {
			return res.status(400).json({ success: false, message: "Invalid or expired link" });
		}

		res.status(200).json({ success: true, message: "Link is valid" });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message || "Unknown error",
			stack: error.stack,
			errorDetails: error.toString(),
		});
	}
};

// 3. Reset Password - The final stage
export const resetPass = async (req, res) => {
	try {
		const { id, token } = req.params;
		const { password } = req.body;

		const storedToken = await ResetToken.findOne({ userId: id });
		if (!storedToken) {
			return res.status(400).json({ success: false, message: "Invalid or expired link" });
		}

		const isValid = await bcrypt.compare(token, storedToken.token);
		if (!isValid) {
			return res.status(400).json({ success: false, message: "Invalid or expired link" });
		}

		// Hash new password and update user
		const hashedPassword = await bcrypt.hash(password, 10);
		await User.findByIdAndUpdate(id, { password: hashedPassword });

		// Delete the used token
		await ResetToken.deleteOne({ _id: storedToken._id });

		ResetPassInfoLogger.info(`Password successfully reset for user: ${id}`);
		res.status(200).json({ success: true, message: "Password reset successfully" });
	} catch (error) {
		ResetPassErrorLogger.error(`Error in resetPass: ${error.message}`);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
