import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // Detailed products array including quantity and price at time of purchase
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
            type: String, // Or an object for street, city, zip
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
    { timestamps: true } // This replaces the manual 'date' field with createdAt
);

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export default Order;