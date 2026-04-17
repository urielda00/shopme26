import express from 'express';
import * as resetPassController from '../controllers/ResetPassController.js';
import { resetPasswordValidation, validate } from '../middleware/express-validator.js';

const resetPassRouter = express.Router();

// Initiate password reset process and generate link
resetPassRouter.post('/', resetPassController.sendLink);

// Validate password reset token
resetPassRouter.get('/reset/:id/:token', resetPassController.verifyUrl);

// Execute password reset with payload validation
resetPassRouter.post(
	'/reset/:id/:token',
	resetPasswordValidation,
	validate,
	resetPassController.resetPass
);

export default resetPassRouter;