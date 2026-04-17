import express from 'express';
import * as orderController from '../controllers/orderController.js';
import { createOrderValidation, validate } from '../middleware/express-validator.js';
import { checkJWT } from '../middleware/jwt.js';

const orderRouter = express.Router();

// Apply JWT authentication to all order routes
orderRouter.use(checkJWT);

// Order creation with payload validation
orderRouter.post('/', createOrderValidation, validate, orderController.createOrder);

// Order retrieval
orderRouter.get('/my-orders', orderController.readOrders);
orderRouter.get('/:orderId', orderController.readOrderById);

export default orderRouter;