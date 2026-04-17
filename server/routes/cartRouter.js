import express from 'express';
import * as cartController from '../controllers/cartController.js';
import { checkJWT } from '../middleware/jwt.js';

const cartRouter = express.Router();

// Apply JWT authentication to all cart routes
cartRouter.use(checkJWT);

// Cart retrieval and state management
cartRouter.get('/', cartController.getCart);
cartRouter.delete('/reset', cartController.resetCart);

// Cart items modification
cartRouter.post('/add', cartController.addToCart);
cartRouter.patch('/update-quantity', cartController.updateQuantity);
cartRouter.delete('/item/:productId', cartController.removeItem);

// Sync local/guest cart with user account upon authentication
cartRouter.post('/sync', cartController.updateInAddToCart);

export default cartRouter;