import Order from '../models/orderModel.js';
import { processNewOrder } from '../services/orderService.js';
import { OrderInfoLogger, OrderErrorLogger } from '../middleware/winston.js';

/**
 * Creates a new order and generates a corresponding invoice.
 * Delegates the core business logic to the dedicated order service.
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
        next(error);
    }
};

/**
 * Retrieves all orders for the currently authenticated user.
 * Results are populated with basic product details and sorted by newest first.
 */
export const readOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 })
            .populate('products.productId', 'productName price');

        res.status(200).json({ success: true, orders });
    } catch (error) {
        OrderErrorLogger.error(`Failed to fetch orders for user ${req.user.id}: ${error.message}`);
        next(error);
    }
};

/**
 * Retrieves a specific order by its ID.
 * Validates that the requested order belongs to the authenticated user to prevent unauthorized access.
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