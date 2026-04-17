import mongoose from 'mongoose';
import Cart from '../models/cartModel.js';
import { CartInfoLogger, CartErrorLogger } from '../middleware/winston.js';
import { calculateItemTotalInCents } from '../utils/helpers.js';

/**
 * Normalizes cart items structure for the client.
 * Filters out invalid products and extracts the primary image safely.
 */
const formatCartItems = (productsArray) => {
    return productsArray
        .filter(item => item.productId && item.productId.productName) 
        .map(item => {
            const product = item.productId;
            
            return {
                _id: product._id.toString(),
                productId: product._id.toString(),
                productName: product.productName,
                image: (Array.isArray(product.productImages) && product.productImages.length > 0
                    ? product.productImages[0]
                    : product.image) || "",
                price: item.priceAtAdd,
                quantity: product.quantity, 
                itemQuantity: item.quantity 
            };
        });
};

/**
 * Recalculates cart totals using integer math to prevent floating point inaccuracies,
 * saves the updated cart, and returns the formatted response.
 */
const updateCartAndRespond = async (cart, res, message) => {
    let totalItems = 0;
    let totalPriceInCents = 0;

    cart.products.forEach(item => {
        totalItems += item.quantity;
        // Calculate in cents to avoid floating point math errors
        totalPriceInCents += calculateItemTotalInCents(item.priceAtAdd, item.quantity); 
    });

    cart.totalItemsInCart = totalItems;
    // Convert back to standard currency format
    cart.totalPrice = totalPriceInCents / 100;

    await cart.save();
    await cart.populate('products.productId');

    const formattedItems = formatCartItems(cart.products);

    CartInfoLogger.info(`${message} - Cart ID: ${cart._id}`);
    return res.status(200).json({ 
        success: true, 
        cart: formattedItems,
        totalPrice: cart.totalPrice,
        totalItemsInCart: cart.totalItemsInCart
    });
};

/**
 * Retrieves the current user's cart or returns an empty default structure if none exists.
 */
export const getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');

        if (!cart) {
            return res.status(200).json({
                success: true,
                cart: [],
                totalPrice: 0,
                totalItemsInCart: 0,
            });
        }

        const formattedItems = formatCartItems(cart.products);

        return res.status(200).json({
            success: true,
            cart: formattedItems,
            totalPrice: cart.totalPrice || 0,
            totalItemsInCart: cart.totalItemsInCart || 0,
        });
    } catch (error) {
        CartErrorLogger.error(`Error fetching cart: ${error.message}`);
        next(error);
    }
};

/**
 * Adds a new product to the cart or increments its quantity if it already exists.
 */
export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity, price } = req.body;
        let cart = await Cart.findOne({ userId: req.user.id });

        // Initialize a new cart if the user doesn't have one
        if (!cart) {
            cart = new Cart({ userId: req.user.id, products: [] });
        }

        const existingProductIndex = cart.products.findIndex(
            p => p.productId && p.productId.toString() === productId
        );

        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity += (quantity || 1);
        } else {
            cart.products.push({ 
                productId: new mongoose.Types.ObjectId(productId), 
                quantity: quantity || 1, 
                priceAtAdd: price 
            });
        }

        await updateCartAndRespond(cart, res, 'Product added to cart');
    } catch (error) {
        CartErrorLogger.error(`Add to cart failed: ${error.message}`);
        next(error);
    }
};

/**
 * Modifies the quantity of a specific item in the cart.
 * Automatically removes the item if the decremented quantity falls below 1.
 */
export const updateQuantity = async (req, res, next) => {
    try {
        const { productId, action } = req.body; 
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        const item = cart.products.find(p => p.productId && p.productId.toString() === productId);
        if (!item) return res.status(404).json({ success: false, message: 'Product not in cart' });

        if (action === 'inc') {
            item.quantity += 1;
        } else if (action === 'dec') {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart.products = cart.products.filter(p => p.productId && p.productId.toString() !== productId);
            }
        }

        await updateCartAndRespond(cart, res, `Quantity updated (${action})`);
    } catch (error) {
        CartErrorLogger.error(`Update quantity failed: ${error.message}`);
        next(error);
    }
};

/**
 * Removes a specific product from the cart entirely.
 * Deletes the cart document if it becomes empty.
 */
export const removeItem = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.products = cart.products.filter(
            (p) => p.productId && p.productId.toString() !== productId
        );

        if (cart.products.length === 0) {
            await Cart.findByIdAndDelete(cart._id);

            return res.status(200).json({
                success: true,
                message: 'Item removed and empty cart deleted',
                cart: [],
                totalPrice: 0,
                totalItemsInCart: 0,
            });
        }

        await updateCartAndRespond(cart, res, 'Item removed from cart');
    } catch (error) {
        CartErrorLogger.error(`Remove item failed: ${error.message}`);
        next(error);
    }
};

/**
 * Deletes the entire cart document for the current user.
 */
export const resetCart = async (req, res, next) => {
    try {
        await Cart.findOneAndDelete({ userId: req.user.id });

        CartInfoLogger.info(`Cart deleted for user: ${req.user.id}`);

        res.status(200).json({
            success: true,
            message: 'Cart removed successfully',
            cart: [],
            totalPrice: 0,
            totalItemsInCart: 0,
        });
    } catch (error) {
        CartErrorLogger.error(`Reset cart failed: ${error.message}`);
        next(error);
    }
};

/**
 * Synchronizes local storage cart items with the database cart upon login or bulk add.
 */
export const updateInAddToCart = async (req, res, next) => {
    try {
        const { localProducts } = req.body;

        if (!Array.isArray(localProducts)) {
            return res.status(400).json({
                success: false,
                message: "localProducts must be an array",
            });
        }

        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({ userId: req.user.id, products: [] });
        }

        localProducts.forEach(localItem => {
            const prodId = localItem.productId || localItem._id;
            const cartQty = localItem.itemQuantity || 1;

            if (!prodId) return;

            const existing = cart.products.find(
                p => p.productId && p.productId.toString() === prodId.toString()
            );

            if (existing) {
                existing.quantity += cartQty;
            } else {
                cart.products.push({
                    productId: new mongoose.Types.ObjectId(prodId),
                    quantity: cartQty,
                    priceAtAdd: localItem.price || 0,
                });
            }
        });

        await updateCartAndRespond(cart, res, "Cart synced with local storage");
    } catch (error) {
        CartErrorLogger.error(`Sync failed: ${error.message}`);
        next(error);
    }
};