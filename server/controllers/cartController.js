import mongoose from 'mongoose';
import Cart from '../models/cartModel.js';
import { CartInfoLogger, CartErrorLogger } from '../middleware/winston.js';

// Helper function to format cart items for the frontend
const formatCartItems = (productsArray) => {
    return productsArray
        // מוודא שה-populate הצליח ושיש למוצר שם (כלומר הוא נמשך מה-DB בהצלחה)
        .filter(item => item.productId && item.productId.productName) 
        .map(item => {
            const product = item.productId;
            
            return {
                _id: product._id.toString(),
                productId: product._id.toString(),
                productName: product.productName,
                image:
  (Array.isArray(product.productImages) && product.productImages.length > 0
    ? product.productImages[0]
    : product.image) || "",
                price: item.priceAtAdd,
                quantity: product.quantity, 
                itemQuantity: item.quantity 
            };
        });
};

const updateCartAndRespond = async (cart, res, message) => {
    let totalItems = 0;
    let totalPrice = 0;

    cart.products.forEach(item => {
        totalItems += item.quantity;
        totalPrice += (item.priceAtAdd || 0) * item.quantity; 
    });

    cart.totalItemsInCart = totalItems;
    cart.totalPrice = totalPrice;

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

export const getCart = async (req, res) => {
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
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity, price } = req.body;
        let cart = await Cart.findOne({ userId: req.user.id });

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
                // המרה אקטיבית לאובייקט כדי למנוע שמירה כטקסט
                productId: new mongoose.Types.ObjectId(productId), 
                quantity: quantity || 1, 
                priceAtAdd: price 
            });
        }

        await updateCartAndRespond(cart, res, 'Product added to cart');
    } catch (error) {
        CartErrorLogger.error(`Add to cart failed: ${error.message}`);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const updateQuantity = async (req, res) => {
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
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const removeItem = async (req, res) => {
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
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const resetCart = async (req, res) => {
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
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateInAddToCart = async (req, res) => {
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
        res.status(500).json({ success: false, message: "Sync error" });
    }
};