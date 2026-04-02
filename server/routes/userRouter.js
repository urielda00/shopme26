import express from 'express';
import * as UserController from '../controllers/UserController.js';
import { checkJWT } from '../middleware/jwt.js';
import {
    validate,
    registerValidation,
    loginValidation,
    updateUserPassValidation,
    deleteUserValidation,
} from '../middleware/express-validator.js';

const userRouter = express.Router();

userRouter.get('/checkIfExist/:data', UserController.checkIfExist);
userRouter.post('/register', registerValidation, validate, UserController.register);
userRouter.post('/login', loginValidation, validate, UserController.login);
userRouter.post('/logout', checkJWT, UserController.logout);
userRouter.get('/me', checkJWT, UserController.getMe);

userRouter.patch('/updateUserInfo/:id', checkJWT, UserController.updateUserInfo);

userRouter.patch(
    '/updateUserPass/:id',
    checkJWT,
    updateUserPassValidation,
    validate,
    UserController.updateUserPass
);

userRouter.delete(
    '/deleteUser/:id',
    checkJWT,
    deleteUserValidation,
    validate,
    UserController.deleteUser
);

export default userRouter;