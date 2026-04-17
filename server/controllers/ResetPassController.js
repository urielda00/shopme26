import User from "../models/UserModel.js";
import ResetToken from "../models/ResetTokenModel.js";
import { sendMail } from "../middleware/sendMail.js";
import { ResetPassInfoLogger, ResetPassErrorLogger } from "../middleware/winston.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

/**
 * Generates a secure password reset token and sends a reset link via email.
 * Prevents email enumeration by returning a generic success message even if the user is not found.
 */
export const sendLink = async (req, res, next) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			ResetPassInfoLogger.info(`Reset link requested for non-existent email: ${email}`);
			return res
				.status(200)
				.json({ success: true, message: "If this email exists, a link has been sent." });
		}

		await ResetToken.deleteMany({ userId: user._id });

		const resetToken = crypto.randomBytes(32).toString("hex");
		const hashedToken = await bcrypt.hash(resetToken, 10);

		await new ResetToken({
			userId: user._id,
			token: hashedToken,
		}).save();

		const baseUrl = process.env.CLIENT_URL.split(",")[0].trim().replace(/\/+$/, "");
		const link = `${baseUrl}/reset-password/${user._id}/${resetToken}`;

		await sendMail(user.email, "Password Reset Request", `Click here: ${link}`);

		ResetPassInfoLogger.info(`Reset link sent to user: ${user._id}`);
		res.status(200).json({ success: true, message: "Reset link sent successfully." });
	} catch (error) {
		ResetPassErrorLogger.error(`Error in sendLink: ${error.message}`);
		next(error);
	}
};

/**
 * Validates the password reset token against the database record.
 * Used to verify the URL integrity before rendering the reset password form on the client.
 */
export const verifyUrl = async (req, res, next) => {
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
        next(error);
	}
};

/**
 * Verifies the token and securely updates the user's password.
 * Cleans up the token document upon successful reset to prevent reuse.
 */
export const resetPass = async (req, res, next) => {
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

		const hashedPassword = await bcrypt.hash(password, 10);
		await User.findByIdAndUpdate(id, { password: hashedPassword });

		await ResetToken.deleteOne({ _id: storedToken._id });

		ResetPassInfoLogger.info(`Password successfully reset for user: ${id}`);
		res.status(200).json({ success: true, message: "Password reset successfully" });
	} catch (error) {
		ResetPassErrorLogger.error(`Error in resetPass: ${error.message}`);
		next(error);
	}
};