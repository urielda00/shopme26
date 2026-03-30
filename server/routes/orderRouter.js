import express from 'express';
// Using the naming convention you requested
import * as orderController from '../controllers/orderController.js';
import { createOrderValidation, validate } from '../middleware/express-validator.js';
import { checkJWT } from '../middleware/jwt.js';

const orderRouter = express.Router();

// All order routes require authentication
orderRouter.use(checkJWT);

// POST: Create a new order
// Professional flow: Validation -> Handle results -> Controller
orderRouter.post('/', createOrderValidation, validate, orderController.createOrder);

// GET: Fetch all orders for the logged-in user
// No need for :id in the URL because we get the user ID from the JWT token
orderRouter.get('/my-orders', orderController.readOrders);

// GET: Fetch a specific order by its ID
orderRouter.get('/:orderId', orderController.readOrderById);

export default orderRouter;