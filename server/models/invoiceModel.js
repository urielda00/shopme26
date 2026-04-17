import mongoose from 'mongoose';

/**
 * Invoice Schema
 * Acts as an immutable billing record for a completed order.
 * References both the user and the order for efficient auditing and data retrieval.
 */
const InvoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        pdfUrl: {
            type: String,
            default: '',
        }
    },
    { timestamps: true }
);

const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
export default Invoice;