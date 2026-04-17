import mongoose from 'mongoose';

/**
 * Order Schema
 * Manages the lifecycle of customer orders.
 * Embeds a snapshot of the product price at the time of purchase to ensure historical financial accuracy.
 */
const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                priceAtPurchase: {
                    type: Number,
                    required: true,
                }
            }
        ],
        address: {
            type: String, 
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
    },
    { timestamps: true } 
);

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export default Order;