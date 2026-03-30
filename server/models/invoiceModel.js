import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema(
    {
        // Unique identifier for the invoice (e.g., INV-123456)
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
        },
        // Link to the specific order this invoice represents
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        // Direct link to the user for faster auditing
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // Snapshot of the total amount at the time of issuing
        totalAmount: {
            type: Number,
            required: true,
        },
        // Optional: link to a generated PDF file
        pdfUrl: {
            type: String,
            default: '',
        }
    },
    { timestamps: true }
);

const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
export default Invoice;