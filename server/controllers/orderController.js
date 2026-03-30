import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';
import Invoice from '../models/invoiceModel.js';
import { OrderInfoLogger, OrderErrorLogger } from '../middleware/winston.js';

/**
 * Helper to generate a unique, human-readable invoice number.
 * Format: INV-timestamp-random
 */
const generateInvoiceNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `INV-${timestamp}-${random}`;
};

// 1. Create a new order and generate a corresponding invoice
export const createOrder = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.user.id;

        // Fetch the user's cart and populate product details for price calculation
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        // Snapshot of products at their current price to ensure historical accuracy
        const orderProducts = cart.products.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            priceAtPurchase: item.productId.price 
        }));

        // Initialize and save the new Order
        const newOrder = new Order({
            userId,
            products: orderProducts,
            address,
            totalPrice: cart.totalPrice
        });

        const savedOrder = await newOrder.save();

        // Automatically generate an Invoice linked to this order
        const newInvoice = new Invoice({
            invoiceNumber: generateInvoiceNumber(),
            orderId: savedOrder._id,
            userId: userId,
            totalAmount: savedOrder.totalPrice
        });

        await newInvoice.save();

        // Clear the user's cart after successful transaction
        cart.products = [];
        cart.totalPrice = 0;
        cart.totalItemsInCart = 0;
        await cart.save();

        OrderInfoLogger.info(`Order ${savedOrder._id} and Invoice ${newInvoice.invoiceNumber} created for user: ${userId}`);
        
        res.status(201).json({ 
            success: true, 
            message: 'Order placed and invoice generated successfully', 
            order: savedOrder,
            invoiceId: newInvoice._id 
        });

    } catch (error) {
        OrderErrorLogger.error(`Transaction failed for user ${req.user.id}: ${error.message}`);
        res.status(500).json({ success: false, message: 'Internal server error during order processing' });
    }
};

// 2. Read all orders for the logged-in user
export const readOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch all orders for the user, newest first, with basic product info
        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 })
            .populate('products.productId', 'productName price');

        res.status(200).json({ success: true, orders });
    } catch (error) {
        OrderErrorLogger.error(`Failed to fetch orders for user ${req.user.id}: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server error while fetching orders' });
    }
};

// 3. Read a specific order by ID (verified by user ownership)
export const readOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        const order = await Order.findOne({ _id: orderId, userId })
            .populate('products.productId');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found or access denied' });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        OrderErrorLogger.error(`Error fetching order ${req.params.orderId}: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server error while fetching order details' });
    }
};