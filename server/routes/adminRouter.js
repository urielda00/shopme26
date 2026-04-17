import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { checkJWT } from '../middleware/jwt.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const adminRouter = express.Router();

// Apply authentication and admin authorization to all admin routes
adminRouter.use(checkJWT, requireAdmin);

// Dashboard overview and main entities retrieval
adminRouter.get('/overview', adminController.getAdminOverview);
adminRouter.get('/products', adminController.getAdminProducts);
adminRouter.get('/users', adminController.getAdminUsers);
adminRouter.get('/orders', adminController.getAdminOrders);
adminRouter.get('/invoices', adminController.getAdminInvoices);

// Entity status and data management
adminRouter.patch('/orders/:id/status', adminController.updateAdminOrderStatus);
adminRouter.patch('/users/:id', adminController.updateAdminUser);
adminRouter.delete('/users/:id', adminController.deleteAdminUser);

export default adminRouter;