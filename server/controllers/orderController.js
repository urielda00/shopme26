import mongoose from 'mongoose';
import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';
import Invoice from '../models/invoiceModel.js';
import User from '../models/UserModel.js';
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
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { address } = req.body;
        const userId = req.user.id;

        if (!address || !String(address).trim()) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Address is required',
            });
        }

        const cart = await Cart.findOne({ userId })
            .populate('products.productId')
            .session(session);

        if (!cart || cart.products.length === 0) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Cart is empty',
            });
        }

        const orderProducts = cart.products.map((item) => {
            if (!item.productId) {
                throw new Error('One of the products in the cart no longer exists');
            }

            return {
                productId: item.productId._id,
                quantity: item.quantity,
                priceAtPurchase: item.priceAtAdd || item.productId.price,
            };
        });

        const [savedOrder] = await Order.create(
            [
                {
                    userId,
                    products: orderProducts,
                    address: String(address).trim(),
                    totalPrice: cart.totalPrice,
                    status: 'pending',
                },
            ],
            { session }
        );

        const [savedInvoice] = await Invoice.create(
            [
                {
                    invoiceNumber: generateInvoiceNumber(),
                    orderId: savedOrder._id,
                    userId,
                    totalAmount: savedOrder.totalPrice,
                },
            ],
            { session }
        );

        await User.findByIdAndUpdate(
            userId,
            { $push: { orders: savedOrder._id } },
            { new: true, session }
        );

        await Cart.findOneAndDelete({ userId }, { session });

        await session.commitTransaction();

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
        await session.abortTransaction();
        OrderErrorLogger.error(
            `Transaction failed for user ${req.user?.id}: ${error.message}`
        );

        return res.status(500).json({
            success: false,
            message: 'Internal server error during order processing',
        });
    } finally {
        session.endSession();
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