import express from 'express';
import * as productController from '../controllers/ProductController.js';
import { checkJWT } from '../middleware/jwt.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { multipleUpload } from '../middleware/upload.js';
import { createProductValidation, validate } from '../middleware/express-validator.js';

const router = express.Router();

router.get('/readProducts', productController.getAllProducts);
router.get('/related', productController.getRelatedProducts);
router.get('/check-exists/:field/:value', productController.checkProductExists);
router.get('/searchProduct', productController.searchProducts);
router.get('/:id', productController.getProductById);

router.post(
    '/',
    checkJWT,
    requireAdmin,
    multipleUpload,
    createProductValidation,
    validate,
    productController.createProduct
);

router.patch(
    '/:id',
    checkJWT,
    requireAdmin,
    multipleUpload,
    productController.updateProduct
);

router.delete(
    '/:id',
    checkJWT,
    requireAdmin,
    productController.deleteProduct
);

export default router;