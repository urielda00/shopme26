import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import UsersArchives from "../models/UsersArchivesModel.js";
import { UserErrorLogger, UserInfoLogger } from "../middleware/winston.js";
import Cart from "../models/cartModel.js";

/**
 * Filters out invalid products and normalizes the cart item structure 
 * to ensure consistent formatting for the client session.
 */
const formatCartItems = (productsArray) => {
	return productsArray
		.filter((item) => item.productId && item.productId.productName)
		.map((item) => {
			const product = item.productId;

			return {
				_id: product._id.toString(),
				productId: product._id.toString(),
				productName: product.productName,
				image:
					(Array.isArray(product.productImages) && product.productImages.length > 0
						? product.productImages[0]
						: product.image) || "",
				price: item.priceAtAdd,
				quantity: product.quantity,
				itemQuantity: item.quantity,
			};
		});
};

/**
 * Constructs the user session payload, aggregating essential user details 
 * and populating their current cart state for the client context.
 */
const buildSessionUser = async (user) => {
	const userCart = await Cart.findOne({ userId: user._id }).populate("products.productId");

	const formattedCart = userCart ? formatCartItems(userCart.products) : [];

	return {
		userId: user._id,
		userName: user.userName,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		isAdmin: Boolean(user.isAdmin),
		cart: formattedCart,
		totalPrice: userCart ? userCart.totalPrice : 0,
		totalItemsInCart: userCart ? userCart.totalItemsInCart : 0,
	};
};

/**
 * Generates standardized security configuration for HTTP-only cookies.
 * Supports dynamic expiration maxAge to handle both setting and clearing cookies.
 */
const getCookieConfig = (maxAge = 1000 * 60 * 60) => ({
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
	maxAge,
});

/**
 * Handles new user registration, hashes passwords securely, 
 * and validates against existing usernames or emails to prevent duplicates.
 */
export const register = async (req, res, next) => {
	try {
		const { firstName, lastName, userName, email, password, phoneNumber, avatar } = req.body;
		const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: "User with this email or username already exists",
			});
		}

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			email,
			avatar,
			lastName,
			userName,
			firstName,
			phoneNumber,
			password: passwordHash,
		});

		await newUser.save();

		UserInfoLogger.info(`User created: ${userName}`);

		res.status(201).json({
			success: true,
			message: "User created successfully",
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Authenticates user credentials, generates a JWT access token, 
 * and establishes a secure session by setting an HTTP-only cookie.
 */
export const login = async (req, res, next) => {
	try {
		const { userName, password } = req.body;

		const user = await User.findOne({ userName });

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid username or password",
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Invalid username or password",
			});
		}

		const token = jwt.sign(
			{
				id: user._id,
				userName: user.userName,
				isAdmin: Boolean(user.isAdmin),
			},
			process.env.JWT_ACCESS_KEY,
			{ expiresIn: "1h" },
		);

		res.cookie("session_token", token, getCookieConfig());

		const sessionUser = await buildSessionUser(user);

		UserInfoLogger.info(`User logged in: ${userName}`);

		res.status(200).json({
			success: true,
			message: "Login successful",
			...sessionUser,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Terminates the user session by overriding the authentication cookie 
 * with a zero-duration maxAge for immediate invalidation.
 */
export const logout = async (req, res, next) => {
	try {
		res.clearCookie("session_token", getCookieConfig(0));

		res.status(200).json({
			success: true,
			message: "Logout successful",
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Retrieves the currently authenticated user's profile 
 * and populates their active session data.
 */
export const getMe = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id).select("-password");

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		const sessionUser = await buildSessionUser(user);

		res.status(200).json({ success: true, ...sessionUser });
	} catch (error) {
		next(error);
	}
};

/**
 * Updates basic user profile details. Enforces authorization by ensuring 
 * the requestor is either the account owner or has administrative privileges.
 */
export const updateUserInfo = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (String(req.user.id) !== String(id) && !req.user.isAdmin) {
			return res.status(403).json({
				success: false,
				message: "Forbidden",
			});
		}

		const updatedUser = await User.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		}).select("-password");

		if (!updatedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		UserInfoLogger.info(`User info updated: ${id}`);

		res.status(200).json({
			success: true,
			data: updatedUser,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Securely updates a user's password after verifying their current password.
 * Includes strict authorization checks (owner or admin).
 */
export const updateUserPass = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { password, insertPrePassword } = req.body;

		if (String(req.user.id) !== String(id) && !req.user.isAdmin) {
			return res.status(403).json({
				success: false,
				message: "Forbidden",
			});
		}

		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		const isMatch = await bcrypt.compare(insertPrePassword, user.password);

		if (!isMatch) {
			return res.status(400).json({
				success: false,
				message: "Incorrect current password",
			});
		}

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		await user.save();

		UserInfoLogger.info(`Password updated for user: ${id}`);

		res.status(200).json({
			success: true,
			message: "Password updated successfully",
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Permanently deletes a user account after password verification, 
 * backing up essential data to the archives and clearing the session cookie.
 */
export const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { password } = req.body;

		if (String(req.user.id) !== String(id) && !req.user.isAdmin) {
			return res.status(403).json({
				success: false,
				message: "Forbidden",
			});
		}

		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized: Wrong password",
			});
		}

		const archivedUser = new UsersArchives({
			_id: user._id,
			email: user.email,
			lastName: user.lastName,
			userName: user.userName,
			firstName: user.firstName,
			phoneNumber: user.phoneNumber,
		});

		await archivedUser.save();
		await User.findByIdAndDelete(id);

		UserInfoLogger.info(`User deleted and archived: ${id}`);

		res.clearCookie("session_token", getCookieConfig(0));

		res.status(200).json({
			success: true,
			message: "User deleted and archived successfully",
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Verifies if a specific email or username is already registered in the system.
 * Useful for client-side form validation.
 */
export const checkIfExist = async (req, res, next) => {
	try {
		const { data } = req.params;
		const user = await User.findOne({ $or: [{ email: data }, { userName: data }] });

		res.status(200).json({
			success: true,
			exists: Boolean(user),
		});
	} catch (error) {
		next(error);
	}
};