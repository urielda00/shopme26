import Product from '../models/ProductModel.js';
import { buildPagination, buildPagedResponse } from '../utils/helpers.js';

/**
 * Standardizes the product object structure for client consumption, 
 * ensuring images are consistently formatted as an array.
 */
const normalizeProduct = (product) => {
  const images = Array.isArray(product.images)
    ? product.images
    : Array.isArray(product.productImages)
      ? product.productImages
      : product.image
        ? [product.image]
        : [];

  return {
    _id: String(product._id),
    productName: product.productName,
    price: product.price,
    category: product.category,
    brand: product.brand,
    os: product.os,
    quantity: product.quantity,
    releaseYear: product.releaseYear,
    shortDescription: product.shortDescription,
    longDescription: product.longDescription,
    images,
    image: images[0] || '',
  };
};

/**
 * Retrieves a paginated list of products with optional filtering 
 * by category, brand, OS, and release year.
 */
export const getAllProducts = async (req, res, next) => {
  try {
    const { page, limit, skip } = buildPagination(req.query);
    const { category, brand, os, year } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (os) filter.os = os;

    if (year) {
      const parsedYear = Number(year);
      if (Number.isNaN(parsedYear)) {
        return res.status(400).json({
          success: false,
          message: 'Query param "year" must be a valid number',
        });
      }
      filter.releaseYear = parsedYear;
    }

    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);

    const items = products.map(normalizeProduct);

    return res.status(200).json({
      items,
      page,
      perPage: limit,
      total,
      hasNextPage: page * limit < total,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a single product by its unique identifier.
 */
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      data: normalizeProduct(product),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Fetches a limited list of products within the same category, 
 * optionally excluding a specific product ID (useful for "Related Products" UI).
 */
export const getRelatedProducts = async (req, res, next) => {
  try {
    const { category, exclude } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Query param "category" is required',
      });
    }

    const products = await Product.find({
      category,
      ...(exclude ? { _id: { $ne: exclude } } : {}),
    })
      .sort({ createdAt: -1 })
      .limit(8);

    return res.status(200).json({
      success: true,
      data: products.map(normalizeProduct),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Maps uploaded file objects to their corresponding local storage paths.
 */
const extractImagePaths = (files = []) => {
    return files.map((file) => `/uploads/${file.filename}`);
};

/**
 * Creates a new product record including its associated image paths.
 */
export const createProduct = async (req, res, next) => {
    try {
        const imagePaths = extractImagePaths(req.files);

        const newProduct = await Product.create({
            productName: req.body.productName,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            price: Number(req.body.price),
            quantity: Number(req.body.quantity),
            releaseYear: Number(req.body.releaseYear),
            company: req.body.company,
            os: req.body.os,
            brand: req.body.brand,
            category: req.body.category,
            productImages: imagePaths,
            image: imagePaths[0] || '',
        });

        res.status(201).json({
            success: true,
            data: normalizeProduct(newProduct),
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Updates an existing product. Dynamically constructs the update payload 
 * by ignoring undefined or empty fields and processing new image uploads.
 */
export const updateProduct = async (req, res, next) => {
    try {
        const imagePaths = extractImagePaths(req.files);

        const payload = {
            ...req.body,
        };

        if (req.body.price !== undefined) payload.price = Number(req.body.price);
        if (req.body.quantity !== undefined) payload.quantity = Number(req.body.quantity);
        if (req.body.releaseYear !== undefined) payload.releaseYear = Number(req.body.releaseYear);

        if (imagePaths.length > 0) {
            payload.productImages = imagePaths;
            payload.image = imagePaths[0];
        }

        // Clean up the payload by removing empty strings, nulls, or undefined values
        Object.keys(payload).forEach((key) => {
            if (payload[key] === '' || payload[key] === undefined || payload[key] === null) {
                delete payload[key];
            }
        });

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, payload, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: normalizeProduct(updatedProduct),
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Removes a product from the database by its ID.
 */
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Validates the existence of a product based on a specific field and value. 
 * Uses a strict whitelist to prevent NoSQL injection attacks.
 */
export const checkProductExists = async (req, res, next) => {
  try {
    const { field, value } = req.params;
    
    const allowedFields = ['productName', 'brand', 'category', 'os', 'company'];
    
    if (!allowedFields.includes(field)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid field for search' 
        });
    }

    const exists = await Product.exists({ [field]: value });
    res.status(200).json({ success: true, exists: !!exists });
  } catch (error) {
    next(error);
  }
};

/**
 * Performs a text-based search across multiple product fields 
 * using an escaped regular expression for security.
 */
export const searchProducts = async (req, res, next) => {
  try {
    const rawKey = req.query.key;

    if (!rawKey || typeof rawKey !== 'string') {
      return res.status(200).json({
        success: true,
        items: [],
      });
    }

    const key = rawKey.trim();

    // Prevent overly broad searches
    if (key.length < 2) {
      return res.status(200).json({
        success: true,
        items: [],
      });
    }

    // Escape regex characters to prevent ReDoS and injection
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const products = await Product.find({
      $or: [
        { productName: { $regex: escapedKey, $options: 'i' } },
        { shortDescription: { $regex: escapedKey, $options: 'i' } },
        { brand: { $regex: escapedKey, $options: 'i' } },
        { category: { $regex: escapedKey, $options: 'i' } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(8);

    const items = products.map((product) => {
      const normalized = normalizeProduct(product);

      return {
        ...normalized,
        image: normalized.images?.[0] || '',
      };
    });

    return res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    next(error);
  }
};