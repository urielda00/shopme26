import { check, validationResult } from 'express-validator';

/**
 * Standard middleware to evaluate validation results.
 * Formats and returns a clean array of error messages if validation fails.
 */
export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			success: false,
			errors: errors.array().map((err) => err.msg),
		});
	}
	next();
};

/**
 * Validates user registration payload.
 * Enforces required fields, string length constraints, email formatting, and password confirmation.
 */
export const registerValidation = [
	check('firstName')
		.trim()
		.notEmpty()
		.withMessage('First name is required')
		.isLength({ min: 2, max: 15 })
		.withMessage('First name must be between 2 and 15 characters'),

	check('lastName')
		.trim()
		.notEmpty()
		.withMessage('Last name is required')
		.isLength({ min: 2, max: 15 })
		.withMessage('Last name must be between 2 and 15 characters'),

	check('email')
		.trim()
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Please provide a valid email address'),

	check('userName')
		.trim()
		.notEmpty()
		.withMessage('Username is required')
		.isLength({ min: 2, max: 15 })
		.withMessage('Username must be between 2 and 15 characters'),

	check('password')
		.trim()
		.notEmpty()
		.withMessage('Password is required')
		.isLength({ min: 5 })
		.withMessage('Password must be at least 5 characters long'),

	check('verifyPass')
		.trim()
		.notEmpty()
		.withMessage('Please confirm your password')
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Passwords do not match');
			}
			return true;
		}),

	check('phoneNumber')
		.notEmpty()
		.withMessage('Phone number is required')
		.isMobilePhone()
		.withMessage('Please provide a valid mobile phone number'),
];

/**
 * Validates login credentials presence.
 */
export const loginValidation = [
	check('userName').trim().notEmpty().withMessage('Username is required'),
	check('password').trim().notEmpty().withMessage('Password is required'),
];

/**
 * Validates the password update process, ensuring the new password matches the confirmation.
 */
export const updateUserPassValidation = [
	check('insertPrePassword').trim().notEmpty().withMessage('Existing password is required'),

	check('password')
		.trim()
		.notEmpty()
		.withMessage('New password is required')
		.isLength({ min: 5 })
		.withMessage('New password must be at least 5 characters long'),

	check('verifyPass')
		.trim()
		.notEmpty()
		.withMessage('Please confirm your new password')
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('New passwords do not match');
			}
			return true;
		}),
];

/**
 * Ensures password confirmation is provided before processing account deletion.
 */
export const deleteUserValidation = [
	check('password').trim().notEmpty().withMessage('Please enter your password to confirm deletion'),
];

/**
 * Validates product creation and update payloads against business rules.
 */
export const createProductValidation = [
	check('productName')
		.trim()
		.notEmpty()
		.withMessage('Product name is required')
		.isLength({ min: 2, max: 20 })
		.withMessage('Product name must be between 2 and 20 characters'),

	check('shortDescription')
		.trim()
		.notEmpty()
		.withMessage('Short description is required')
		.isLength({ min: 4, max: 50 })
		.withMessage('Short description must be between 4 and 50 characters'),

	check('longDescription')
		.trim()
		.notEmpty()
		.withMessage('Long description is required')
		.isLength({ min: 4, max: 150 })
		.withMessage('Long description must be between 4 and 150 characters'),

	check('price')
		.trim()
		.notEmpty()
		.withMessage('Price is required')
		.isNumeric()
		.withMessage('Price must be a number'),

	check('category').trim().notEmpty().withMessage('Category is required'),

	check('quantity')
		.trim()
		.notEmpty()
		.withMessage('Quantity is required')
		.isNumeric()
		.withMessage('Quantity must be a number'),
];

/**
 * Validates checkout payloads.
 */
export const createOrderValidation = [
	check('address')
		.trim()
		.notEmpty()
		.withMessage('Shipping address is required'),
];

/**
 * Validates new password strength requirements during the password recovery flow.
 */
export const resetPasswordValidation = [
	check('password')
		.trim()
		.notEmpty()
		.withMessage('New password is required')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long')
		.matches(/\d/)
		.withMessage('Password must contain at least one digit'),

	check('confirmPassword')
		.trim()
		.notEmpty()
		.withMessage('Please confirm your new password')
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Passwords do not match');
			}
			return true;
		}),
];