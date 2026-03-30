import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

/**
 * Root routes for /api/products
 */
router.route('/')
    .get(productController.getAllProducts)    // Fetch all with filters, search, and pagination
    .post(productController.createProduct);   // Create a new product

/**
 * Individual product routes by ID
 */
router.route('/:id')
    .get(productController.getProductById)    // Get single product details
    .patch(productController.updateProduct)   // Update product fields
    .delete(productController.deleteProduct); // Remove product

/**
 * Utility route for checking existence (e.g., during creation)
 */
router.get('/check-exists/:field/:value', productController.checkProductExists);

export default router;