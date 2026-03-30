import express from 'express';
import * as UserController from '../controllers/UserController.js';
import { checkJWT } from '../middleware/jwt.js';
import { 
    validate, 
    registerValidation, 
    loginValidation, 
    updateUserPassValidation, 
    deleteUserValidation 
} from '../middleware/express-validator.js';

const userRouter = express.Router();

// --- Public Routes ---

// Check if email or username already exists in real-time
userRouter.get('/checkIfExist/:data', UserController.checkIfExist);

// User registration with full validation
userRouter.post('/register', registerValidation, validate, UserController.register);

// User login
userRouter.post('/login', loginValidation, validate, UserController.login);


// --- Protected Routes (Require Authentication) ---

// Update general user information
userRouter.patch('/updateUserInfo/:id', checkJWT, UserController.updateUserInfo);

// Update user password - requires old password validation
userRouter.patch(
    '/updateUserPass/:id', 
    checkJWT, 
    updateUserPassValidation, 
    validate, 
    UserController.updateUserPass
);

// Delete user account - requires password confirmation
userRouter.delete(
    '/deleteUser/:id', 
    checkJWT, 
    deleteUserValidation, 
    validate, 
    UserController.deleteUser
);

export default userRouter;