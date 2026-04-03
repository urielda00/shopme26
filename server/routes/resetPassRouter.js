import express from 'express';
import * as resetPassController from '../controllers/ResetPassController.js';
import { resetPasswordValidation, validate } from '../middleware/express-validator.js';

const resetPassRouter = express.Router();

/**
 * Request password reset link
 * POST /resetPass
 */
resetPassRouter.post('/', resetPassController.sendLink);

/**
 * Verify reset link validity
 * GET /resetPass/reset/:id/:token
 */
resetPassRouter.get('/reset/:id/:token', resetPassController.verifyUrl);

/**
 * Reset password
 * POST /resetPass/reset/:id/:token
 */
resetPassRouter.post(
	'/reset/:id/:token',
	resetPasswordValidation,
	validate,
	resetPassController.resetPass
);

export default resetPassRouter;