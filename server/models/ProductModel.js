import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            index: true // Indexed for faster searching
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
            index: true // Optimization for filtering by category
        },
    },
    { 
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Text index for global search functionality (name and descriptions)
ProductSchema.index({ productName: 'text', shortDescription: 'text', brand: 'text' });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;