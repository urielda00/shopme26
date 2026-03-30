import express from 'express';
// Using the naming convention you requested
import * as cartController from '../controllers/cartController.js';
import { checkJWT } from '../middleware/jwt.js';

const cartRouter = express.Router();

// Secure all cart routes
cartRouter.use(checkJWT);

// GET: Fetch the user's cart
cartRouter.get('/', cartController.getCart);

// POST: Add new item to cart
cartRouter.post('/add', cartController.addToCart);

// PATCH: Update quantities (Unified logic for increment/decrement)
cartRouter.patch('/update-quantity', cartController.updateQuantity);

// DELETE: Remove items or reset
cartRouter.delete('/item/:productId', cartController.removeItem);
cartRouter.delete('/reset', cartController.resetCart);

// Maintenance/Legacy support route if needed
cartRouter.post('/sync', cartController.updateInAddToCart);

export default cartRouter;