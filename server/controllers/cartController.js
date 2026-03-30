import Cart from '../models/cartModel.js';
import { CartInfoLogger, CartErrorLogger } from '../middleware/winston.js';

// Helper function to recalculate totals and save
const updateCartAndRespond = async (cart, res, message) => {
    // Basic calculation logic - assumes products are populated or have price info
    let totalItems = 0;
    let totalPrice = 0;

    cart.products.forEach(item => {
        totalItems += item.quantity;
        // Logic assumes price is handled (either stored in cart or fetched)
        totalPrice += (item.priceAtAdd || 0) * item.quantity; 
    });

    cart.totalItemsInCart = totalItems;
    cart.totalPrice = totalPrice;

    await cart.save();
    CartInfoLogger.info(`${message} - Cart ID: ${cart._id}`);
    return res.status(200).json({ success: true, cart });
};

// 1. Get User Cart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        res.status(200).json({ success: true, cart });
    } catch (error) {
        CartErrorLogger.error(`Error fetching cart: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// 2. Add to Cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity, price } = req.body;
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({ userId: req.user.id, products: [] });
        }

        const existingProductIndex = cart.products.findIndex(
            p => p.productId.toString() === productId
        );

        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity += (quantity || 1);
        } else {
            cart.products.push({ productId, quantity: quantity || 1, priceAtAdd: price });
        }

        await updateCartAndRespond(cart, res, 'Product added to cart');
    } catch (error) {
        CartErrorLogger.error(`Add to cart failed: ${error.message}`);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// 3. Update Quantity (Unified Logic for inc/dec)
export const updateQuantity = async (req, res) => {
    try {
        const { productId, action } = req.body; // action: 'inc' or 'dec'
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        const item = cart.products.find(p => p.productId.toString() === productId);
        if (!item) return res.status(404).json({ success: false, message: 'Product not in cart' });

        if (action === 'inc') {
            item.quantity += 1;
        } else if (action === 'dec') {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                // If quantity is 1 and we decrement, we remove it
                cart.products = cart.products.filter(p => p.productId.toString() !== productId);
            }
        }

        await updateCartAndRespond(cart, res, `Quantity updated (${action})`);
    } catch (error) {
        CartErrorLogger.error(`Update quantity failed: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// 4. Remove Item
export const removeItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        cart.products = cart.products.filter(p => p.productId.toString() !== productId);

        await updateCartAndRespond(cart, res, 'Item removed from cart');
    } catch (error) {
        CartErrorLogger.error(`Remove item failed: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// 5. Reset/Clear Cart
export const resetCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (cart) {
            cart.products = [];
            cart.totalPrice = 0;
            cart.totalItemsInCart = 0;
            await cart.save();
        }
        
        CartInfoLogger.info(`Cart cleared for user: ${req.user.id}`);
        res.status(200).json({ success: true, message: 'Cart reset successfully' });
    } catch (error) {
        CartErrorLogger.error(`Reset cart failed: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// 6. Sync (updateInAddToCart)
export const updateInAddToCart = async (req, res) => {
    try {
        const { localProducts } = req.body; // Array of products from localStorage
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({ userId: req.user.id, products: [] });
        }

        // Logic to merge local storage items into DB cart
        localProducts.forEach(localItem => {
            const existing = cart.products.find(p => p.productId.toString() === localItem.productId);
            if (existing) {
                existing.quantity += localItem.quantity;
            } else {
                cart.products.push(localItem);
            }
        });

        await updateCartAndRespond(cart, res, 'Cart synced with local storage');
    } catch (error) {
        CartErrorLogger.error(`Sync failed: ${error.message}`);
        res.status(500).json({ success: false, message: 'Sync error' });
    }
};