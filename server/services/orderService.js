import mongoose from 'mongoose';
import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';
import Invoice from '../models/invoiceModel.js';
import User from '../models/UserModel.js';

/**
 * Helper to generate a unique, human-readable invoice number.
 * Format: INV-timestamp-random
 */
const generateInvoiceNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `INV-${timestamp}-${random}`;
};

/**
 * Processes a new order inside a MongoDB transaction.
 * Extracted from the controller to keep business logic isolated and testable.
 */
export const processNewOrder = async (userId, address) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const cart = await Cart.findOne({ userId })
            .populate('products.productId')
            .session(session);

        if (!cart || cart.products.length === 0) {
            const error = new Error('Cart is empty');
            error.statusCode = 400;
            throw error;
        }

        const orderProducts = cart.products.map((item) => {
            if (!item.productId) {
                const error = new Error('One of the products in the cart no longer exists');
                error.statusCode = 400;
                throw error;
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

        return { savedOrder, savedInvoice };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};