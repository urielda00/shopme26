import Order from '../models/orderModel.js';
import { processNewOrder } from '../services/orderService.js';
import { OrderInfoLogger, OrderErrorLogger } from '../middleware/winston.js';

/**
 * 1. Create a new order and generate a corresponding invoice
 */
export const createOrder = async (req, res, next) => {
    try {
        const { address } = req.body;
        const userId = req.user.id;

        if (!address || !String(address).trim()) {
            return res.status(400).json({
                success: false,
                message: 'Address is required',
            });
        }

        // Business logic is now handled in the dedicated service
        const { savedOrder, savedInvoice } = await processNewOrder(userId, address);

        OrderInfoLogger.info(
            `Order ${savedOrder._id} and Invoice ${savedInvoice.invoiceNumber} created for user: ${userId}`
        );

        return res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order: savedOrder,
            invoice: {
                _id: savedInvoice._id,
                invoiceNumber: savedInvoice.invoiceNumber,
                totalAmount: savedInvoice.totalAmount,
            },
        });
    } catch (error) {
        OrderErrorLogger.error(
            `Transaction failed for user ${req.user?.id}: ${error.message}`
        );
        next(error); // Pass to global error handler
    }
};

/**
 * 2. Read all orders for the logged-in user
 */
export const readOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Fetch all orders for the user, newest first, with basic product info
        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 })
            .populate('products.productId', 'productName price');

        res.status(200).json({ success: true, orders });
    } catch (error) {
        OrderErrorLogger.error(`Failed to fetch orders for user ${req.user.id}: ${error.message}`);
        next(error); // Unified error handling
    }
};

/**
 * 3. Read a specific order by ID (verified by user ownership)
 */
export const readOrderById = async (req, res, next) => {
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
        next(error); 
    }
};