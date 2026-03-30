import Product from '../models/ProductModel.js';

/**
 * Get all products with advanced filtering, sorting, and pagination.
 */
export const getAllProducts = async (req, res, next) => {
    try {
        // 1. Basic Filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 2. Advanced Filtering (Price: gte, gt, lte, lt)
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
        let query = Product.find(JSON.parse(queryStr));

        // 3. Search logic (Using the Text Index from the model)
        if (req.query.search) {
            query = query.find({
                $text: { $search: req.query.search }
            });
        }

        // 4. Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt'); // Default sort: newest first
        }

        // 5. Pagination Logic
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        query = query.skip(skip).limit(limit);

        // Execute query
        const products = await query;
        const totalProducts = await Product.countDocuments(JSON.parse(queryStr));

        res.status(200).json({
            success: true,
            results: products.length,
            total: totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
            data: products
        });
    } catch (error) {
        next(error); // Pass to global error handler
    }
};

/**
 * Fetch a single product by its MongoDB ID.
 */
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

/**
 * Create a new product.
 */
export const createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        next(error);
    }
};

/**
 * Update an existing product.
 */
export const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a product.
 */
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
};

/**
 * Check if a product with a specific field/value exists (e.g. unique SKU or name).
 */
export const checkProductExists = async (req, res, next) => {
    try {
        const { field, value } = req.params;
        const exists = await Product.exists({ [field]: value });
        res.status(200).json({ success: true, exists: !!exists });
    } catch (error) {
        next(error);
    }
};