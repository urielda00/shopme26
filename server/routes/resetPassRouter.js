import express from 'express';
// Renamed to reflect it is a controller
import * as resetPassController from '../controllers/ResetPassController.js'; 
import { resetPasswordValidation, validate } from '../middleware/express-validator.js';

const resetPassRouter = express.Router();

// Routes
resetPassRouter.post('/', resetPassController.sendLink);
resetPassRouter.get('/reset/:id/:token', resetPassController.verifyUrl);

// Added validation middleware here
resetPassRouter.post('/reset/:id/:token', 
    resetPasswordValidation, 
    validate, 
    resetPassController.resetPass
);

export default resetPassRouter;