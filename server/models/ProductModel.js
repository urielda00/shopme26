import mongoose from 'mongoose';

/**
 * Product Schema
 * Represents catalog items available for purchase.
 * Utilizes specific field indexes and a compound text index to significantly optimize database search performance.
 */
const ProductSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            index: true 
        },
        shortDescription: {
            type: String,
            trim: true
        },
        longDescription: {
            type: String,
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative']
        },
        quantity: {
            type: Number,
            default: 0
        },
        productImages: [String],
        status: {
            type: String,
            enum: ['active', 'out-of-stock', 'discontinued'],
            default: 'active'
        },
        company: String,
        releaseYear: Number,
        os: String,
        brand: String,
        image: String,
        category: {
            type: String,
            required: [true, 'Category is required'],
            index: true 
        },
    },
    { 
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

ProductSchema.index({ productName: 'text', shortDescription: 'text', brand: 'text' });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;