import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { checkJWT } from '../middleware/jwt.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const adminRouter = express.Router();

/*
 * All admin routes are protected and require an authenticated admin session.
 */
adminRouter.use(checkJWT, requireAdmin);

adminRouter.get('/overview', adminController.getAdminOverview);
adminRouter.get('/products', adminController.getAdminProducts);
adminRouter.get('/users', adminController.getAdminUsers);
adminRouter.get('/orders', adminController.getAdminOrders);
adminRouter.patch('/orders/:id/status', adminController.updateAdminOrderStatus);
adminRouter.get('/invoices', adminController.getAdminInvoices);
adminRouter.patch('/users/:id', adminController.updateAdminUser);
adminRouter.delete('/users/:id', adminController.deleteAdminUser);

export default adminRouter;
